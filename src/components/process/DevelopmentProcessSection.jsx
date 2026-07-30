'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  CodeIcon,
  PaletteIcon,
  ServerIcon,
  ChartIcon,
  BriefcaseIcon,
  LightbulbIcon,
  ShieldIcon,
} from '../Icons'

const ICON_MAP = {
  lightbulb: LightbulbIcon,
  chart: ChartIcon,
  palette: PaletteIcon,
  server: ServerIcon,
  shield: ShieldIcon,
  briefcase: BriefcaseIcon,
  code: CodeIcon,
}

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
}

function ProcessStepCard({ step, align }) {
  const Icon = ICON_MAP[step.icon] || CodeIcon

  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'left' ? -32 : 32, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`process-step-card group ${align === 'left' ? 'md:mr-auto' : 'md:ml-auto'}`}
    >
      <div className="process-step-glow" aria-hidden />
      <div className="flex items-start gap-4 relative z-10">
        <div className="process-step-icon">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="process-step-number">{step.number}</span>
            <h3 className="font-bold text-lg md:text-xl text-foreground group-hover:text-primary transition-colors">
              {step.title}
            </h3>
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function TimelineNode({ step, isLast, reducedMotion }) {
  const Icon = ICON_MAP[step.icon] || CodeIcon

  return (
    <div className="flex flex-col items-center flex-shrink-0">
      <motion.div
        initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="process-timeline-node"
      >
        <Icon className="w-5 h-5" />
      </motion.div>
      {!isLast && (
        <motion.div
          className="process-timeline-line hidden md:block"
          initial={reducedMotion ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          style={{ transformOrigin: 'top' }}
        />
      )}
    </div>
  )
}

function MobileTimelineStep({ step, isLast, reducedMotion }) {
  const Icon = ICON_MAP[step.icon] || CodeIcon

  return (
    <div className="flex gap-4 md:hidden">
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={reducedMotion ? false : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="process-timeline-node"
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        {!isLast && (
          <motion.div
            className="process-timeline-line-mobile"
            initial={reducedMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ transformOrigin: 'top' }}
          />
        )}
      </div>
      <div className="flex-1 pb-10">
        <ProcessStepCard step={step} align="right" />
      </div>
    </div>
  )
}

function DesktopTimelineStep({ step, index, isLast, reducedMotion }) {
  const isLeft = index % 2 === 0

  return (
    <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start mb-4">
      <div className={isLeft ? '' : 'col-start-3'}>
        {isLeft ? <ProcessStepCard step={step} align="left" /> : null}
      </div>
      <div className="col-start-2">
        <TimelineNode step={step} isLast={isLast} reducedMotion={reducedMotion} />
      </div>
      <div className={isLeft ? 'col-start-3' : 'col-start-1 row-start-1'}>
        {!isLeft ? <ProcessStepCard step={step} align="right" /> : null}
      </div>
    </div>
  )
}

export default function DevelopmentProcessSection({ developmentProcess }) {
  const reducedMotion = useReducedMotion()
  const steps = developmentProcess?.steps || []
  const cta = developmentProcess?.cta || {}

  if (!steps.length) return null

  return (
    <section id="process" className="process-section relative scroll-mt-20 overflow-hidden">
      <div className="process-section-bg" aria-hidden />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 py-24 md:py-28">
        <motion.div {...fadeInUp} className="text-center mb-16 md:mb-20">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            How I Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-5 tracking-tight">
            Development <span className="gradient-text">Process</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {developmentProcess.subtitle}
          </p>
        </motion.div>

        {/* Mobile timeline */}
        <div className="md:hidden">
          {steps.map((step, i) => (
            <MobileTimelineStep
              key={step.number}
              step={step}
              isLast={i === steps.length - 1}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Desktop alternating timeline */}
        <div className="hidden md:block relative">
          <motion.div
            className="process-timeline-rail absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            initial={reducedMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: 'top' }}
            aria-hidden
          />
          {steps.map((step, i) => (
            <DesktopTimelineStep
              key={step.number}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.1 }}
          className="process-cta-card mt-16 md:mt-20 text-center p-8 md:p-12 rounded-2xl"
        >
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 max-w-2xl mx-auto leading-tight">
            {cta.headline || 'Ready to Turn Your Idea Into Reality?'}
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
                {cta.primaryLabel || 'Start a Project'}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={cta.secondaryLink || '/projects'}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary/60 text-primary font-semibold hover:bg-primary/10 transition-colors"
              >
                {cta.secondaryLabel || 'View My Work'}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
