'use client'

'use client'

import { motion } from 'framer-motion'
import { STATUS_STYLES } from './projectUtils'
import ProjectMediaCarousel from './ProjectMediaCarousel'
import { getProjectImages } from './projectUtils'

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.25 } },
}

export default function ProjectCard({ project, onOpen }) {
  const images = getProjectImages(project)
  const statusClass = STATUS_STYLES[project.status] || STATUS_STYLES.Completed

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -6 }}
      transition={{ layout: { duration: 0.35 } }}
      className="project-card group cursor-pointer"
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <ProjectMediaCarousel project={project} images={images} aspectClass="aspect-[16/10]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {project.category && (
            <span className="project-category-badge">{project.category}</span>
          )}
          {project.year && (
            <span className="project-year-badge">{project.year}</span>
          )}
        </div>
        {project.status && (
          <span className={`absolute top-4 right-4 project-status-badge ${statusClass}`}>
            {project.status === 'Live' && (
              <span className="project-status-pulse" aria-hidden />
            )}
            {project.status}
          </span>
        )}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="project-view-case-study">View Case Study →</span>
        </div>
      </div>

      <div className="p-6 md:p-7">
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-2 mb-5">
          {project.description}
        </p>

        {project.metrics?.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-5">
            {project.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className="project-metric-pill">
                <span className="text-lg font-bold text-primary tabular-nums">{m.value}</span>
                <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {project.tech?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="project-tech-tag">
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="project-tech-tag opacity-60">+{project.tech.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}
