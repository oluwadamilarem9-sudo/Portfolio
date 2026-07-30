'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import Footer from '../components/Footer'
import ProjectsShowcase from '../components/projects/ProjectsShowcase'
import {
  CodeIcon,
  PaletteIcon,
  ServerIcon,
  ChartIcon,
  BriefcaseIcon,
  LightbulbIcon,
} from '../components/Icons'

const skillIcons = {
  code: CodeIcon,
  palette: PaletteIcon,
  server: ServerIcon,
  chart: ChartIcon,
  briefcase: BriefcaseIcon,
  lightbulb: LightbulbIcon,
}

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ProjectsPage() {
  const { projects, skills } = portfolioData

  return (
    <>
      <div className="pt-20">
        <ProjectsShowcase projects={projects} id="projects-page" />
      </div>

      <section className="section-padding pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            id="browse-by-service"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="pt-8 border-t border-border scroll-mt-32"
          >
            <h2 className="font-bold text-2xl md:text-3xl text-foreground mb-2">
              Browse by <span className="gradient-text">Service</span>
            </h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Explore projects by service type. Click a service to see its categories, then choose a category to view related projects.
            </p>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
            >
              {skills.map((skill) => {
                const IconComponent = skillIcons[skill.icon] || CodeIcon
                return (
                  <motion.div key={skill.slug} variants={itemVariants}>
                    <Link
                      href={`/projects/${skill.slug}`}
                      className="card-premium block group"
                    >
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <h3 className="font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                        {skill.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {skill.description}
                      </p>
                      <span className="inline-block text-primary text-sm font-medium">
                        View categories →
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  )
}
