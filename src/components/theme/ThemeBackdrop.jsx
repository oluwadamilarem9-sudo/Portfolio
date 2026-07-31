'use client'

import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const STAR_COUNT = 12
const CLOUDS = [
  { id: 1, top: '18%', left: '8%', width: 120, delay: 0, duration: 38 },
  { id: 2, top: '28%', left: '62%', width: 160, delay: 4, duration: 44 },
  { id: 3, top: '12%', left: '78%', width: 90, delay: 2, duration: 36 },
]

function Stars({ visible, reducedMotion }) {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 65}%`,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2,
      })),
    []
  )

  if (!visible) return null

  return (
    <div className="theme-stars absolute inset-0 pointer-events-none" aria-hidden>
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="theme-star absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: reducedMotion ? 0.6 : [0.3, 0.9, 0.3] }}
          transition={{
            duration: reducedMotion ? 0 : star.duration,
            repeat: reducedMotion ? 0 : Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function Clouds({ visible, reducedMotion }) {
  if (!visible) return null

  return (
    <div className="theme-clouds absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {CLOUDS.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="theme-cloud absolute rounded-full"
          style={{
            top: cloud.top,
            left: cloud.left,
            width: cloud.width,
            height: cloud.width * 0.38,
          }}
          animate={
            reducedMotion
              ? { x: 0 }
              : { x: [0, 28, -12, 0], opacity: [0.55, 0.7, 0.5, 0.55] }
          }
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            delay: cloud.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function ThemeBackdrop() {
  const { isNight } = useTheme()
  const reducedMotion = useReducedMotion()

  return (
    <div className="theme-backdrop fixed inset-0 -z-20 overflow-hidden pointer-events-none" aria-hidden>
      <motion.div
        className="theme-sunrise-layer absolute inset-0"
        animate={{ opacity: isNight ? 0 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="theme-sunrise-gradient absolute inset-0" />
        <motion.div
          className="theme-sun absolute"
          animate={reducedMotion ? {} : { scale: [1, 1.04, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Clouds visible={!isNight} reducedMotion={reducedMotion} />
      </motion.div>

      <motion.div
        className="theme-night-layer absolute inset-0"
        animate={{ opacity: isNight ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="theme-night-gradient absolute inset-0" />
        <div className="theme-moon absolute" />
        <Stars visible={isNight} reducedMotion={reducedMotion} />
      </motion.div>
    </div>
  )
}
