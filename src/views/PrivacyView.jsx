'use client'

import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import Footer from '@/components/Footer'
import { siteConfig } from '@/lib/site'
import { portfolioData } from '@/data/portfolio'

export default function PrivacyView() {
  const { personal } = portfolioData
  const updated = 'July 31, 2026'

  return (
    <>
      <PageHero
        title="Privacy Policy"
        highlight="Privacy"
        subtitle="How Mhentor collects, uses, and protects information on this website."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
        ]}
      />

      <article className="section-padding pb-24">
        <div className="max-w-3xl mx-auto prose-none space-y-8 text-muted-foreground leading-relaxed">
          <p className="text-sm">Last updated: {updated}</p>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">1. Who we are</h2>
            <p>
              This website is the official personal brand site of <strong className="text-foreground">{siteConfig.name}</strong> ({siteConfig.fullName}).
              Contact: <a className="text-primary hover:underline" href={`mailto:${personal.email}`}>{personal.email}</a>
              {personal.phone ? <> · {personal.phone}</> : null}.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">2. Information we collect</h2>
            <p>We may collect information you voluntarily provide when you:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Submit a contact or hire-me form</li>
              <li>Email, call, or message via WhatsApp / social profiles</li>
              <li>Use the on-site chat assistant</li>
            </ul>
            <p>Typical data includes name, email, project details, and any message content you send.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">3. How we use information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Respond to inquiries and project requests</li>
              <li>Improve the website experience and portfolio content</li>
              <li>Operate optional AI chat features when configured</li>
              <li>Comply with legal obligations when required</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">4. Cookies & analytics</h2>
            <p>
              This site may use essential cookies for preferences (such as theme). If analytics tools are added later,
              they will only be used to understand aggregate traffic and improve performance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">5. Third-party services</h2>
            <p>
              Hosting, forms, chat providers, or booking tools may process data under their own policies.
              Social links (GitHub, X, LinkedIn, WhatsApp) are governed by those platforms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">6. Data retention</h2>
            <p>
              Inquiry messages are retained only as long as needed to respond and manage professional relationships,
              unless a longer period is required by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">7. Your rights</h2>
            <p>
              You may request access, correction, or deletion of personal data you have shared by emailing{' '}
              <a className="text-primary hover:underline" href={`mailto:${personal.email}`}>{personal.email}</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">8. Updates</h2>
            <p>
              This policy may be updated periodically. Continued use of the site after changes constitutes acceptance
              of the revised policy.
            </p>
          </section>

          <p>
            See also our <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>.
          </p>
        </div>
      </article>
      <Footer />
    </>
  )
}
