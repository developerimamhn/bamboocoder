import Link from "next/link";
import { Logo } from "./logo";
import { Container } from "@/components/ui/layout";
import { services } from "@/content/services";
import { products } from "@/content/products";
import { navigation, site } from "@/content/site";

export function Footer() {
  const { email, phone, whatsapp, address } = site.contact;
  const hasContact = Boolean(email || phone || whatsapp || address);

  return (
    <footer className="bg-night text-white/70">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo tone="light" />
            <p className="mt-5 text-sm leading-relaxed text-white/60">{site.description}</p>
          </div>

          <FooterColumn title="Services">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.navLabel}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Products">
            {products.map((p) => (
              <FooterLink key={p.slug} href={`/products/${p.slug}`}>
                {p.name}
              </FooterLink>
            ))}
            <FooterLink href="/products">All products</FooterLink>
          </FooterColumn>

          <FooterColumn title="Company">
            {navigation.company.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            {email && (
              <li>
                <a href={`mailto:${email}`} className="text-sm transition-colors hover:text-white">
                  {email}
                </a>
              </li>
            )}
            {phone && (
              <li>
                <a href={`tel:${phone}`} className="text-sm transition-colors hover:text-white">
                  {phone}
                </a>
              </li>
            )}
            {whatsapp && (
              <li>
                <a href={`https://wa.me/${whatsapp}`} className="text-sm transition-colors hover:text-white" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
            )}
            {address && <li className="text-sm">{address}</li>}
            {!hasContact && <FooterLink href="/contact">Send us a project inquiry</FooterLink>}
            {site.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="text-sm transition-colors hover:text-white" target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navigation.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-white">{title}</h2>
      <ul className="mt-5 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
