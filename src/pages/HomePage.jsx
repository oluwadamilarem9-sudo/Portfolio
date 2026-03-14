import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
import {
  CodeIcon,
  PaletteIcon,
  ServerIcon,
  ChartIcon,
  BriefcaseIcon,
  LightbulbIcon,
  MailIcon,
  GithubIcon,
  TwitterIcon,
  QuoteIcon,
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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

function TestimonialCard({ t }) {
  return (
    <div className="card-premium p-6 flex-shrink-0 w-[min(100%,22rem)] min-w-[280px] md:w-[22rem] h-full flex flex-col">
      <div className="flex items-start gap-3 mb-3">
        <img
          src={
            t.image ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=14b8a6&color=fff&size=64`
          }
          alt={t.name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            if (t.image) {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=14b8a6&color=fff&size=64`
            }
          }}
        />
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground text-sm">{t.name}</h3>
          <p className="text-muted-foreground text-xs truncate">{t.role}</p>
        </div>
      </div>
      <div className="flex gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-muted-foreground text-sm italic leading-relaxed flex-1 line-clamp-4">
        &quot;{t.quote}&quot;
      </p>
    </div>
  )
}

function TestimonialsCarousel({ testimonials }) {
  if (!testimonials?.length) return null
  // Duplicate for seamless infinite train loop (scrollLeft goes -50%)
  const strip = [...testimonials, ...testimonials]

  return (
    <div className="overflow-hidden w-full max-w-6xl mx-auto" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
      <div
        className="flex gap-6 animate-scroll-left-slow"
        style={{ width: 'max-content' }}
      >
        {strip.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  )
}

function HeroImageCarousel({ images }) {
  const hasImages = images?.length > 0
  // Duplicate for seamless infinite loop
  const stripImages = hasImages ? [...images, ...images] : []
  const aspectRatios = ['landscape', 'portrait', 'landscape', 'portrait', 'landscape', 'portrait']

  if (!hasImages) return null

  const ImageRow = ({ direction, className }) => (
    <div className={`absolute left-0 right-0 overflow-hidden ${className}`}>
      <div className={`flex gap-4 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`} style={{ width: 'max-content' }}>
        {stripImages.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={`flex-shrink-0 rounded-xl overflow-hidden shadow-xl border border-white/10 ${
              aspectRatios[i % aspectRatios.length] === 'portrait'
                ? 'w-48 h-72 md:w-40 md:h-72'
                : 'w-72 h-48 md:w-72 md:h-48'
            }`}
          >
            <img src={src} alt="" className="w-full h-full object-cover" loading="eager" />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
      <ImageRow direction="left" className="top-20" />
      <ImageRow direction="right" className="bottom-20" />
    </div>
  )
}

function FeaturedProjectImage({ project }) {
  const [imgError, setImgError] = useState(false)
  const showImage = project.image && !imgError
  const src = project.image
    ? (project.image.startsWith('http') ? project.image : `${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}/${project.image.replace(/^\//, '')}`)
    : ''
  return (
    <>
      {showImage && (
        <img
          src={src}
          alt={project.title}
          className="w-full aspect-video object-cover"
          onError={() => setImgError(true)}
        />
      )}
      {!showImage && (
        <div
          className={`w-full aspect-video bg-gradient-to-br ${project.gradient || 'from-teal-500 to-cyan-500'} flex items-center justify-center`}
        >
          <span className="text-white/90 text-6xl md:text-7xl font-bold">
            {project.title.charAt(0)}
          </span>
        </div>
      )}
    </>
  )
}

export default function HomePage() {
  const location = useLocation()
  const { hero, testimonialSnippets, about, skills, projects, testimonials, personal } = portfolioData

  useEffect(() => {
    const hash = location.state?.scrollTo || (location.hash && location.hash !== '#hero' ? location.hash : null)
    if (hash) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
        }, 50)
      })
    }
  }, [location.state, location.hash])

  return (
    <>
      {/* Hero - reference design with device overlay & avatar carousel */}
      <section id="hero" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20 px-6 scroll-mt-0">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-dark)' }} />
        {/* Rotating image carousel background */}
        <HeroImageCarousel images={hero.carouselImages || []} />
        {/* Floating blobs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: 'hsl(175 70% 45% / 0.3)' }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 25, 0], scale: [1, 0.95, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'hsl(195 70% 55% / 0.25)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroContainerVariants}
          className="relative z-10 max-w-5xl mx-auto text-center px-6"
        >
          <motion.div variants={itemVariants} className="mb-8 flex justify-center">
            <div className="w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden ring-4 ring-primary/30 shadow-premium aspect-square">
              <video
                src="/logo-hero.mp4.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                aria-label={hero.name}
              />
            </div>
          </motion.div>
          <motion.h1 variants={itemVariants} className="font-bold text-4xl md:text-6xl lg:text-7xl mb-2 leading-tight">
            <span className="gradient-text">{hero.headline || hero.name}</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl text-primary mt-1 font-normal">
              {hero.role}
            </span>
          </motion.h1>
          {hero.headlineTagline && (
            <motion.p variants={itemVariants} className="text-muted-foreground text-sm md:text-base font-medium mb-2">
              {hero.headlineTagline}
            </motion.p>
          )}
          <motion.p variants={itemVariants} className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10">
            {hero.supportingLine || hero.subtitle}
          </motion.p>

          {/* CTA buttons - two max */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to={hero.ctaSecondaryLink || '/projects'}
                className="inline-flex items-center px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-[var(--transition-smooth)]"
              >
                {hero.ctaSecondary || 'View My Work'}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to={hero.ctaPrimaryLink || '/hire-me'}
                className="btn-premium inline-flex items-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow"
              >
                {hero.ctaPrimary || "Let's Work Together"}
              </Link>
            </motion.div>
          </motion.div>

          {/* Authority elements */}
          {hero.authorityElements?.length > 0 && (
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 md:gap-8 text-base md:text-lg font-semibold text-muted-foreground">
              {hero.authorityElements.map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Scroll indicator - animated bounce */}
        <motion.a
          href="#about"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full border-2 border-primary/50 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors bg-background/80 backdrop-blur-sm animate-scroll-bounce"
          aria-label="Scroll to about"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.a>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* About Me */}
      <section id="about" className="py-24 px-6 md:px-12 lg:px-24 bg-muted/30 scroll-mt-20">
        <div className="max-w-6xl mx-auto section-container">
          <motion.h2 {...fadeInUp} className="font-bold text-3xl md:text-4xl text-foreground mb-12">
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.div
            {...fadeInUp}
            className="flex flex-col md:flex-row gap-12 items-start"
          >
            <div className="flex-shrink-0 w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-96">
              <img
                src={personal.profileImage || '/dacced.png'}
                alt={hero.name}
                className="w-full h-full rounded-xl object-cover object-top ring-4 ring-primary/30 shadow-premium"
              />
            </div>
            <div className="flex-1 min-w-0 space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed">{about.intro}</p>
              <p className="font-semibold text-xl text-primary">{about.tagline}</p>
              <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">{about.body}</p>
              <div>
                <h3 className="font-semibold text-xl text-primary mb-2">I specialize in:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {about.specialties?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">{about.execution}</p>
              <div>
                <h3 className="font-semibold text-xl text-primary mb-2">My Mission</h3>
                <p className="text-muted-foreground">{about.mission}</p>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-primary mb-2">My Vision</h3>
                <p className="text-muted-foreground">{about.vision}</p>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-primary mb-2">Core Values</h3>
                <div className="space-y-2 mt-2">
                  {about.coreValues?.map((v, i) => (
                    <div key={i}>
                      <span className="font-medium text-foreground">{v.name}</span>
                      <span className="text-muted-foreground"> – {v.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <motion.div {...fadeInUp} className="card-premium p-6 text-center" whileHover={{ scale: 1.02, y: -2 }}>
                  <div className="text-2xl font-bold text-primary mb-1">3+</div>
                  <div className="text-sm text-muted-foreground">Years of Experience</div>
                </motion.div>
                <motion.div {...fadeInUp} className="card-premium p-6 text-center" whileHover={{ scale: 1.02, y: -2 }}>
                  <div className="text-2xl font-bold text-primary mb-1">20+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* My Skills */}
      <section id="skills" className="py-24 px-6 md:px-12 lg:px-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto section-container">
          <motion.h2 {...fadeInUp} className="font-bold text-3xl md:text-4xl text-foreground mb-4">
            My <span className="gradient-text">Skills</span>
          </motion.h2>
          <motion.p {...fadeInUp} className="text-muted-foreground mb-12 max-w-2xl">
            A comprehensive set of technical and business capabilities to bring your vision to life
          </motion.p>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            {skills.map((skill) => {
              const IconComponent = skillIcons[skill.icon] || CodeIcon
              const skillImage = skill.image
              return (
                <motion.div key={skill.slug} variants={itemVariants}>
                  <Link
                    to={`/skills/${skill.slug}`}
                    className="card-premium block group overflow-hidden"
                  >
                    {skillImage && (
                      <div className="mb-4 rounded-xl overflow-hidden h-32">
                        <img
                          src={skillImage}
                          alt={skill.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg text-primary mb-2">{skill.title}</h3>
                    <p className="text-muted-foreground text-sm">{skill.description}</p>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Featured Projects */}
      <section
        id="projects"
        className="bg-white dark:bg-muted/20 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-24">
          <motion.h2
            {...fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center text-foreground mb-20"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>

          <motion.div
            className="flex flex-col gap-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            {projects.slice(0, 4).map((project, i) => (
              <motion.article
                key={i}
                variants={itemVariants}
                className="rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background/50 dark:bg-background/30 border border-border/50"
              >
                <div
                  className={`flex flex-col lg:flex-row items-center gap-12 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Image mockup */}
                  <motion.div
                    className="w-full lg:flex-1 max-w-xl flex-shrink-0"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <div className="rounded-xl shadow-xl overflow-hidden bg-muted/30 transition-shadow duration-300 hover:shadow-2xl">
                      <FeaturedProjectImage project={project} />
                  </div>
                </motion.div>

                {/* Project details */}
                <div className="w-full lg:flex-1 space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    {project.description}
                  </p>
                  {project.tech?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, j) => (
                        <span
                          key={j}
                          className="text-sm px-4 py-1.5 rounded-full bg-gray-100 dark:bg-muted text-foreground/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-4 pt-2">
                    <motion.a
                      href={project.demo || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:opacity-90"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Live Preview
                    </motion.a>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to={project.slug ? `/projects/${project.slug}` : '/projects'}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all duration-300"
                      >
                        View Case Study
                      </Link>
                    </motion.div>
                  </div>
                </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center mt-16">
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                View all projects
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Client Testimonials – carousel */}
      <section id="testimonials" className="py-24 px-6 md:px-12 lg:px-24 scroll-mt-20">
        <div className="max-w-4xl mx-auto section-container">
          <motion.h2 {...fadeInUp} className="font-bold text-3xl md:text-4xl text-foreground mb-4 text-center">
            Client <span className="gradient-text">Testimonials</span>
          </motion.h2>
          <motion.p {...fadeInUp} className="text-muted-foreground mb-12 text-center">
            What people say about working with me
          </motion.p>

          <TestimonialsCarousel testimonials={testimonials || []} />
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Let's Work Together */}
      <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-muted/30 scroll-mt-20">
        <div className="max-w-5xl mx-auto section-container">
          <motion.h2 {...fadeInUp} className="font-bold text-3xl md:text-4xl text-foreground mb-4">
            Let&apos;s Work <span className="gradient-text">Together</span>
          </motion.h2>
          <motion.p {...fadeInUp} className="text-muted-foreground mb-12">
            Have a project in mind? Let&apos;s create something amazing together
          </motion.p>
          <motion.div
            {...fadeInUp}
            className="grid md:grid-cols-2 gap-12 items-start"
          >
            <div className="space-y-5">
              <h3 className="font-semibold text-lg text-foreground mb-4">Get In Touch</h3>
              <motion.a
                href={`mailto:${personal.email}`}
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-[var(--transition-smooth)] group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
                  <MailIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="block font-medium text-foreground">Email</span>
                  <span className="text-primary text-sm">{personal.email}</span>
                </div>
              </motion.a>
              <motion.a
                href="https://github.com/oluwadamilarem9-sudo"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-[var(--transition-smooth)] group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
                  <GithubIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="block font-medium text-foreground">GitHub</span>
                  <span className="text-primary text-sm">@oluwadamilarem9-sudo</span>
                </div>
              </motion.a>
              <motion.a
                href="https://x.com/mhentor"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-[var(--transition-smooth)] group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
                  <TwitterIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="block font-medium text-foreground">Twitter (X)</span>
                  <span className="text-primary text-sm">@mhentor</span>
                </div>
              </motion.a>
            </div>
            <div className="card-premium p-6">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}