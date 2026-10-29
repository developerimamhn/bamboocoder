import { services } from "@/content/services";

/** Shared between the client form and the API route. */

export const projectTypes = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "product", label: "One of your products" },
  { value: "other", label: "Something else" },
];

export const budgets = ["Under $10k", "$10k – $25k", "$25k – $50k", "$50k – $100k", "$100k+", "Not sure yet"];

export const timelines = ["As soon as possible", "Within 1–3 months", "In 3–6 months", "6+ months", "Flexible"];

export const ATTACHMENT_MAX_BYTES = 4 * 1024 * 1024; // stays under Vercel's 4.5 MB request limit
export const ATTACHMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];
export const ATTACHMENT_ACCEPT = ".pdf,.doc,.docx,.png,.jpg,.jpeg";

export interface InquiryValues {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  reference: string;
  consent: string;
}

export type InquiryErrors = Partial<Record<keyof InquiryValues | "attachment", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function readInquiry(form: FormData): InquiryValues {
  const get = (key: string) => String(form.get(key) ?? "").trim();
  return {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    projectType: get("projectType"),
    budget: get("budget"),
    timeline: get("timeline"),
    description: get("description"),
    reference: get("reference"),
    consent: get("consent"),
  };
}

export function validateInquiry(v: InquiryValues, attachment?: { size: number; type: string } | null): InquiryErrors {
  const errors: InquiryErrors = {};

  if (v.name.length < 2) errors.name = "Please enter your full name.";
  else if (v.name.length > 120) errors.name = "Name is too long.";

  if (!v.email) errors.email = "Please enter your business email.";
  else if (!EMAIL_RE.test(v.email) || v.email.length > 200) errors.email = "Please enter a valid email address, e.g. name@company.com.";

  if (v.company.length > 160) errors.company = "Company name is too long.";

  if (!projectTypes.some((t) => t.value === v.projectType)) errors.projectType = "Please choose a project type.";
  if (!budgets.includes(v.budget)) errors.budget = "Please choose an estimated budget.";
  if (!timelines.includes(v.timeline)) errors.timeline = "Please choose a timeline.";

  if (v.description.length < 20) errors.description = "Please describe your project in at least 20 characters.";
  else if (v.description.length > 5000) errors.description = "Please keep the description under 5,000 characters.";

  if (v.reference) {
    try {
      const url = new URL(v.reference);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    } catch {
      errors.reference = "Please enter a full link starting with https://";
    }
  }

  if (attachment && attachment.size > 0) {
    if (attachment.size > ATTACHMENT_MAX_BYTES) errors.attachment = "Attachments must be 4 MB or smaller.";
    else if (!ATTACHMENT_TYPES.includes(attachment.type)) errors.attachment = "Please attach a PDF, Word document, PNG or JPG.";
  }

  if (v.consent !== "on") errors.consent = "Please confirm you agree to our Privacy Policy.";

  return errors;
}

export function projectTypeLabel(value: string) {
  return projectTypes.find((t) => t.value === value)?.label ?? value;
}
