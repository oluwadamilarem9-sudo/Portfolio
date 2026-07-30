'use client'

import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/services/ServicesSection'
import ProjectsShowcase from '@/components/projects/ProjectsShowcase'
import Footer from '@/components/Footer'
import { portfolioData } from '@/data/portfolio'

const Divider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
)

export default function HomeView() {
  const { hero, about, services, projects } = portfolioData
  const introduction = (about.introduction || [about.intro]).filter(Boolean).slice(0, 2)

  return (
    <>
      <HeroSection hero={hero} />
      <Divider />

      <section className="section-padding py-20 md:py-24">
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
      <ServicesSection services={services} />
      <Divider />
      <ProjectsShowcase projects={projects} showViewAllLink />
      <Divider />

      <section className="section-padding py-20">
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
