'use client'

import PageHero from '@/components/layout/PageHero'
import DevelopmentProcessSection from '@/components/process/DevelopmentProcessSection'
import Footer from '@/components/Footer'
import { portfolioData } from '@/data/portfolio'

export default function ProcessView() {
  return (
    <>
      <PageHero
        title="Process"
        highlight="Process"
        subtitle="A clear, structured path from discovery to a production-ready launch."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Process' }]}
      />
      <DevelopmentProcessSection developmentProcess={portfolioData.developmentProcess} />
      <Footer />
    </>
  )
}
