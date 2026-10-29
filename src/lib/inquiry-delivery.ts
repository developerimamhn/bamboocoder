import "server-only";
import { projectTypeLabel, type InquiryValues } from "./inquiry";

/*
 * Server-side delivery for project inquiries. Credentials are read from
 * environment variables and never reach the browser.
 *
 *  - Email via Resend:  RESEND_API_KEY + INQUIRY_TO_EMAIL (+ INQUIRY_FROM_EMAIL)
 *  - CRM / automation:  INQUIRY_WEBHOOK_URL (+ INQUIRY_WEBHOOK_SECRET)
 *
 * Both can be enabled at once.
 */

export function deliveryChannels() {
  return {
    email: Boolean(process.env.RESEND_API_KEY && process.env.INQUIRY_TO_EMAIL),
    webhook: Boolean(process.env.INQUIRY_WEBHOOK_URL),
  };
}

export function isInquiryConfigured() {
  const c = deliveryChannels();
  return c.email || c.webhook;
}

interface Attachment {
  filename: string;
  content: Buffer;
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function summaryRows(v: InquiryValues, attachment?: Attachment | null): [string, string][] {
  return [
    ["Name", v.name],
    ["Email", v.email],
    ["Company", v.company || "—"],
    ["Project type", projectTypeLabel(v.projectType)],
    ["Budget", v.budget],
    ["Timeline", v.timeline],
    ["Reference", v.reference || "—"],
    ["Attachment", attachment?.filename ?? "—"],
  ];
}

async function sendEmail(v: InquiryValues, attachment?: Attachment | null) {
  const rows = summaryRows(v, attachment);
  const text = `${rows.map(([k, val]) => `${k}: ${val}`).join("\n")}\n\nProject description:\n${v.description}`;
  const html = `
    <h2 style="font-family:sans-serif">New project inquiry</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows.map(([k, val]) => `<tr><td style="padding:4px 16px 4px 0;color:#666">${k}</td><td style="padding:4px 0">${escapeHtml(val)}</td></tr>`).join("")}
    </table>
    <h3 style="font-family:sans-serif">Project description</h3>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(v.description)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM_EMAIL ?? "Bamboo Coders Website <onboarding@resend.dev>",
      to: process.env.INQUIRY_TO_EMAIL!.split(",").map((s) => s.trim()),
      reply_to: v.email,
      subject: `New inquiry: ${projectTypeLabel(v.projectType)} — ${v.name}${v.company ? ` (${v.company})` : ""}`,
      text,
      html,
      attachments: attachment ? [{ filename: attachment.filename, content: attachment.content.toString("base64") }] : undefined,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}

async function sendWebhook(v: InquiryValues, attachment?: Attachment | null) {
  const res = await fetch(process.env.INQUIRY_WEBHOOK_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.INQUIRY_WEBHOOK_SECRET && { "X-Webhook-Secret": process.env.INQUIRY_WEBHOOK_SECRET }),
    },
    body: JSON.stringify({
      source: "website-inquiry",
      submittedAt: new Date().toISOString(),
      ...v,
      projectTypeLabel: projectTypeLabel(v.projectType),
      attachmentName: attachment?.filename ?? null,
    }),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

export async function deliverInquiry(v: InquiryValues, attachment?: Attachment | null) {
  const channels = deliveryChannels();
  const tasks: Promise<void>[] = [];
  if (channels.email) tasks.push(sendEmail(v, attachment));
  if (channels.webhook) tasks.push(sendWebhook(v, attachment));

  const results = await Promise.allSettled(tasks);
  const failures = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  failures.forEach((f) => console.error("[inquiry] delivery failed:", f.reason));
  // Succeed if at least one channel accepted the inquiry.
  if (failures.length === results.length) throw new Error("All delivery channels failed");
}
