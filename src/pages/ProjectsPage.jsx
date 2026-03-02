import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import Footer from '../components/Footer'
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
  const { projects, personal, skills } = portfolioData

  return (
    <>
      <section className="min-h-[40vh] pt-32 section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.h1 {...fadeInUp} className="font-bold text-4xl md:text-5xl text-foreground mb-4">
            Featured <span className="gradient-text">Projects</span>
          </motion.h1>
          <motion.p {...fadeInUp} className="text-muted-foreground mb-4">
            Showcasing my latest work and innovative solutions
          </motion.p>
          <motion.div {...fadeInUp} className="flex flex-wrap items-center gap-6 mb-16">
            <a href="#browse-by-service" className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
              Or browse by service type ↓
            </a>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            {projects.map((project, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="card-premium overflow-hidden p-0"
              >
                <div className="h-36 overflow-hidden bg-muted/30">
                  {project.image ? (
                    <img
                      src={project.image.startsWith('http') ? project.image : `${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}/${project.image.replace(/^\//, '')}`}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        const fallback = e.target.nextElementSibling
                        if (fallback) fallback.classList.remove('hidden')
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full bg-gradient-to-br ${project.gradient || 'from-teal-500 to-cyan-500'} flex items-center justify-center ${project.image ? 'hidden' : ''}`}
                    aria-hidden={!!project.image}
                  >
                    <span className="text-white/90 text-4xl font-bold">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-foreground mb-3">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-4">
                    {project.slug && (
                      <Link
                        to={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                      >
                        View case study →
                      </Link>
                    )}
                    <Link
                      to="/hire-me"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary hover:underline"
                    >
                      Inquire about project
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Browse by Service */}
          <motion.div id="browse-by-service" {...fadeInUp} className="mt-24 pt-16 border-t border-border scroll-mt-32">
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
                      to={`/projects/${skill.slug}`}
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
