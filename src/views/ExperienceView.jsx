'use client'

import PageHero from '@/components/layout/PageHero'
import ExperienceTimelineSection from '@/components/experience/ExperienceTimelineSection'
import Footer from '@/components/Footer'
import { portfolioData } from '@/data/portfolio'

export default function ExperienceView() {
  const { experienceTimeline, experience, education, career } = portfolioData

  return (
    <>
      <PageHero
        title="Experience"
        highlight="Experience"
        subtitle="A practical journey of learning, building, and shipping production-ready systems."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Experience' }]}
      />
      <ExperienceTimelineSection experienceTimeline={experienceTimeline} />

      <section className="section-padding py-20 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl text-foreground mb-10">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {experience.map((entry) => (
              <article key={entry.role} className="card-premium p-6 md:p-8">
                <h3 className="font-semibold text-xl text-primary mb-4">{entry.role}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {entry.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="text-primary" aria-hidden>•</span><span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <article className="card-premium p-6 md:p-8">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Education</p>
              <h3 className="font-semibold text-xl text-foreground mb-3">{education.degree}</h3>
              <p className="text-muted-foreground leading-relaxed">{education.description}</p>
            </article>
            <article className="card-premium p-6 md:p-8">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Career</p>
              <h3 className="font-semibold text-xl text-foreground mb-3">{career.title}</h3>
              <ul className="space-y-2 text-muted-foreground mb-4">
                {career.targets.map((target) => <li key={target}>• {target}</li>)}
              </ul>
              <p className="text-muted-foreground text-sm">{career.note}</p>
            </article>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
