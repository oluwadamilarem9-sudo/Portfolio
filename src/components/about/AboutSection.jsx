'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useInView,
  useMotionValue,
  animate,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import {
  CodeIcon,
  PaletteIcon,
  ChartIcon,
  BriefcaseIcon,
  LightbulbIcon,
  ShieldIcon,
  LightningIcon,
} from '../Icons'

const ICON_MAP = {
  code: CodeIcon,
  palette: PaletteIcon,
  chart: ChartIcon,
  briefcase: BriefcaseIcon,
  lightbulb: LightbulbIcon,
  shield: ShieldIcon,
  lightning: LightningIcon,
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function AnimatedStat({ value, suffix, label }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)
  const reducedMotion = useReducedMotion()

  useMotionValueEvent(count, 'change', (v) => setDisplay(Math.round(v)))

  useEffect(() => {
    if (isInView && !reducedMotion) {
      animate(count, value, { duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] })
    } else if (isInView) {
      count.set(value)
      setDisplay(value)
    }
  }, [isInView, value, count, reducedMotion])

  return (
    <motion.div
      ref={ref}
      variants={item}
      whileHover={{ y: -4, scale: 1.02 }}
      className="about-stat-card text-center p-5 md:p-6"
    >
      <div className="text-2xl md:text-3xl font-bold text-primary tabular-nums mb-1">
        {display}
        {suffix}
      </div>
      <div className="text-xs md:text-sm text-muted-foreground font-medium">{label}</div>
    </motion.div>
  )
}

function ProfilePortrait({ personal, hero, about, reducedMotion }) {
  const useVideo = hero?.profileVideo && !personal?.profileImage
  const src = personal.profileImage || '/dacced.png'

  return (
    <motion.div
      {...fadeInUp}
      className="relative flex flex-col items-center lg:items-start"
    >
      <div className="relative">
        <div className="relative p-[2px] rounded-2xl hero-gradient-border">
          <motion.div
            className="absolute inset-0 rounded-2xl hero-gradient-border-spin"
            animate={reducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative hero-glass-card rounded-2xl p-2 md:p-3 about-profile-frame"
          >
            <div className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm aspect-[3/4] rounded-xl overflow-hidden">
              {useVideo ? (
                <video
                  src={hero.profileVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label={hero.name}
                />
              ) : (
                <img
                  src={src}
                  alt={personal.displayName || hero.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              )}
            </div>
          </motion.div>
        </div>

        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap hero-availability-badge flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold shadow-lg"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={reducedMotion ? {} : { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {about.availabilityBadge || hero?.availabilityBadge || 'Available for Freelance'}
        </motion.span>
      </div>
    </motion.div>
  )
}

function WhyCard({ card }) {
  const Icon = ICON_MAP[card.icon] || CodeIcon
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -6, scale: 1.02 }}
      className="about-glass-card p-5 md:p-6 group"
    >
      <div className="about-icon-wrap mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="font-semibold text-foreground mb-2">{card.title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
    </motion.div>
  )
}

function TechBadge({ name }) {
  return (
    <motion.span
      variants={item}
      whileHover={{ y: -3, scale: 1.05 }}
      className="about-tech-badge"
    >
      {name}
    </motion.span>
  )
}

function ApproachCard({ step }) {
  const Icon = ICON_MAP[step.icon] || LightbulbIcon
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -4 }}
      className="about-glass-card p-5 md:p-6 text-center group"
    >
      <div className="about-icon-wrap mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
    </motion.div>
  )
}

export default function AboutSection({ about, personal, hero }) {
  const reducedMotion = useReducedMotion()
  const techGroups = about.technologyHighlights || {}
  const resumeUrl = about.cta?.resumeUrl || personal?.resumeUrl

  return (
    <section id="about" className="about-section relative scroll-mt-20 overflow-hidden">
      <div className="about-section-bg" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-28">
        {/* Main two-column intro */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20 md:mb-28">
          <ProfilePortrait
            personal={personal}
            hero={hero}
            about={about}
            reducedMotion={reducedMotion}
          />

          <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="space-y-6">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest">
              {about.title || 'About Me'}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
              {about.headline || (
                <>
                  Building <span className="gradient-text">Modern Applications</span> That Deliver
                  Value
                </>
              )}
            </h2>
            <div className="space-y-4">
              {(about.introduction || [about.intro]).map((para, i) => (
                <p key={i} className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Why Work With Me */}
        {about.whyWorkWithMe?.length > 0 && (
          <div className="mb-20 md:mb-28">
            <motion.div {...fadeInUp} className="text-center mb-10 md:mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Why <span className="gradient-text">Work With Me</span>
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Principles and practices that set every project up for long-term success.
              </p>
            </motion.div>
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {about.whyWorkWithMe.map((card) => (
                <WhyCard key={card.title} card={card} />
              ))}
            </motion.div>
          </div>
        )}

        {/* Technology Highlights */}
        {Object.keys(techGroups).length > 0 && (
          <div className="mb-20 md:mb-28">
            <motion.div {...fadeInUp} className="text-center mb-10 md:mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Technology <span className="gradient-text">Highlights</span>
              </h3>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(techGroups).map(([category, techs]) => (
                <motion.div
                  key={category}
                  {...fadeInUp}
                  className="about-glass-card p-5 md:p-6"
                >
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                    {category}
                  </h4>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {techs.map((name) => (
                      <TechBadge key={name} name={name} />
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Highlights / Stats */}
        {about.stats?.length > 0 && (
          <div className="mb-20 md:mb-28">
            <motion.div {...fadeInUp} className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Professional <span className="gradient-text">Highlights</span>
              </h3>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              {about.stats.map((stat) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </motion.div>
          </div>
        )}

        {/* My Approach */}
        {about.approach?.length > 0 && (
          <div className="mb-20 md:mb-28">
            <motion.div {...fadeInUp} className="text-center mb-10 md:mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                My <span className="gradient-text">Approach</span>
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A proven process from discovery to delivery — built for clarity and results.
              </p>
            </motion.div>
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {about.approach.map((step) => (
                <ApproachCard key={step.title} step={step} />
              ))}
            </motion.div>
          </div>
        )}

        {/* CTA */}
        <motion.div
          {...fadeInUp}
          className="about-cta-card text-center p-8 md:p-12 rounded-2xl"
        >
          <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-8 max-w-2xl mx-auto leading-tight">
            {about.cta?.headline || "Let's Build Something Amazing Together."}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={about.cta?.hireLink || '/hire-me'}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow"
              >
                Hire Me
              </Link>
            </motion.div>
            {resumeUrl && (
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary/60 text-primary font-semibold hover:bg-primary/10 transition-colors"
                >
                  Download Resume
                </a>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
