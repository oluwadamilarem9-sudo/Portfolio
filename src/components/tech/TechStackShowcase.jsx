'use client'

'use client'

import { memo, useCallback, useMemo, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion'
import { TechLogo } from './TechLogos'

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const categoryVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const FLOATING_ICONS = [
  { name: 'React', x: '8%', y: '12%', delay: 0, duration: 14 },
  { name: 'Node.js', x: '88%', y: '18%', delay: 1, duration: 16 },
  { name: 'TypeScript', x: '92%', y: '72%', delay: 2, duration: 18 },
  { name: 'Docker', x: '6%', y: '78%', delay: 0.5, duration: 15 },
  { name: 'PostgreSQL', x: '48%', y: '6%', delay: 1.5, duration: 17 },
  { name: 'Vite', x: '72%', y: '88%', delay: 2.5, duration: 13 },
]

function TechTooltip({ description, children, reducedMotion }) {
  const [show, setShow] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            role="tooltip"
            initial={reducedMotion ? false : { opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="tech-tooltip pointer-events-none absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 px-3 py-2.5 rounded-xl text-xs leading-relaxed text-center"
          >
            {description}
            <span className="tech-tooltip-arrow" aria-hidden />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const TechCard = memo(function TechCard({ tech, index, reducedMotion }) {
  const cardRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springCfg = { stiffness: 260, damping: 22 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springCfg)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springCfg)

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
    <TechTooltip description={tech.description} reducedMotion={reducedMotion}>
      <motion.div
        ref={cardRef}
        className="tech-card-wrapper flex-shrink-0 snap-center"
        style={{ perspective: 800 }}
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ delay: index * 0.04, duration: 0.45 }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <motion.div
          className="tech-card group"
          style={
            reducedMotion
              ? undefined
              : { rotateX, rotateY, transformStyle: 'preserve-3d' }
          }
          whileHover={reducedMotion ? {} : { scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="tech-card-glow" style={{ '--tech-color': tech.color }} aria-hidden />
          <div className="tech-card-border-spin" aria-hidden />
          <div className="tech-card-inner">
            <div
              className="tech-card-icon"
              style={{ color: tech.color, '--tech-color': tech.color }}
            >
              <TechLogo name={tech.name} className="w-9 h-9 md:w-10 md:h-10" />
            </div>
            <span className="tech-card-name">{tech.name}</span>
          </div>
        </motion.div>
      </motion.div>
    </TechTooltip>
  )
})

function FloatingTechIcons({ reducedMotion }) {
  if (reducedMotion) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {FLOATING_ICONS.map((item) => (
        <motion.div
          key={item.name}
          className="absolute tech-floating-icon"
          style={{ left: item.x, top: item.y, color: 'hsl(var(--primary) / 0.12)' }}
          animate={{
            y: [0, -18, 8, -12, 0],
            x: [0, 10, -6, 4, 0],
            rotate: [0, 5, -3, 2, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
        >
          <TechLogo name={item.name} className="w-10 h-10 md:w-14 md:h-14" />
        </motion.div>
      ))}
    </div>
  )
}

function CategorySection({ category, reducedMotion }) {
  return (
    <motion.div variants={categoryVariants} className="tech-category-block">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6 md:mb-8">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
            <span className="tech-category-accent" aria-hidden />
            {category.title}
          </h3>
          <p className="text-muted-foreground text-sm md:text-base mt-1 max-w-xl">
            {category.description}
          </p>
        </div>
        <span className="text-xs font-medium text-primary/80 uppercase tracking-widest hidden sm:block">
          {category.technologies.length} technologies
        </span>
      </div>

      {/* Mobile carousel */}
      <div
        className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 tech-carousel-scroll"
        role="list"
        aria-label={`${category.title} technologies`}
      >
        {category.technologies.map((tech, i) => (
          <TechCard key={tech.name} tech={tech} index={i} reducedMotion={reducedMotion} />
        ))}
      </div>

      {/* Desktop grid */}
      <div
        className="hidden md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-5"
        role="list"
        aria-label={`${category.title} technologies`}
      >
        {category.technologies.map((tech, i) => (
          <TechCard key={tech.name} tech={tech} index={i} reducedMotion={reducedMotion} />
        ))}
      </div>
    </motion.div>
  )
}

export default function TechStackShowcase({ techStack }) {
  const reducedMotion = useReducedMotion()
  const categories = useMemo(() => techStack?.categories ?? [], [techStack])

  if (!categories.length) return null

  return (
    <section id="skills" className="tech-stack-section relative scroll-mt-20 overflow-hidden">
      <div className="tech-stack-bg" aria-hidden />
      <FloatingTechIcons reducedMotion={reducedMotion} />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 tech-neon-text">
            Technical Arsenal
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 tracking-tight">
            {techStack.title || 'Tech Stack'}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {techStack.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-16 md:space-y-20"
        >
          {categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
