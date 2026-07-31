'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const BUBBLE_COUNT = 10

function createBubbles() {
  return Array.from({ length: BUBBLE_COUNT }, (_, i) => {
    const size = Math.round(24 + Math.random() * 70)
    return {
      id: i,
      size,
      left: Math.random() * 100,
      top: Math.random() * 110 - 5,
      opacity: 0.06 + Math.random() * 0.06,
      duration: 22 + Math.random() * 20,
      delay: -Math.random() * 30,
      drift: (Math.random() - 0.5) * 36,
      rotate: (Math.random() - 0.5) * 18,
      scaleMid: 1 + (Math.random() - 0.5) * 0.1,
      depth: 0.3 + Math.random() * 0.6,
      blur: size > 60 ? 0.9 : 0.4,
    }
  })
}

/**
 * Global frosted-glass bubbles — CSS float animations + light pointer parallax.
 * Count reduced for smoother scrolling / lower GPU cost.
 */
export default function GlassBubblesBackground() {
  const reducedMotion = useReducedMotion()
  const layerRef = useRef(null)
  const rafRef = useRef(0)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const bubbles = useMemo(() => createBubbles(), [])
  const enabledRef = useRef(false)

  useEffect(() => {
    if (reducedMotion) return undefined

    const connection = typeof navigator !== 'undefined' ? navigator.connection : null
    if (connection?.saveData) return undefined
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
      return undefined
    }

    enabledRef.current = true
    const layer = layerRef.current
    if (!layer) return undefined

    const onMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      targetRef.current = {
        x: ((e.clientX - cx) / cx) * 10,
        y: ((e.clientY - cy) / cy) * 7,
      }
    }

    const tick = () => {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      const cur = currentRef.current
      const tgt = targetRef.current
      cur.x += (tgt.x - cur.x) * 0.04
      cur.y += (tgt.y - cur.y) * 0.04
      layer.style.setProperty('--bubble-px', `${cur.x.toFixed(2)}px`)
      layer.style.setProperty('--bubble-py', `${cur.y.toFixed(2)}px`)
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <div ref={layerRef} className="glass-bubbles-layer" aria-hidden>
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="glass-bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            top: `${b.top}%`,
            opacity: b.opacity,
            '--bubble-duration': `${b.duration}s`,
            '--bubble-delay': `${b.delay}s`,
            '--bubble-drift': `${b.drift}px`,
            '--bubble-rotate': `${b.rotate}deg`,
            '--bubble-scale': b.scaleMid,
            '--bubble-depth': b.depth,
            '--bubble-blur': `${b.blur}px`,
          }}
        />
      ))}
    </div>
  )
}
