'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'portfolio-theme'
const LEGACY_KEY = 'theme'
const REVEAL_MS = 600
const THEME_SWAP_AT = 0.52

function resolveStoredTheme() {
  if (typeof window === 'undefined') return 'night'

  const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_KEY)
  if (stored === 'sunrise' || stored === 'light') return 'sunrise'
  if (stored === 'night' || stored === 'dark') return 'night'

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'sunrise' : 'night'
}

function applyThemeToDocument(theme) {
  const root = document.documentElement
  const isNight = theme === 'night'

  root.dataset.theme = theme
  root.classList.toggle('dark', isNight)
  root.classList.toggle('sunrise', !isNight)
  root.style.colorScheme = isNight ? 'dark' : 'light'
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(resolveStoredTheme)
  const [isReady, setIsReady] = useState(false)
  const [reveal, setReveal] = useState(null)
  const revealingRef = useRef(false)
  const timersRef = useRef([])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }, [])

  useEffect(() => {
    setIsReady(true)
    if (localStorage.getItem(LEGACY_KEY) && !localStorage.getItem(STORAGE_KEY)) {
      const legacy = localStorage.getItem(LEGACY_KEY)
      const migrated = legacy === 'light' ? 'sunrise' : 'night'
      localStorage.setItem(STORAGE_KEY, migrated)
      localStorage.removeItem(LEGACY_KEY)
    }
  }, [])

  useEffect(() => {
    if (reveal) return
    applyThemeToDocument(theme)
  }, [theme, reveal])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (e) => {
      if (localStorage.getItem(STORAGE_KEY) || revealingRef.current) return
      setThemeState(e.matches ? 'sunrise' : 'night')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const commitTheme = useCallback((next) => {
    localStorage.setItem(STORAGE_KEY, next)
    applyThemeToDocument(next)
    setThemeState(next)
  }, [])

  const setTheme = useCallback(
    (next) => {
      if (revealingRef.current) return
      commitTheme(next === 'sunrise' ? 'sunrise' : 'night')
    },
    [commitTheme]
  )

  const finishReveal = useCallback(() => {
    clearTimers()
    const root = document.documentElement
    root.classList.remove('theme-reveal-active', 'theme-reveal-swap')
    setReveal(null)
    revealingRef.current = false
  }, [clearTimers])

  const toggleTheme = useCallback(
    (origin) => {
      if (revealingRef.current) return

      const next = theme === 'night' ? 'sunrise' : 'night'

      if (!origin || prefersReducedMotion()) {
        commitTheme(next)
        return
      }

      const x = origin.x
      const y = origin.y
      const maxRadius =
        Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        ) + 24

      revealingRef.current = true
      clearTimers()
      document.documentElement.classList.add('theme-reveal-active')

      setReveal({
        x,
        y,
        nextTheme: next,
        maxRadius,
        duration: REVEAL_MS / 1000,
      })

      const swapId = window.setTimeout(() => {
        document.documentElement.classList.add('theme-reveal-swap')
        commitTheme(next)
      }, Math.round(REVEAL_MS * THEME_SWAP_AT))

      const endId = window.setTimeout(() => {
        finishReveal()
      }, REVEAL_MS + 40)

      timersRef.current = [swapId, endId]
    },
    [theme, commitTheme, clearTimers, finishReveal]
  )

  const value = useMemo(
    () => ({
      theme,
      isNight: theme === 'night',
      isSunrise: theme === 'sunrise',
      isReady,
      isRevealing: Boolean(reveal),
      reveal,
      setTheme,
      toggleTheme,
      finishReveal,
    }),
    [theme, isReady, reveal, setTheme, toggleTheme, finishReveal]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
