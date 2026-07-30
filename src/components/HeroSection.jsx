'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useMotionValue,
  useInView,
  animate,
  useReducedMotion,
  useMotionValueEvent,
} from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function HighlightedHeadline({ text, highlights = [] }) {
  if (!highlights.length) return <span>{text}</span>

  const pattern = new RegExp(
    `(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi'
  )
  const parts = text.split(pattern)

  return (
    <>
      {parts.map((part, i) => {
        const isHighlight = highlights.some((h) => h.toLowerCase() === part.toLowerCase())
        return isHighlight ? (
          <span key={i} className="hero-gradient-highlight">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      })}
    </>
  )
}

function AnimatedStat({ value, suffix, label, reducedMotion }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const count = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState(0)

  useMotionValueEvent(count, 'change', (v) => setDisplayValue(Math.round(v)))

  useEffect(() => {
    if (isInView && !reducedMotion) {
      animate(count, value, { duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] })
    } else if (isInView) {
      count.set(value)
      setDisplayValue(value)
    }
  }, [isInView, value, count, reducedMotion])

  return (
    <div ref={ref} className="hero-stat text-center">
      <div className="text-2xl md:text-3xl font-semibold text-foreground tabular-nums tracking-tight">
        {displayValue}
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="mt-1.5 text-xs md:text-sm text-muted-foreground font-medium tracking-wide">
        {label}
      </div>
    </div>
  )
}

function CtaButton({ href, children, variant = 'primary' }) {
  const isPrimary = variant === 'primary'

  return (
    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
      <Link
        href={href}
        className={isPrimary ? 'hero-btn hero-btn-primary' : 'hero-btn hero-btn-secondary'}
      >
        {children}
      </Link>
    </motion.div>
  )
}

const TECH_ICONS = {
  React: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.4-1.05-.85-1.58-1.34-.84.28-1.67.42-2.45.42-.78 0-1.52-.14-2.22-.4.4 1.64 1.27 2.87 2.65 3.02m8.24-12.1c.85-.03 1.6-.23 2.18-.56-.4-.72-1.08-1.35-1.95-1.88-.87-.52-1.85-.9-2.85-1.1-.3.9-.67 1.75-1.1 2.53 1.05.16 2.04.5 2.72.99m-5.5-4.05c.55.18 1.16.3 1.8.35.64-.05 1.25-.17 1.8-.35-.55-.18-1.16-.3-1.8-.35-.64.05-1.25.17-1.8.35M12 3.5c.9.55 1.7 1.35 2.35 2.35-.65.05-1.3.15-1.95.3-.65-.15-1.3-.25-1.95-.3.65-1 1.45-1.8 2.35-2.35M5.65 7.93c.58.33 1.33.53 2.18.56-.43.78-.8 1.63-1.1 2.53-1-.2-1.98-.58-2.85-1.1-.87-.53-1.55-1.16-1.95-1.88.58.33 1.33.53 2.18.56m12.7 12.07c1.38-.15 2.25-1.38 2.65-3.02-.7.26-1.44.4-2.22.4-.78 0-1.61-.14-2.45-.42-.53.49-1.06.94-1.58 1.34 1.59 1.5 2.97 2.08 3.6 1.7M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  ),
  'Next.js': (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M11.6 2.1h.8l7.5 12.9V22h-3.1v-6.4L12 5.8 7.2 15.6V22H4.1V15L11.6 2.1zm5.9 17.9v-2.2h2.2V20h-2.2z" />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M3 3h18v18H3V3zm10.5 10.5h-3v5.25H8.25V8.25h5.25v5.25zm5.25 0H15v1.5h-1.5v3.75H15V18h3v-1.5h-1.5v-3.75H18V13.5z" />
    </svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 1.85c-2.1 0-3.75.55-5.05 1.65-.95.8-1.55 1.85-1.8 3.15h3.3c.15-.75.5-1.35 1.05-1.8.7-.55 1.6-.85 2.7-.85 1.45 0 2.55.35 3.3 1.05.75.7 1.15 1.65 1.15 2.85 0 .85-.2 1.55-.6 2.1-.4.55-.95.95-1.65 1.2l-2.85 1.05c-1.35.5-2.35 1.15-3 1.95-.65.8-.95 1.85-.95 3.15 0 1.35.45 2.45 1.35 3.3.9.85 2.1 1.25 3.6 1.25 1.95 0 3.5-.55 4.65-1.65 1-.95 1.6-2.25 1.8-3.9h-3.3c-.15.9-.55 1.6-1.2 2.1-.65.5-1.5.75-2.55.75-1.15 0-2-.3-2.55-.9-.55-.6-.85-1.4-.85-2.4 0-.75.2-1.35.6-1.8.4-.45.95-.8 1.65-1.05l2.85-1.05c1.3-.45 2.25-1.05 2.85-1.8.6-.75.9-1.7.9-2.85 0-1.4-.5-2.55-1.5-3.45-1-0.9-2.35-1.35-4.05-1.35z" />
    </svg>
  ),
  'Tailwind CSS': (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98.98 2.12 2.11 4.59 2.11 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.03 14.47 6 12 6zm-5 7c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98.98 2.12 2.11 4.59 2.11 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 14.03 9.47 13 7 13z" />
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C8.5 6.5 7 10 7 13.5c0 2.5 1 4.5 2.5 5.5.5.35 1 .5 1.5.5.5 0 1-.15 1.5-.5 1.5-1 2.5-3 2.5-5.5 0-3.5-1.5-7-5-11.5z" />
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C9 2 7 4 7 7v2H5v11h14V9h-2V7c0-3-2-5-5-5zm-2 7V7c0-1.1.9-2 2-2s2 .9 2 2v2h-4zm2 4c.55 0 1 .45 1 1v3h-2v-3c0-.55.45-1 1-1z" />
    </svg>
  ),
}

function ProfilePortrait({ hero, reducedMotion }) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col items-center gap-5 mb-10 md:mb-12">
      <motion.div
        className="hero-profile-frame relative"
        animate={reducedMotion ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="hero-profile-glow" aria-hidden />
        <div className="hero-profile-media">
          <video
            src={hero.profileVideo || '/logo-hero.mp4.mp4'}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            aria-label={hero.name}
          />
        </div>
      </motion.div>

      <div className="hero-availability-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide">
        <span className="hero-availability-dot" aria-hidden />
        {hero.availabilityBadge || 'Available for Freelance'}
      </div>
    </motion.div>
  )
}

export default function HeroSection({ hero }) {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="hero"
      className="hero-section relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20 px-6 sm:px-8 scroll-mt-0"
    >
      {/* Clean luxury background */}
      <div className="hero-bg absolute inset-0" aria-hidden>
        <div className="hero-bg-base" />
        <div className="hero-bg-glow hero-bg-glow-a" />
        <div className="hero-bg-glow hero-bg-glow-b" />
        <div className="hero-bg-texture" />
        <div className="hero-bg-fade" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 w-full max-w-4xl mx-auto text-center"
      >
        <ProfilePortrait hero={hero} reducedMotion={reducedMotion} />

        <motion.p
          variants={fadeUp}
          className="text-primary/90 font-medium text-xs sm:text-sm tracking-[0.2em] uppercase mb-5 md:mb-6"
        >
          {hero.role}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="hero-headline font-bold text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.75rem] mb-6 md:mb-8 text-foreground"
        >
          <HighlightedHeadline text={hero.headline} highlights={hero.headlineHighlights} />
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed"
        >
          {hero.supportingLine || hero.subtitle}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 md:mb-12"
        >
          <CtaButton href={hero.ctaPrimaryLink || '/hire-me'} variant="primary">
            {hero.ctaPrimary || 'Hire Me'}
          </CtaButton>
          <CtaButton href={hero.ctaSecondaryLink || '/projects'} variant="secondary">
            {hero.ctaSecondary || 'View Projects'}
          </CtaButton>
        </motion.div>

        {hero.trustBadges?.length > 0 && (
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-12 md:mb-16"
          >
            {hero.trustBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <svg
                  className="w-3 h-3 text-primary/70 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {badge}
              </span>
            ))}
          </motion.div>
        )}

        {hero.stats?.length > 0 && (
          <motion.div
            variants={fadeUp}
            className="hero-stats-row grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 max-w-3xl mx-auto mb-12 md:mb-16"
          >
            {hero.stats.map((stat) => (
              <AnimatedStat
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>
        )}

        {hero.technologies?.length > 0 && (
          <motion.div variants={fadeUp} className="pt-2">
            <p className="text-[11px] text-muted-foreground/70 font-medium mb-5 uppercase tracking-[0.18em]">
              Built With
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-x-8">
              {hero.technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="hero-tech-item flex flex-col items-center gap-2"
                  title={tech.name}
                >
                  <span className="hero-tech-icon" style={{ color: tech.color }}>
                    {TECH_ICONS[tech.name]}
                  </span>
                  <span className="text-[10px] text-muted-foreground/80 font-medium">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.a
        href="/about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hero-scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        aria-label="View about page"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.a>
    </section>
  )
}
