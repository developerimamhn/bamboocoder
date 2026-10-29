"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Icon } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/button";
import { services } from "@/content/services";
import { products, productStatusLabel } from "@/content/products";
import { navigation, site } from "@/content/site";
import { cn } from "@/lib/utils";

type MenuKey = "services" | "products" | null;

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const hoverOpen = (key: MenuKey) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpenMenu(key);
  };
  const hoverClose = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color] duration-200",
        scrolled || mobileOpen ? "border-line bg-canvas/90 backdrop-blur-md" : "border-transparent bg-canvas",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <nav ref={navRef} aria-label="Main" className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          <li onPointerEnter={(e) => e.pointerType === "mouse" && hoverOpen("services")} onPointerLeave={(e) => e.pointerType === "mouse" && hoverClose()}>
            <DropdownTrigger label="Services" active={isActive("/services")} open={openMenu === "services"} onToggle={() => setOpenMenu(openMenu === "services" ? null : "services")}>
              <ServicesPanel onNavigate={closeAll} />
            </DropdownTrigger>
          </li>
          <li onPointerEnter={(e) => e.pointerType === "mouse" && hoverOpen("products")} onPointerLeave={(e) => e.pointerType === "mouse" && hoverClose()}>
            <DropdownTrigger label="Products" active={isActive("/products")} open={openMenu === "products"} onToggle={() => setOpenMenu(openMenu === "products" ? null : "products")}>
              <ProductsPanel onNavigate={closeAll} />
            </DropdownTrigger>
          </li>
          {navigation.primary
            .filter((item) => item.href !== "/products")
            .map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeAll}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive(item.href) ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href="/contact" onClick={closeAll}>
              Start a Project
            </ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong bg-surface text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {mobileOpen && <MobileMenu onNavigate={closeAll} isActive={isActive} />}
    </header>
  );
}

function DropdownTrigger({ label, active, open, onToggle, children }: { label: string; active: boolean; open: boolean; onToggle: () => void; children: ReactNode }) {
  const id = useId();
  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
          active || open ? "text-ink" : "text-ink-soft hover:text-ink",
        )}
      >
        {label}
        <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-200", open && "rotate-180")} />
      </button>
      <div
        id={id}
        hidden={!open}
        className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
      >
        <div className="animate-[dropdown_160ms_ease-out] overflow-hidden rounded-card border border-line bg-surface shadow-lift">
          {children}
        </div>
      </div>
    </div>
  );
}

function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid w-[min(860px,calc(100vw-4rem))] grid-cols-[1fr_260px]">
      <ul className="grid grid-cols-2 gap-1 p-3">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              onClick={onNavigate}
              className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-canvas"
            >
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-bamboo-50 text-bamboo-700">
                <Icon name={service.icon} className="size-[18px]" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{service.navLabel}</span>
                <span className="mt-0.5 line-clamp-2 block text-[0.8125rem] leading-snug text-muted">{service.benefit}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-between gap-6 bg-night p-6 text-white">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-bamboo-300">Not sure where to start?</p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/80">
            Tell us about the problem. We&apos;ll recommend the right approach — even if it isn&apos;t us.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/contact" onClick={onNavigate} className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-bamboo-200">
            Start a conversation <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/services" onClick={onNavigate} className="text-sm text-white/60 hover:text-white">
            View all services
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductsPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="w-[min(420px,calc(100vw-4rem))] p-3">
      <ul className="flex flex-col gap-1">
        {products.map((product) => (
          <li key={product.slug}>
            <Link href={`/products/${product.slug}`} onClick={onNavigate} className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-canvas">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-ink font-mono text-xs font-semibold text-white">
                {product.monogram}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                  {product.name}
                  {product.isSample && <span className="rounded bg-warning-soft px-1.5 py-px text-[0.65rem] font-medium text-warning">Sample</span>}
                </span>
                <span className="block truncate text-[0.8125rem] text-muted">{product.tagline}</span>
              </span>
              <span className="hidden shrink-0 text-xs text-subtle sm:block">{productStatusLabel[product.status]}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-2 border-t border-line px-3 pb-1 pt-3">
        <Link href="/products" onClick={onNavigate} className="inline-flex items-center gap-1.5 text-sm font-medium text-bamboo-700 hover:text-bamboo-900">
          Explore all products <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

function MobileMenu({ onNavigate, isActive }: { onNavigate: () => void; isActive: (href: string) => boolean }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  return (
    <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-line bg-canvas lg:hidden">
      <div className="mx-auto flex max-w-[1240px] flex-col px-5 pb-10 pt-4 sm:px-8">
        <button
          type="button"
          aria-expanded={servicesOpen}
          onClick={() => setServicesOpen((v) => !v)}
          className="flex items-center justify-between border-b border-line py-4 text-left text-lg font-medium text-ink"
        >
          Services
          <ChevronDown aria-hidden className={cn("size-5 transition-transform", servicesOpen && "rotate-180")} />
        </button>
        {servicesOpen && (
          <ul className="border-b border-line py-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} onClick={onNavigate} className="flex items-center gap-3 py-2.5 text-[0.9375rem] text-ink-soft">
                  <Icon name={service.icon} className="size-[18px] text-bamboo-700" />
                  {service.navLabel}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" onClick={onNavigate} className="block py-2.5 text-[0.9375rem] font-medium text-bamboo-700">
                All services
              </Link>
            </li>
          </ul>
        )}
        {navigation.primary.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive(item.href) ? "page" : undefined}
            className="border-b border-line py-4 text-lg font-medium text-ink"
          >
            {item.label}
          </Link>
        ))}
        <div className="mt-8 flex flex-col gap-3">
          <ButtonLink href="/contact" size="lg" onClick={onNavigate} arrow>
            Start a Project
          </ButtonLink>
          <ButtonLink href="/products" size="lg" variant="secondary" onClick={onNavigate}>
            Explore Products
          </ButtonLink>
        </div>
        {site.contact.email && (
          <a href={`mailto:${site.contact.email}`} className="mt-8 text-sm text-muted">
            {site.contact.email}
          </a>
        )}
      </div>
    </div>
  );
}
