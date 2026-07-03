import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LegalDocument, LegalSection } from "@/components/LegalDocument";
import { PageContent } from "@/components/PageContent";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import {
  PREMIUM_PRICE_DISPLAY,
  PREMIUM_PRODUCT_NAME,
  PREMIUM_TIER_NAME,
} from "@/lib/premium";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = "Refund Policy";
const PAGE_DESCRIPTION =
  "Refund Policy for Boomer Ball premium membership (The Locker Room). Learn how to request a refund for your one-time digital purchase.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/refunds",
});

const EFFECTIVE_DATE = "July 3, 2026";
const CONTACT_EMAIL = "support@boomerball.app";
const REFUND_WINDOW_DAYS = 14;

export default function RefundsPage() {
  return (
    <PageShell theme="news">
      <JsonLd
        data={[
          webPageJsonLd({ path: "/refunds", title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE, path: "/refunds" },
          ]),
        ]}
      />
      <PageHeader
        theme="news"
        title="Refund Policy"
        description={`Effective ${EFFECTIVE_DATE}. How refunds work for ${PREMIUM_TIER_NAME} purchases.`}
        compact
      />

      <PageContent narrow>
        <LegalDocument>
          <LegalSection title="Overview">
            <p>
              Boomer Ball sells a digital premium membership called{" "}
              <strong>{PREMIUM_TIER_NAME}</strong> ({PREMIUM_PRODUCT_NAME}) for a{" "}
              <strong>{PREMIUM_PRICE_DISPLAY} one-time payment</strong>. Because access is
              delivered instantly online, we offer a limited refund window described below.
            </p>
          </LegalSection>

          <LegalSection title="Eligibility">
            <p>
              You may request a full refund within <strong>{REFUND_WINDOW_DAYS} days</strong>{" "}
              of your original purchase date if:
            </p>
            <ul>
              <li>You were charged incorrectly or charged more than once for the same purchase</li>
              <li>You are unable to access premium content after completing checkout and contacting us for support</li>
              <li>You are unsatisfied with your purchase and have not extensively used premium features</li>
            </ul>
            <p>
              Refund requests made after {REFUND_WINDOW_DAYS} days are generally not
              accepted, except where required by applicable law or at our sole discretion
              for exceptional circumstances (e.g., duplicate charges).
            </p>
          </LegalSection>

          <LegalSection title="How to request a refund">
            <p>
              Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with:
            </p>
            <ul>
              <li>The email address used at Stripe Checkout</li>
              <li>Your purchase date</li>
              <li>Your Stripe receipt or payment confirmation (if available)</li>
              <li>A brief description of the issue</li>
            </ul>
            <p>
              We aim to respond within 2 business days. Approved refunds are processed back
              to your original payment method through Stripe. Depending on your bank, it may
              take 5–10 business days for the refund to appear on your statement.
            </p>
          </LegalSection>

          <LegalSection title="What happens after a refund">
            <p>
              If a refund is issued, your {PREMIUM_TIER_NAME} access will be revoked. You
              may continue using free areas of Boomer Ball. Re-purchasing premium access
              after a refund is allowed.
            </p>
          </LegalSection>

          <LegalSection title="Chargebacks">
            <p>
              Please contact us before filing a chargeback with your bank. We are happy to
              resolve legitimate issues directly. Unwarranted chargebacks may result in
              permanent loss of premium access.
            </p>
          </LegalSection>

          <LegalSection title="Physical goods">
            <p>
              Boomer Ball does not sell physical products. No shipping or return shipping
              applies.
            </p>
          </LegalSection>

          <LegalSection title="Contact">
            <p>
              Refund questions? Email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
            <p className="text-sm text-ink/60">
              See also: <Link href="/terms">Terms of Service</Link> ·{" "}
              <Link href="/join">Join {PREMIUM_TIER_NAME}</Link>
            </p>
          </LegalSection>
        </LegalDocument>
      </PageContent>
    </PageShell>
  );
}
