import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/** Bamboo Coders mark: two segmented bamboo stalks forming a stylised "b". */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <rect width="32" height="32" rx="9" className="fill-bamboo-700" />
      {/* tall stalk */}
      <rect x="9" y="6" width="5" height="6" rx="1.6" fill="#fff" />
      <rect x="9" y="13.2" width="5" height="6" rx="1.6" fill="#fff" />
      <rect x="9" y="20.4" width="5" height="5.6" rx="1.6" fill="#fff" />
      {/* short stalk */}
      <rect x="16.5" y="13.2" width="5" height="6" rx="1.6" fill="#fff" opacity="0.75" />
      <rect x="16.5" y="20.4" width="5" height="5.6" rx="1.6" fill="#fff" opacity="0.75" />
      {/* leaf */}
      <path d="M17 11.2c1.2-3.2 3.9-4.9 7.2-5-.6 3.1-2.9 5.2-7.2 5Z" className="fill-bamboo-300" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 rounded-lg", className)} aria-label={`${site.name} home`}>
      <LogoMark />
      <span className={cn("whitespace-nowrap text-[1.0625rem] font-semibold tracking-[-0.02em]", tone === "light" ? "text-white" : "text-ink")}>
        Bamboo<span className={tone === "light" ? "text-bamboo-300" : "text-bamboo-700"}> Coders</span>
      </span>
    </Link>
  );
}
