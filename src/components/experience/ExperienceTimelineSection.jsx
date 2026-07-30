'use client'

import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  CodeIcon,
  PaletteIcon,
  ServerIcon,
  BriefcaseIcon,
  LightbulbIcon,
  RocketIcon,
} from '../Icons'

const ICON_MAP = {
  lightbulb: LightbulbIcon,
  palette: PaletteIcon,
  server: ServerIcon,
  code: CodeIcon,
  briefcase: BriefcaseIcon,
  rocket: RocketIcon,
}

const PARTICLE_COUNT = 18

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
}

const badgeStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const badgeItem = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function TimelineParticles({ reducedMotion }) {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 10 + 12,
        delay: Math.random() * 4,
        opacity: Math.random() * 0.25 + 0.08,
      })),
    []
  )

  if (reducedMotion) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary/50"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -24, 8, -16, 0],
            x: [0, 10, -6, 4, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.6, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}

function MilestoneCard({ milestone, align }) {
  const Icon = ICON_MAP[milestone.icon] || CodeIcon

  return (
    <motion.article
      initial={{ opacity: 0, x: align === 'left' ? -36 : 36, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`experience-milestone-card group ${align === 'left' ? 'md:mr-auto' : 'md:ml-auto'}`}
    >
      <div className="experience-card-border rounded-2xl p-[1px]">
        <motion.div
          className="experience-card-border-glow absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
          aria-hidden
        />
        <div className="experience-card-inner relative rounded-2xl p-5 md:p-6">
          <div className="experience-card-shine" aria-hidden />
          <div className="flex items-start gap-4 relative z-10">
            <div className="experience-milestone-icon flex-shrink-0">
              <Icon className="w-5 h-5" aria-hidden />
            </div>
            <div className="flex-1 min-w-0">
              <span className="experience-year-badge">{milestone.year}</span>
              <h3 className="font-bold text-lg md:text-xl text-foreground mt-3 mb-2 group-hover:text-primary transition-colors">
                {milestone.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                {milestone.description}
              </p>
              <ul
                className="flex flex-wrap gap-2"
                aria-label={`Technologies for ${milestone.title}`}
              >
                {milestone.technologies.map((tech) => (
                  <li key={tech}>
                    <span className="experience-tech-tag">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function TimelineNode({ milestone, isLast, reducedMotion }) {
  const Icon = ICON_MAP[milestone.icon] || CodeIcon

  return (
    <div className="flex flex-col items-center flex-shrink-0">
      <motion.div
        initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="experience-timeline-node"
      >
        <Icon className="w-5 h-5" aria-hidden />
      </motion.div>
      {!isLast && (
        <motion.div
          className="experience-timeline-line hidden md:block"
          initial={reducedMotion ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.12 }}
          style={{ transformOrigin: 'top' }}
          aria-hidden
        />
      )}
    </div>
  )
}

function MobileMilestone({ milestone, isLast, reducedMotion }) {
  const Icon = ICON_MAP[milestone.icon] || CodeIcon

  return (
    <div className="flex gap-4 md:hidden">
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={reducedMotion ? false : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="experience-timeline-node"
        >
          <Icon className="w-5 h-5" aria-hidden />
        </motion.div>
        {!isLast && (
          <motion.div
            className="experience-timeline-line-mobile"
            initial={reducedMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ transformOrigin: 'top' }}
            aria-hidden
          />
        )}
      </div>
      <div className="flex-1 pb-10">
        <MilestoneCard milestone={milestone} align="right" />
      </div>
    </div>
  )
}

function DesktopMilestone({ milestone, index, isLast, reducedMotion }) {
  const isLeft = index % 2 === 0

  return (
    <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start mb-6">
      <div className={isLeft ? '' : 'col-start-3'}>
        {isLeft ? <MilestoneCard milestone={milestone} align="left" /> : null}
      </div>
      <div className="col-start-2">
        <TimelineNode milestone={milestone} isLast={isLast} reducedMotion={reducedMotion} />
      </div>
      <div className={isLeft ? 'col-start-3' : 'col-start-1 row-start-1'}>
        {!isLeft ? <MilestoneCard milestone={milestone} align="right" /> : null}
      </div>
    </div>
  )
}

function CurrentFocusCard({ currentFocus, reducedMotion }) {
  if (!currentFocus) return null

  return (
    <motion.div
      {...fadeInUp}
      transition={{ delay: 0.1 }}
      className="experience-focus-card relative rounded-2xl p-8 md:p-10 text-center overflow-hidden"
    >
      <div className="experience-focus-glow" aria-hidden />
      <div className="relative z-10">
        <motion.div
          className="experience-focus-icon mx-auto mb-5"
          animate={reducedMotion ? {} : { y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <RocketIcon className="w-6 h-6" aria-hidden />
        </motion.div>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          {currentFocus.title}
        </h3>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          {currentFocus.description}
        </p>
        <motion.ul
          variants={badgeStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="flex flex-wrap justify-center gap-2.5 md:gap-3"
          aria-label="Current focus technologies"
        >
          {currentFocus.technologies.map((tech) => (
            <motion.li key={tech} variants={badgeItem}>
              <motion.span
                className="experience-focus-badge"
                whileHover={reducedMotion ? {} : { scale: 1.06, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              >
                {tech}
              </motion.span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  )
}

export default function ExperienceTimelineSection({ experienceTimeline }) {
  const reducedMotion = useReducedMotion()
  const milestones = experienceTimeline?.milestones || []
  const currentFocus = experienceTimeline?.currentFocus

  if (!milestones.length) return null

  return (
    <section
      id="experience"
      className="experience-section relative scroll-mt-20 overflow-hidden"
      aria-labelledby="experience-heading"
    >
      <div className="experience-section-bg" aria-hidden />
      <TimelineParticles reducedMotion={reducedMotion} />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 py-24 md:py-28">
        <motion.header {...fadeInUp} className="text-center mb-16 md:mb-20">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            My Path
          </p>
          <h2
            id="experience-heading"
            className="text-4xl md:text-5xl font-bold text-foreground mb-5 tracking-tight"
          >
            Experience & <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {experienceTimeline.subtitle}
          </p>
        </motion.header>

        <div className="md:hidden">
          {milestones.map((milestone, i) => (
            <MobileMilestone
              key={`${milestone.year}-${milestone.title}`}
              milestone={milestone}
              isLast={i === milestones.length - 1}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        <div className="hidden md:block relative">
          <motion.div
            className="experience-timeline-rail absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            initial={reducedMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: 'top' }}
            aria-hidden
          />
          {milestones.map((milestone, i) => (
            <DesktopMilestone
              key={`${milestone.year}-${milestone.title}`}
              milestone={milestone}
              index={i}
              isLast={i === milestones.length - 1}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        <div className="mt-12 md:mt-16">
          <CurrentFocusCard currentFocus={currentFocus} reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  )
}
