'use client'

'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GithubIcon, ExternalLinkIcon } from '../Icons'
import ProjectMediaCarousel from './ProjectMediaCarousel'
import { getProjectImages, STATUS_STYLES } from './projectUtils'

function ModalSection({ title, children }) {
  if (!children) return null
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">{title}</h3>
      {children}
    </div>
  )
}

function BulletList({ items }) {
  if (!items?.length) return null
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-muted-foreground text-sm md:text-base leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function ProjectModal({ project, onClose }) {
  const images = project ? getProjectImages(project) : []
  const statusClass = project ? STATUS_STYLES[project.status] || STATUS_STYLES.Completed : ''

  useEffect(() => {
    if (!project) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto project-modal rounded-t-3xl sm:rounded-2xl"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-5 sm:p-8">
              <ProjectMediaCarousel
                project={project}
                images={images}
                showVideo={!!project.videoDemo}
                aspectClass="aspect-video"
                className="mb-6 shadow-premium"
              />

              <div className="flex flex-wrap items-center gap-2 mb-4">
                {project.category && <span className="project-category-badge">{project.category}</span>}
                {project.year && <span className="project-year-badge">{project.year}</span>}
                {project.status && (
                  <span className={`project-status-badge ${statusClass}`}>
                    {project.status === 'Live' && <span className="project-status-pulse" aria-hidden />}
                    {project.status}
                  </span>
                )}
              </div>

              <h2 id="project-modal-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                {project.title}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                {project.overview || project.description}
              </p>

              {project.metrics?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="project-metric-pill text-center">
                      <span className="text-xl md:text-2xl font-bold text-primary tabular-nums block">
                        {m.value}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3 mb-10">
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                    Live Demo
                  </motion.a>
                )}
                {project.code && (
                  <motion.a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary/60 text-primary font-semibold hover:bg-primary/10 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    GitHub
                  </motion.a>
                )}
              </div>

              <ModalSection title="Problem Solved">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {project.problem}
                </p>
              </ModalSection>

              <ModalSection title="Features">
                <BulletList items={project.features} />
              </ModalSection>

              <ModalSection title="Tech Stack">
                <div className="flex flex-wrap gap-2">
                  {project.tech?.map((t) => (
                    <span key={t} className="project-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </ModalSection>

              <ModalSection title="Performance Improvements">
                <BulletList items={project.performanceImprovements} />
              </ModalSection>

              <ModalSection title="Challenges">
                <BulletList items={project.challenges} />
              </ModalSection>

              {project.solution && (
                <ModalSection title="Solution">
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {project.solution}
                  </p>
                </ModalSection>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
