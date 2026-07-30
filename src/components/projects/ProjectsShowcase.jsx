'use client'

'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import ProjectCardSkeleton from './ProjectCardSkeleton'
import ProjectModal from './ProjectModal'
import { FILTER_TABS } from './projectUtils'

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export default function ProjectsShowcase({
  projects = [],
  limit,
  showViewAllLink = false,
  compact = false,
  id = 'projects',
}) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filterLoading, setFilterLoading] = useState(false)

  const sourceProjects = limit ? projects.slice(0, limit) : projects

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const handleFilter = (tab) => {
    if (tab === activeFilter) return
    setFilterLoading(true)
    setActiveFilter(tab)
    setTimeout(() => setFilterLoading(false), 300)
  }

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return sourceProjects
    return sourceProjects.filter((p) => p.category === activeFilter)
  }, [sourceProjects, activeFilter])

  const showSkeletons = loading || filterLoading

  return (
    <section id={id} className="project-showcase-section scroll-mt-20">
      <div className="absolute inset-0 project-showcase-bg pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={headerVariants}
          className={`text-center mb-14 md:mb-16 ${compact ? 'mb-10' : ''}`}
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Case Studies
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 tracking-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Production-ready builds with measurable impact — engineered for scale, performance, and
            business outcomes.
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="flex flex-wrap justify-center gap-2 mb-12 md:mb-14"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeFilter === tab}
              onClick={() => handleFilter(tab)}
              className={`project-filter-tab ${activeFilter === tab ? 'project-filter-tab-active' : ''}`}
            >
              {tab}
              {activeFilter === tab && (
                <motion.span
                  layoutId="project-filter-indicator"
                  className="absolute inset-0 rounded-full project-filter-tab-bg -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <AnimatePresence mode="popLayout">
            {showSkeletons
              ? Array.from({ length: compact ? 3 : 6 }).map((_, i) => (
                  <motion.div key={`skel-${i}`} exit={{ opacity: 0 }}>
                    <ProjectCardSkeleton />
                  </motion.div>
                ))
              : filteredProjects.length > 0
                ? filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      onOpen={setSelectedProject}
                    />
                  ))
                : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="col-span-full text-center py-16"
                    >
                      <p className="text-muted-foreground text-lg">
                        No projects in this category yet.
                      </p>
                    </motion.div>
                  )}
          </AnimatePresence>
        </motion.div>

        {showViewAllLink && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-14 md:mt-16"
          >
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-primary hover:underline font-semibold text-lg"
              >
                View all projects
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
