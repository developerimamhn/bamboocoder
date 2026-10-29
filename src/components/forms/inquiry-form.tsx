"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cloneElement, useEffect, useRef, useState, type ReactNode } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Paperclip, X } from "lucide-react";
import {
  ATTACHMENT_ACCEPT,
  budgets,
  projectTypes,
  readInquiry,
  timelines,
  validateInquiry,
  type InquiryErrors,
} from "@/lib/inquiry";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

interface InquiryFormProps {
  /** False when no delivery channel is configured on the server. */
  configured: boolean;
  fallbackEmail?: string;
  initialProjectType?: string;
}

/** Reads ?service= / ?type= from the URL to preselect the project type. */
export function InquiryFormWithParams(props: Omit<InquiryFormProps, "initialProjectType">) {
  const params = useSearchParams();
  const wanted = params.get("service") ?? params.get("type") ?? "";
  const initial = projectTypes.some((t) => t.value === wanted) ? wanted : "";
  return <InquiryForm key={initial} {...props} initialProjectType={initial} />;
}

export function InquiryForm({ configured, fallbackEmail, initialProjectType = "" }: InquiryFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const focusFirstError = (errs: InquiryErrors) => {
    const first = Object.keys(errs)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const file = data.get("attachment");
    const clientErrors = validateInquiry(readInquiry(data), file instanceof File && file.size > 0 ? file : null);

    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      setStatus("error");
      setMessage("Please correct the highlighted fields.");
      focusFirstError(clientErrors);
      return;
    }

    data.set("startedAt", String(startedAt.current));
    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/inquiry", { method: "POST", body: data });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: InquiryErrors };
      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
        setFileName("");
        return;
      }
      if (json.errors) {
        setErrors(json.errors);
        focusFirstError(json.errors);
      }
      setStatus("error");
      setMessage(json.error ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setMessage("We couldn't reach the server. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start rounded-card border border-bamboo-200 bg-bamboo-50 p-8 sm:p-10">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-bamboo-700 text-white">
          <CircleCheck aria-hidden className="size-6" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink">Thank you — your inquiry is on its way.</h2>
        <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
          We&apos;ve received your project details and will review them carefully. You&apos;ll hear from us by email with next steps.
        </p>
        <Button variant="secondary" className="mt-8" onClick={() => setStatus("idle")}>
          Send another inquiry
        </Button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-card border border-line bg-surface p-6 shadow-soft sm:p-10" aria-describedby="form-note">
      {!configured && (
        <div className="mb-8 flex gap-3 rounded-xl border border-warning/25 bg-warning-soft p-4 text-sm text-warning">
          <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
          <p>
            <strong className="font-semibold">Prototype mode.</strong> This form validates input but isn&apos;t connected to an inbox yet, so
            submissions won&apos;t be delivered.
            {fallbackEmail && (
              <>
                {" "}Please email <a className="underline" href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a> instead.
              </>
            )}
          </p>
        </div>
      )}

      <fieldset disabled={submitting} className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 [&>*]:min-w-0">
        <legend className="sr-only">Your details</legend>
        <Field label="Full name" name="name" error={errors.name} required>
          <input type="text" autoComplete="name" />
        </Field>
        <Field label="Business email" name="email" error={errors.email} required>
          <input type="email" autoComplete="email" inputMode="email" />
        </Field>
        <Field label="Company name" name="company" error={errors.company} optional className="sm:col-span-2">
          <input type="text" autoComplete="organization" />
        </Field>

        <Field label="Project type" name="projectType" error={errors.projectType} required className="sm:col-span-2">
          <select defaultValue={initialProjectType}>
            <option value="" disabled>
              Choose one
            </option>
            {projectTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Estimated budget" name="budget" error={errors.budget} required>
          <select defaultValue="">
            <option value="" disabled>
              Choose a range
            </option>
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
        <Field label="Desired timeline" name="timeline" error={errors.timeline} required>
          <select defaultValue="">
            <option value="" disabled>
              Choose a timeline
            </option>
            {timelines.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>

        <Field
          label="Project description"
          name="description"
          error={errors.description}
          required
          hint="What are you trying to achieve, who is it for, and what exists today?"
          className="sm:col-span-2"
        >
          <textarea rows={6} />
        </Field>

        <Field label="Reference link" name="reference" error={errors.reference} optional hint="A website, document or design you'd like us to see." className="sm:col-span-2">
          <input type="url" inputMode="url" placeholder="https://" />
        </Field>

        <div className="sm:col-span-2">
          <span className="block text-sm font-medium text-ink">
            Attachment <span className="font-normal text-subtle">(optional)</span>
          </span>
          <label
            className={cn(
              "mt-2 flex cursor-pointer items-center gap-3 rounded-control border border-dashed bg-canvas px-4 py-4 text-sm transition-colors focus-within:border-bamboo-500 focus-within:ring-4 focus-within:ring-bamboo-100 hover:border-ink/40",
              errors.attachment ? "border-danger" : "border-line-strong",
            )}
          >
            <Paperclip aria-hidden className="size-4 shrink-0 text-muted" />
            <span className={cn("min-w-0 flex-1 truncate", fileName ? "text-ink" : "text-muted")}>{fileName || "Attach a brief, spec or wireframe — PDF, DOC, PNG or JPG, up to 4 MB"}</span>
            <input
              type="file"
              name="attachment"
              accept={ATTACHMENT_ACCEPT}
              className="sr-only"
              aria-invalid={Boolean(errors.attachment)}
              aria-describedby={errors.attachment ? "attachment-error" : undefined}
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            />
            {fileName && (
              <button
                type="button"
                className="rounded-full p-1 text-muted hover:bg-sunken hover:text-ink"
                aria-label="Remove attachment"
                onClick={(e) => {
                  e.preventDefault();
                  const input = formRef.current?.querySelector<HTMLInputElement>('input[name="attachment"]');
                  if (input) input.value = "";
                  setFileName("");
                }}
              >
                <X aria-hidden className="size-4" />
              </button>
            )}
          </label>
          {errors.attachment && <ErrorText id="attachment-error">{errors.attachment}</ErrorText>}
        </div>

        {/* Honeypot — hidden from people, tempting for bots. */}
        <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm text-ink-soft">
            <input
              type="checkbox"
              name="consent"
              className="mt-0.5 size-4 shrink-0 rounded border-line-strong accent-bamboo-700"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <span>
              I agree that Bamboo Coders may use these details to respond to my inquiry, as described in the{" "}
              <Link href="/privacy" className="font-medium text-bamboo-700 underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.consent && <ErrorText id="consent-error">{errors.consent}</ErrorText>}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col-reverse gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="text-sm text-muted">
          Fields marked <span className="text-danger">*</span> are required.
        </p>
        <Button type="submit" size="lg" disabled={submitting} aria-busy={submitting}>
          {submitting ? (
            <>
              <LoaderCircle aria-hidden className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            "Send inquiry"
          )}
        </Button>
      </div>

      <div aria-live="assertive" className="empty:hidden">
        {status === "error" && message && (
          <p role="alert" className="mt-6 flex gap-2 rounded-xl bg-danger-soft p-4 text-sm text-danger">
            <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
            {message}
          </p>
        )}
      </div>
    </form>
  );
}

const controlClasses =
  "mt-2 block w-full rounded-control border bg-canvas px-4 text-[0.9375rem] text-ink placeholder:text-subtle transition-[border-color,box-shadow] focus:border-bamboo-500 focus:bg-surface focus:outline-none focus:ring-4 focus:ring-bamboo-100 disabled:opacity-60";

function Field({
  label,
  name,
  error,
  hint,
  required,
  optional,
  className,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
  children: React.ReactElement<Record<string, unknown>>;
}) {
  const id = `field-${name}`;
  const describedBy = (error ? `${id}-error` : hint ? `${id}-hint` : undefined);
  const tag = typeof children.type === "string" ? children.type : "";
  const control = cloneElement(children, {
    id,
    name,
    required,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy,
    className: cn(
      controlClasses,
      tag === "textarea" ? "py-3 leading-relaxed" : "h-12",
      tag === "select" && "select-chevron appearance-none pr-10",
      error ? "border-danger" : "border-line-strong",
    ),
  });

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-danger"> *</span>}
        {optional && <span className="font-normal text-subtle"> (optional)</span>}
      </label>
      {control}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-danger">
      <CircleAlert aria-hidden className="size-4 shrink-0" />
      {children}
    </p>
  );
}
