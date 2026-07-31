'use client'

import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import Footer from '@/components/Footer'
import { siteConfig } from '@/lib/site'
import { portfolioData } from '@/data/portfolio'

export default function TermsView() {
  const { personal } = portfolioData
  const updated = 'July 31, 2026'

  return (
    <>
      <PageHero
        title="Terms of Service"
        highlight="Terms"
        subtitle="Terms governing use of the Mhentor personal brand website and related services."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service' },
        ]}
      />

      <article className="section-padding pb-24">
        <div className="max-w-3xl mx-auto space-y-8 text-muted-foreground leading-relaxed">
          <p className="text-sm">Last updated: {updated}</p>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">1. Agreement</h2>
            <p>
              By accessing {siteConfig.url} (the “Site”), you agree to these Terms of Service.
              If you do not agree, please do not use the Site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">2. About the Site</h2>
            <p>
              The Site is the official personal brand website of <strong className="text-foreground">{siteConfig.name}</strong> ({siteConfig.fullName}).
              Content showcases portfolio work, services, and contact options. Project engagements are subject to
              separate written agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">3. Intellectual property</h2>
            <p>
              Unless otherwise noted, site content, branding, and original materials are owned by {siteConfig.fullName}.
              You may not copy, redistribute, or reuse materials without prior written permission, except for fair use
              or sharing links to the Site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">4. Portfolio & demos</h2>
            <p>
              Case studies and live demos may include client or product work. Third-party trademarks remain the property
              of their owners. Demo environments may be illustrative and are not guarantees of identical deliverables.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">5. No warranties</h2>
            <p>
              The Site is provided “as is” without warranties of any kind. We do not guarantee uninterrupted availability
              or that content is error-free.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">6. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, {siteConfig.name} is not liable for indirect, incidental, or
              consequential damages arising from use of the Site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">7. Contact & services</h2>
            <p>
              Inquiries via forms, email, WhatsApp, or social channels do not create a client relationship until terms
              are agreed in writing. For projects, contact{' '}
              <a className="text-primary hover:underline" href={`mailto:${personal.email}`}>{personal.email}</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">8. Changes</h2>
            <p>
              These terms may be updated at any time. Continued use of the Site after updates constitutes acceptance.
            </p>
          </section>

          <p>
            See also our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </article>
      <Footer />
    </>
  )
}
