'use client'

'use client'

import { useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

function SunIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 2.5v2.8M12 18.7v2.8M2.5 12h2.8M18.7 12h2.8M4.9 4.9l2 2M17.1 17.1l2 2M4.9 19.1l2-2M17.1 6.9l2-2" />
      </g>
    </svg>
  )
}

function MoonIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21 14.5A8.5 8.5 0 1111.8 3.2a6.8 6.8 0 109.2 11.3z" />
    </svg>
  )
}

export default function ThemeToggle({ className = '' }) {
  const { isNight, toggleTheme, isRevealing } = useTheme()
  const reducedMotion = useReducedMotion()

  const handleClick = useCallback(
    (e) => {
      if (isRevealing) return
      const rect = e.currentTarget.getBoundingClientRect()
      toggleTheme({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
    },
    [isRevealing, toggleTheme]
  )

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={isRevealing}
      className={`theme-toggle-btn ${className}`}
      aria-label={isNight ? 'Switch to Sunrise mode' : 'Switch to Night mode'}
      aria-pressed={isNight}
      aria-busy={isRevealing || undefined}
      whileHover={reducedMotion || isRevealing ? {} : { scale: 1.06 }}
      whileTap={isRevealing ? {} : { scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <span className="theme-toggle-track" aria-hidden>
        <motion.span
          className="theme-toggle-sun"
          animate={{
            opacity: isNight ? 0 : 1,
            scale: isNight ? 0.6 : 1,
            rotate: isNight ? -20 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <SunIcon />
        </motion.span>
        <motion.span
          className="theme-toggle-moon"
          animate={{
            opacity: isNight ? 1 : 0,
            scale: isNight ? 1 : 0.6,
            rotate: isNight ? 0 : 20,
          }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <MoonIcon />
        </motion.span>
      </span>
      <span className="theme-toggle-label sr-only">
        {isNight ? 'Sunrise' : 'Night'}
      </span>
    </motion.button>
  )
}
