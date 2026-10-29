import { NextResponse, type NextRequest } from "next/server";
import { readInquiry, validateInquiry } from "@/lib/inquiry";
import { deliverInquiry, isInquiryConfigured } from "@/lib/inquiry-delivery";

const MIN_FILL_MS = 3000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };

// Best-effort, per-instance rate limiting. For multi-region production
// traffic, back this with a shared store (e.g. Upstash Redis) or Turnstile.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Please try again in a few minutes." }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  // Spam protection: hidden honeypot field and minimum time-to-fill.
  // Bots get a generic success so they don't learn what tripped them.
  const honeypot = String(form.get("company_website") ?? "");
  const startedAt = Number(form.get("startedAt") ?? 0);
  if (honeypot || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const values = readInquiry(form);
  const file = form.get("attachment");
  const attachment = file instanceof File && file.size > 0 ? file : null;
  const errors = validateInquiry(values, attachment);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "Please correct the highlighted fields.", errors }, { status: 422 });
  }

  if (!isInquiryConfigured()) {
    return NextResponse.json(
      { ok: false, code: "not_configured", error: "This form is in prototype mode and is not yet connected to an inbox." },
      { status: 503 },
    );
  }

  try {
    await deliverInquiry(
      values,
      attachment ? { filename: attachment.name.replace(/[^\w.\- ]/g, "_").slice(0, 120), content: Buffer.from(await attachment.arrayBuffer()) } : null,
    );
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't send your inquiry right now. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
