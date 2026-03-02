import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import Footer from '../components/Footer'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

function ProjectImage({ src, alt, className = '' }) {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  const url = src?.startsWith('http') ? src : src ? `${base}/${src.replace(/^\//, '')}` : ''
  if (!url) return null
  return <img src={url} alt={alt || ''} className={className} loading="lazy" />
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = portfolioData.projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h1 className="text-2xl font-bold text-foreground mb-4">Project not found</h1>
        <Link to="/projects" className="text-primary hover:underline font-medium">
          ← Back to all projects
        </Link>
      </div>
    )
  }

  const screenshots = project.screenshots?.length ? project.screenshots : (project.image ? [project.image] : [])

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm font-medium mb-8 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All projects
            </Link>
            <h1 className="font-bold text-4xl md:text-5xl text-foreground mb-4">{project.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{project.description}</p>
            {project.tech?.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {project.tech.map((t, j) => (
                  <span
                    key={j}
                    className="text-sm px-4 py-1.5 rounded-full bg-background dark:bg-card border border-border text-foreground/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Project overview */}
      {(project.overview || project.description) && (
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2 {...fadeInUp} className="font-bold text-2xl text-foreground mb-6">
              Project overview
            </motion.h2>
            <motion.p {...fadeInUp} className="text-muted-foreground text-lg leading-relaxed">
              {project.overview || project.description}
            </motion.p>
          </div>
        </section>
      )}

      {/* Problem */}
      {project.problem && (
        <section className="py-16 px-6 bg-muted/20">
          <div className="max-w-3xl mx-auto">
            <motion.h2 {...fadeInUp} className="font-bold text-2xl text-foreground mb-6">
              Problem
            </motion.h2>
            <motion.p {...fadeInUp} className="text-muted-foreground text-lg leading-relaxed">
              {project.problem}
            </motion.p>
          </div>
        </section>
      )}

      {/* Solution */}
      {project.solution && (
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2 {...fadeInUp} className="font-bold text-2xl text-foreground mb-6">
              Solution
            </motion.h2>
            <motion.p {...fadeInUp} className="text-muted-foreground text-lg leading-relaxed">
              {project.solution}
            </motion.p>
          </div>
        </section>
      )}

      {/* Tech stack */}
      {project.tech?.length > 0 && (
        <section className="py-16 px-6 bg-muted/20">
          <div className="max-w-3xl mx-auto">
            <motion.h2 {...fadeInUp} className="font-bold text-2xl text-foreground mb-6">
              Tech stack
            </motion.h2>
            <motion.ul
              {...fadeInUp}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 list-disc list-inside text-muted-foreground"
            >
              {project.tech.map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </motion.ul>
          </div>
        </section>
      )}

      {/* Screenshots */}
      {screenshots.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 {...fadeInUp} className="font-bold text-2xl text-foreground mb-8">
              Screenshots
            </motion.h2>
            <motion.div
              className="grid gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {screenshots.map((src, i) => (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                  className="rounded-xl overflow-hidden border border-border bg-muted/30 shadow-lg"
                >
                  <ProjectImage
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full aspect-video object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2 {...fadeInUp} className="font-bold text-2xl md:text-3xl text-foreground mb-4">
            Interested in working together?
          </motion.h2>
          <motion.p {...fadeInUp} className="text-muted-foreground mb-8">
            Have a similar project in mind? Let&apos;s discuss how we can bring your idea to life.
          </motion.p>
          <motion.div {...fadeInUp} className="flex flex-wrap justify-center gap-4">
            <Link
              to="/hire-me"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Get in touch
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
            >
              View all projects
            </Link>
          </motion.div>
          {(project.demo || project.code) && (
            <motion.div {...fadeInUp} className="mt-8 flex justify-center gap-4">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Live demo →
                </a>
              )}
              {project.code && (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  View code →
                </a>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
