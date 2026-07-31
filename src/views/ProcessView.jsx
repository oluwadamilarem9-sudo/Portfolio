'use client'

import DevelopmentProcessSection from '@/components/process/DevelopmentProcessSection'
import Footer from '@/components/Footer'
import { portfolioData } from '@/data/portfolio'

export default function ProcessView() {
  return (
    <>
      <div className="pt-16 lg:pt-[4.25rem]">
        <DevelopmentProcessSection developmentProcess={portfolioData.developmentProcess} />
      </div>
      <Footer />
    </>
  )
}
