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
import { breadcrumbJsonLd, pageMetadata, SITE_URL, webPageJsonLd } from "@/lib/seo";

const PAGE_TITLE = "Terms of Service";
const PAGE_DESCRIPTION =
  "Terms of Service for Boomer Ball (boomerball.app), including rules for using our free content and purchasing The Locker Room premium membership.";

export const metadata: Metadata = pageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/terms",
});

const EFFECTIVE_DATE = "July 3, 2026";
const CONTACT_EMAIL = "support@boomerball.app";

export default function TermsPage() {
  return (
    <PageShell theme="news">
      <JsonLd
        data={[
          webPageJsonLd({ path: "/terms", title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: PAGE_TITLE, path: "/terms" },
          ]),
        ]}
      />
      <PageHeader
        theme="news"
        title="Terms of Service"
        description={`Effective ${EFFECTIVE_DATE}. Please read these terms before using Boomer Ball or purchasing premium access.`}
        compact
      />

      <PageContent narrow>
        <LegalDocument>
          <LegalSection title="1. Who we are">
            <p>
              Boomer Ball (<Link href="/">boomerball.app</Link>) is a fan-focused Oklahoma
              Sooners college football analytics website operated by Maybee Creations
              (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). Boomer Ball is an
              independent fan project and is <strong>not affiliated with, endorsed by, or
              sponsored by</strong> the University of Oklahoma or any of its athletic
              programs.
            </p>
          </LegalSection>

          <LegalSection title="2. Acceptance of terms">
            <p>
              By accessing or using {SITE_URL}, you agree to these Terms of Service. If you
              do not agree, please do not use the site or purchase premium access.
            </p>
          </LegalSection>

          <LegalSection title="3. What we offer">
            <p>
              Boomer Ball provides free editorial sports content, including stats, roster
              information, schedules, news summaries, and historical features. We also offer
              an optional paid digital membership called{" "}
              <strong>{PREMIUM_TIER_NAME}</strong> ({PREMIUM_PRODUCT_NAME}), which unlocks
              premium analytics and related web-based content on our site.
            </p>
            <p>
              All statistics and editorial content are provided for informational and
              entertainment purposes. We cite public sources where applicable, but we do not
              guarantee accuracy, completeness, or timeliness of any data or analysis.
            </p>
          </LegalSection>

          <LegalSection title="4. Premium membership (The Locker Room)">
            <p>
              <strong>Product:</strong> {PREMIUM_PRODUCT_NAME}
              <br />
              <strong>Price:</strong> {PREMIUM_PRICE_DISPLAY} USD, one-time payment (not a
              subscription)
              <br />
              <strong>Delivery:</strong> Digital access only, delivered immediately on our
              website after successful payment through Stripe Checkout
            </p>
            <p>
              Lifetime access means access for as long as Boomer Ball continues to operate
              the {PREMIUM_TIER_NAME} product. We may update, add, or remove premium
              features over time, but we will not charge you again for access already
              purchased.
            </p>
            <p>
              Premium access is tied to your browser session via secure cookies after
              checkout. You are responsible for completing checkout on the device and browser
              you intend to use. If you lose access, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with your Stripe
              receipt.
            </p>
            <p>
              Refunds are handled under our{" "}
              <Link href="/refunds">Refund Policy</Link>.
            </p>
          </LegalSection>

          <LegalSection title="5. Acceptable use">
            <p>You agree not to:</p>
            <ul>
              <li>Use the site for any unlawful purpose</li>
              <li>Scrape, copy, or redistribute premium content without permission</li>
              <li>Attempt to bypass paywalls or access controls</li>
              <li>Interfere with the site&apos;s operation or security</li>
              <li>Misrepresent affiliation with the University of Oklahoma or Boomer Ball</li>
            </ul>
          </LegalSection>

          <LegalSection title="6. Intellectual property">
            <p>
              Site design, branding, original editorial content, and premium analytics
              presentations are owned by Maybee Creations or its licensors. Third-party
              trademarks (including team names and logos) belong to their respective owners
              and are used for identification and commentary only.
            </p>
          </LegalSection>

          <LegalSection title="7. Disclaimers">
            <p>
              Boomer Ball is provided <strong>&quot;as is&quot;</strong> without warranties
              of any kind. We do not provide gambling, betting, or financial advice. Past
              performance of teams or players does not guarantee future results.
            </p>
          </LegalSection>

          <LegalSection title="8. Limitation of liability">
            <p>
              To the fullest extent permitted by law, Maybee Creations shall not be liable
              for any indirect, incidental, or consequential damages arising from your use
              of the site or premium membership. Our total liability for any claim related
              to a purchase shall not exceed the amount you paid for that purchase.
            </p>
          </LegalSection>

          <LegalSection title="9. Changes">
            <p>
              We may update these Terms from time to time. The &quot;Effective&quot; date
              at the top of this page will reflect the latest version. Continued use of the
              site after changes constitutes acceptance of the updated Terms.
            </p>
          </LegalSection>

          <LegalSection title="10. Contact">
            <p>
              Questions about these Terms? Email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
            <p className="text-sm text-ink/60">
              See also: <Link href="/refunds">Refund Policy</Link>
            </p>
          </LegalSection>
        </LegalDocument>
      </PageContent>
    </PageShell>
  );
}
