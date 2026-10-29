import Link from "next/link";
import { LegalPage } from "@/components/sections/legal";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: "Terms governing the use of the Bamboo Coders website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="[Date]">
      <p>
        These Terms of Service govern your use of this website, operated by {site.legalName}. By using the website, you agree to these terms.
      </p>

      <h2>Use of the website</h2>
      <p>You agree to use this website lawfully and not to interfere with its operation, security or availability.</p>

      <h2>Information on this website</h2>
      <p>
        Content on this website is provided for general information about our services and products. It does not constitute an offer or a binding
        commitment. Project scope, pricing and terms are agreed separately in writing.
      </p>

      <h2>Client projects</h2>
      <p>Engagements for software development or design services are governed by a separate agreement between you and {site.legalName}.</p>

      <h2>Products</h2>
      <p>Use of our software products may be subject to additional product-specific terms, which will be presented when you sign up or purchase.</p>

      <h2>Intellectual property</h2>
      <p>
        The website, its design, text, graphics and logos are owned by {site.legalName} or its licensors and may not be reproduced without permission.
      </p>

      <h2>Third-party links</h2>
      <p>This website may link to third-party websites. We are not responsible for their content or practices.</p>

      <h2>Limitation of liability</h2>
      <p>[Insert a limitation of liability clause appropriate to your jurisdiction.]</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of [jurisdiction].</p>

      <h2>Changes</h2>
      <p>We may update these terms from time to time. Continued use of the website after changes means you accept the updated terms.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Please use our <Link href="/contact">contact form</Link>
        {site.contact.email ? ` or email ${site.contact.email}` : ""}.
      </p>
    </LegalPage>
  );
}
