import { CtaSection, PageHero } from "@/components/sections/blocks";
import { ProductExplorer } from "@/components/sections/product-explorer";
import { Section } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/button";
import { productCategories, products } from "@/content/products";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Products",
  description: "Software products designed and built by Bamboo Coders to solve recurring business problems.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Software products, built by Bamboo Coders."
        intro="Alongside client projects, we design, build and operate our own products — focused tools for problems we see businesses face again and again."
        actions={
          <>
            <ButtonLink href="#catalog" size="lg" arrow>Browse products</ButtonLink>
            <ButtonLink href="/contact?type=product" size="lg" variant="secondary">Request a demo</ButtonLink>
          </>
        }
      />
      <Section id="catalog" aria-label="Product catalog">
        <ProductExplorer products={products} categories={productCategories} />
      </Section>
      <CtaSection
        title="Need something our products don't cover?"
        intro="Our product thinking also powers our client work. Tell us what you need, and we'll help you build it."
        cta="Start a Project"
      />
    </>
  );
}
