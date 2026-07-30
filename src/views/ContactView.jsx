'use client'

import PageHero from '@/components/layout/PageHero'
import ContactSection from '@/components/contact/ContactSection'
import FaqSection from '@/components/faq/FaqSection'
import Footer from '@/components/Footer'
import { portfolioData } from '@/data/portfolio'

export default function ContactView() {
  const { contact, personal, testimonials, faq } = portfolioData

  return (
    <>
      <PageHero
        title="Contact"
        highlight="Contact"
        subtitle="Have a project in mind? Share the details and I will respond with clear next steps."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />
      <ContactSection contact={contact} personal={personal} testimonials={testimonials} />
      <FaqSection faq={faq} contact={contact} />
      <Footer />
    </>
  )
}
