'use client'

import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import Footer from '@/components/Footer'
import { portfolioData } from '@/data/portfolio'

export default function ResumeView() {
  const { personal, hero, experience, education, skills, techStack, about } = portfolioData
  const resumeUrl = about.cta?.resumeUrl

  return (
    <>
      <PageHero
        title="Resume"
        highlight="Resume"
        subtitle="Experience, capabilities, and the technologies I use to build production-ready products."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Resume' }]}
      />

      <section className="section-padding pb-24">
        <div className="max-w-5xl mx-auto">
          <header className="card-premium p-8 md:p-10 mb-8">
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-2">Professional Profile</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">{personal.realName}</h2>
            <p className="text-xl text-muted-foreground mt-2">{hero.role} & Digital Business Builder</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 text-sm">
              <a href={`mailto:${personal.email}`} className="text-primary hover:underline">{personal.email}</a>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a>
              <a href={personal.twitter} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">X / Twitter</a>
            </div>
          </header>

          <div className="space-y-8">
            <section className="card-premium p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Experience</h2>
              <div className="space-y-8">
                {experience.map((entry) => (
                  <article key={entry.role}>
                    <h3 className="text-lg font-semibold text-primary mb-3">{entry.role}</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      {entry.points.map((point) => <li key={point}>• {point}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="card-premium p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Education</h2>
              <h3 className="text-lg font-semibold text-primary mb-2">{education.degree}</h3>
              <p className="text-muted-foreground leading-relaxed">{education.description}</p>
            </section>

            <section className="card-premium p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Core Skills</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {skills.map((skill) => (
                  <article key={skill.title}>
                    <h3 className="font-semibold text-primary mb-2">{skill.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{skill.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="card-premium p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Technology Stack</h2>
              <div className="grid sm:grid-cols-2 gap-7">
                {techStack.categories.map((category) => (
                  <div key={category.id}>
                    <h3 className="font-semibold text-primary mb-3">{category.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.technologies.map((technology) => (
                        <span key={technology.name} className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-foreground">
                          {technology.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="card-premium p-8 md:p-10 mt-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Let&apos;s work together</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`mailto:${personal.email}`} className="px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold">
                Email Me
              </a>
              <Link href="/hire-me" className="px-7 py-3.5 rounded-xl border-2 border-primary text-primary font-semibold">
                Hire Me
              </Link>
              {resumeUrl && (
                <a href={resumeUrl} download target="_blank" rel="noopener noreferrer" className="px-7 py-3.5 rounded-xl border border-border text-foreground font-semibold">
                  Download Resume
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
