'use client'

import PageHero from '@/components/layout/PageHero'
import ServicesSection from '@/components/services/ServicesSection'
import TechStackShowcase from '@/components/tech/TechStackShowcase'
import Footer from '@/components/Footer'
import { portfolioData } from '@/data/portfolio'

export default function ServicesView() {
  return (
    <>
      <PageHero
        title="Services"
        highlight="Services"
        subtitle="Modern, scalable development services focused on measurable business outcomes."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />
      <ServicesSection services={portfolioData.services} />
      <TechStackShowcase techStack={portfolioData.techStack} />
      <Footer />
    </>
  )
}
