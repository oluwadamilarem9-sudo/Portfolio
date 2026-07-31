'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ProjectsShowcase from '@/components/projects/ProjectsShowcase'
import Footer from '@/components/Footer'
import {
  CodeIcon,
  PaletteIcon,
  ServerIcon,
  ChartIcon,
  BriefcaseIcon,
  LightbulbIcon,
} from '@/components/Icons'
import { portfolioData } from '@/data/portfolio'

const skillIcons = {
  code: CodeIcon,
  palette: PaletteIcon,
  server: ServerIcon,
  chart: ChartIcon,
  briefcase: BriefcaseIcon,
  lightbulb: LightbulbIcon,
}

export default function ProjectsView() {
  const { projects, skills } = portfolioData

  return (
    <>
      <div className="pt-16 lg:pt-[4.25rem]">
        <ProjectsShowcase projects={projects} id="projects-page" />
      </div>

      <section className="section-padding pb-24">
        <div className="max-w-6xl mx-auto">
          <div id="browse-by-service" className="pt-8 border-t border-border scroll-mt-32">
            <h2 className="font-bold text-2xl md:text-3xl text-foreground mb-2">
              Browse by <span className="gradient-text">Service</span>
            </h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Choose a service to explore its categories and related projects.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill) => {
                const Icon = skillIcons[skill.icon] || CodeIcon
                return (
                  <motion.div key={skill.slug} whileHover={{ y: -5 }}>
                    <Link href={`/projects/${skill.slug}`} className="card-premium block group h-full">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                        {skill.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{skill.description}</p>
                      <span className="text-primary text-sm font-medium">View categories →</span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
