'use client'

'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const REVEAL_EASE = [0.22, 1, 0.36, 1]

/**
 * Cinematic circular theme reveal expanding from the toggle origin.
 */
export default function ThemeRevealOverlay() {
  const { reveal } = useTheme()
  const reducedMotion = useReducedMotion()

  if (reducedMotion) return null

  return (
    <AnimatePresence>
      {reveal && (
        <motion.div
          key={`${reveal.nextTheme}-${reveal.x}-${reveal.y}`}
          className={`theme-reveal-overlay theme-reveal-${reveal.nextTheme}`}
          aria-hidden
          initial={{
            clipPath: `circle(0px at ${reveal.x}px ${reveal.y}px)`,
            opacity: 1,
          }}
          animate={{
            clipPath: `circle(${reveal.maxRadius}px at ${reveal.x}px ${reveal.y}px)`,
            opacity: 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            clipPath: { duration: reveal.duration, ease: REVEAL_EASE },
            opacity: { duration: 0.12, ease: 'easeOut' },
          }}
        >
          <div className="theme-reveal-surface" />
          <div className="theme-reveal-glow" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
