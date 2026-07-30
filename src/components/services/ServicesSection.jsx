'use client'

'use client'

import { memo, useCallback, useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import {
  CodeIcon,
  PaletteIcon,
  ServerIcon,
  DatabaseIcon,
  LightningIcon,
  GlobeIcon,
  ShieldIcon,
  DeviceIcon,
  RocketIcon,
} from '../Icons'

const ICON_MAP = {
  code: CodeIcon,
  palette: PaletteIcon,
  server: ServerIcon,
  database: DatabaseIcon,
  lightning: LightningIcon,
  globe: GlobeIcon,
  shield: ShieldIcon,
  device: DeviceIcon,
  rocket: RocketIcon,
}

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const ServiceCard = memo(function ServiceCard({ service, reducedMotion }) {
  const cardRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springCfg = { stiffness: 280, damping: 24 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springCfg)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springCfg)
  const Icon = ICON_MAP[service.icon] || CodeIcon

  const handleMove = useCallback(
    (e) => {
      if (!cardRef.current || reducedMotion) return
      const rect = cardRef.current.getBoundingClientRect()
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    [mouseX, mouseY, reducedMotion]
  )

  const handleLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  return (
    <motion.article
      variants={item}
      className="services-card-wrapper group"
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={reducedMotion ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full"
      >
        <div className="services-card-border rounded-2xl p-[1px] h-full">
          <motion.div
            className="services-card-border-glow absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
            animate={reducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            aria-hidden
          />
          <div className="services-card relative rounded-2xl p-6 md:p-7 h-full flex flex-col">
            <div className="services-card-shine" aria-hidden />
            <motion.div
              className="services-card-icon mb-5"
              whileHover={reducedMotion ? {} : { scale: 1.08, rotate: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              <Icon className="w-6 h-6" aria-hidden />
            </motion.div>
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
              {service.title}
            </h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-5 flex-1">
              {service.description}
            </p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary/80 mb-2.5">
                {service.tagLabel || 'Technologies'}
              </p>
              <ul className="flex flex-wrap gap-2" aria-label={`${service.tagLabel || 'Technologies'} for ${service.title}`}>
                {service.tags.map((tag) => (
                  <li key={tag}>
                    <span className="services-tag">{tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
})

function FeatureHighlight({ highlight, reducedMotion }) {
  const Icon = ICON_MAP[highlight.icon] || LightningIcon

  return (
    <motion.div
      variants={item}
      whileHover={reducedMotion ? {} : { y: -5, scale: 1.02 }}
      className="services-highlight-card group text-center p-6 md:p-7 rounded-2xl"
    >
      <motion.div
        className="services-highlight-icon mx-auto mb-4"
        animate={reducedMotion ? {} : { y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon className="w-6 h-6" aria-hidden />
      </motion.div>
      <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {highlight.title}
      </h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{highlight.description}</p>
    </motion.div>
  )
}

export default function ServicesSection({ services }) {
  const reducedMotion = useReducedMotion()
  const items = services?.items || []
  const highlights = services?.highlights || []
  const cta = services?.cta || {}

  if (!items.length) return null

  return (
    <section
      id="services"
      className="services-section relative scroll-mt-20 overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="services-section-bg" aria-hidden />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 py-24 md:py-28">
        <motion.header {...fadeInUp} className="text-center mb-14 md:mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            What I Offer
          </p>
          <h2
            id="services-heading"
            className="text-4xl md:text-5xl font-bold text-foreground mb-5 tracking-tight"
          >
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {services.subtitle}
          </p>
        </motion.header>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-16 md:mb-20"
        >
          {items.map((service) => (
            <ServiceCard
              key={service.title}
              service={service}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.div>

        {highlights.length > 0 && (
          <motion.div {...fadeInUp} className="mb-16 md:mb-20">
            <h3 className="text-center text-xl md:text-2xl font-bold text-foreground mb-8 md:mb-10">
              Why Clients <span className="gradient-text">Choose Me</span>
            </h3>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
            >
              {highlights.map((highlight) => (
                <FeatureHighlight
                  key={highlight.title}
                  highlight={highlight}
                  reducedMotion={reducedMotion}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.1 }}
          className="services-cta-card text-center p-8 md:p-12 rounded-2xl"
        >
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 max-w-2xl mx-auto leading-tight">
            {cta.headline || 'Have a Project in Mind?'}
          </h3>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            {cta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={cta.primaryLink || '/hire-me'}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow"
              >
                {cta.primaryLabel || 'Start Your Project'}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={cta.secondaryLink || '/contact'}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary/60 text-primary font-semibold hover:bg-primary/10 transition-colors"
              >
                {cta.secondaryLabel || 'Contact Me'}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
