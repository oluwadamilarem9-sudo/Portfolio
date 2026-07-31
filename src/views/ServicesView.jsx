'use client'

import ServicesSection from '@/components/services/ServicesSection'
import TechStackShowcase from '@/components/tech/TechStackShowcase'
import Footer from '@/components/Footer'
import { portfolioData } from '@/data/portfolio'

export default function ServicesView() {
  return (
    <>
      <div className="pt-16 lg:pt-[4.25rem]">
        <ServicesSection services={portfolioData.services} />
      </div>
      <TechStackShowcase techStack={portfolioData.techStack} />
      <Footer />
    </>
  )
}
