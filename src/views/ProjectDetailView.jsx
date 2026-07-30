'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import PageHero from '@/components/layout/PageHero'
import Footer from '@/components/Footer'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

function TextSection({ title, children, muted = false }) {
  return (
    <section className={`py-16 px-6 ${muted ? 'bg-muted/20' : ''}`}>
      <div className="max-w-3xl mx-auto">
        <motion.h2 {...fadeInUp} className="font-bold text-2xl text-foreground mb-6">{title}</motion.h2>
        <motion.div {...fadeInUp} className="text-muted-foreground text-lg leading-relaxed">{children}</motion.div>
      </div>
    </section>
  )
}

export default function ProjectDetailView({ project }) {
  if (!project) {
    return (
      <>
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Project not found</h1>
          <p className="text-muted-foreground mb-6">The project may have moved or no longer exists.</p>
          <Link href="/projects" className="text-primary hover:underline font-medium">← Back to all projects</Link>
        </div>
        <Footer />
      </>
    )
  }

  const screenshots = project.screenshots?.length
    ? project.screenshots
    : project.image ? [project.image] : []

  return (
    <>
      <PageHero
        title={project.title}
        highlight={project.title}
        subtitle={project.description}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: project.title },
        ]}
      />

      {project.tech?.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 px-6 pb-10">
          {project.tech.map((tech) => (
            <span key={tech} className="text-sm px-4 py-1.5 rounded-full bg-card border border-border text-foreground/90">
              {tech}
            </span>
          ))}
        </div>
      )}

      {(project.overview || project.description) && (
        <TextSection title="Project overview">{project.overview || project.description}</TextSection>
      )}
      {project.problem && <TextSection title="Problem" muted>{project.problem}</TextSection>}
      {project.solution && <TextSection title="Solution">{project.solution}</TextSection>}

      {project.tech?.length > 0 && (
        <TextSection title="Tech stack" muted>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 list-disc list-inside">
            {project.tech.map((tech) => <li key={tech}>{tech}</li>)}
          </ul>
        </TextSection>
      )}

      {screenshots.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-bold text-2xl text-foreground mb-8">Screenshots</h2>
            <div className="grid gap-6">
              {screenshots.map((src, index) => (
                <div key={src} className="rounded-xl overflow-hidden border border-border bg-muted/30 shadow-lg">
                  <img
                    src={src}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full aspect-video object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-bold text-2xl md:text-3xl text-foreground mb-4">Interested in working together?</h2>
          <p className="text-muted-foreground mb-8">Let&apos;s discuss how to bring your idea to life.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/hire-me" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold">
              Get in touch
            </Link>
            <Link href="/projects" className="px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold">
              View all projects
            </Link>
          </div>
          {(project.demo || project.code) && (
            <div className="mt-8 flex justify-center gap-5">
              {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Live demo →</a>}
              {project.code && <a href={project.code} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View code →</a>}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}
