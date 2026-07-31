'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import { portfolioData } from '@/data/portfolio'

const ServicesSection = dynamic(() => import('@/components/services/ServicesSection'), {
  loading: () => <SectionSkeleton />,
})

const ProjectsShowcase = dynamic(() => import('@/components/projects/ProjectsShowcase'), {
  loading: () => <SectionSkeleton />,
})

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => null,
})

const Divider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
)

function SectionSkeleton() {
  return (
    <div className="section-padding py-24" aria-hidden>
      <div className="max-w-6xl mx-auto space-y-4 animate-pulse">
        <div className="h-4 w-28 mx-auto rounded bg-muted" />
        <div className="h-10 w-64 mx-auto rounded bg-muted" />
        <div className="h-40 rounded-2xl bg-muted/70" />
      </div>
    </div>
  )
}

export default function HomeView() {
  const { hero, about, services, projects } = portfolioData
  const introduction = (about.introduction || [about.intro]).filter(Boolean).slice(0, 2)

  return (
    <>
      <HeroSection hero={hero} />
      <Divider />

      <section className="section-padding py-20 md:py-24 content-visibility-auto">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">About Me</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Building digital products that <span className="gradient-text">create value</span>
          </h2>
          <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            {introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <Link href="/about" className="inline-flex items-center gap-2 mt-8 text-primary font-semibold hover:underline">
            Learn more about me <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <Divider />
      <div className="content-visibility-auto">
        <ServicesSection services={services} />
      </div>
      <Divider />
      <div className="content-visibility-auto">
        <ProjectsShowcase projects={projects} showViewAllLink />
      </div>
      <Divider />

      <section className="section-padding py-20 content-visibility-auto">
        <div className="max-w-4xl mx-auto card-premium p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Ready to build something <span className="gradient-text">exceptional?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Tell me what you are building and I will help turn it into a clear, scalable product.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow"
          >
            Start a conversation
          </Link>
        </div>
      </section>
      <Footer />
    </>
  )
}
