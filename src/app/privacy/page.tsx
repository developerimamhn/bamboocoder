import Link from "next/link";
import { LegalPage } from "@/components/sections/legal";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "How Bamboo Coders collects, uses and protects personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const contact = site.contact.email || "[privacy contact email]";
  return (
    <LegalPage title="Privacy Policy" updated="[Date]">
      <p>
        This Privacy Policy explains how {site.legalName} (&quot;we&quot;, &quot;us&quot;) collects, uses and protects personal information when you
        visit this website or contact us.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you provide:</strong> when you submit our project inquiry form, we collect your name, business email, company name,
          project details, budget and timeline preferences, and any reference link or file you choose to share.
        </li>
        <li>
          <strong>Technical information:</strong> our hosting provider may process standard technical data such as IP address, browser type and pages
          visited, to operate and secure the website. [Describe any analytics tools you use.]
        </li>
      </ul>

      <h2>How we use information</h2>
      <ul>
        <li>To respond to your inquiry and discuss a potential project.</li>
        <li>To prepare proposals and communicate with you about our services.</li>
        <li>To protect the website against spam and abuse.</li>
        <li>To meet legal and regulatory obligations.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Legal basis</h2>
      <p>[Where applicable, e.g. under GDPR, describe the legal bases you rely on — such as consent and legitimate interests.]</p>

      <h2>Sharing</h2>
      <p>
        We share information only with service providers that help us operate this website and handle inquiries — for example, hosting, email
        delivery and CRM providers — under appropriate agreements. [List key processors.]
      </p>

      <h2>Retention</h2>
      <p>We keep inquiry information only as long as needed for the purposes above. [State your retention period.]</p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, delete or restrict the use of your personal information. To make a
        request, contact us at {contact}.
      </p>

      <h2>Cookies</h2>
      <p>[Describe any cookies or similar technologies used. If you add analytics or marketing tools, update this section and add a consent mechanism where required.]</p>

      <h2>Changes</h2>
      <p>We may update this policy from time to time. The latest version will always be available on this page.</p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email {contact} or use our <Link href="/contact">contact form</Link>.
      </p>
    </LegalPage>
  );
}
