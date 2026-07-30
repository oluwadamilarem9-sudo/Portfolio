'use client'

'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const BUBBLE_COUNT = 22

function createBubbles() {
  return Array.from({ length: BUBBLE_COUNT }, (_, i) => {
    const size = Math.round(20 + Math.random() * 100)
    return {
      id: i,
      size,
      left: Math.random() * 100,
      top: Math.random() * 110 - 5,
      opacity: 0.07 + Math.random() * 0.07,
      duration: 20 + Math.random() * 25,
      delay: -Math.random() * 40,
      drift: (Math.random() - 0.5) * 48,
      rotate: (Math.random() - 0.5) * 24,
      scaleMid: 1 + (Math.random() - 0.5) * 0.12,
      depth: 0.25 + Math.random() * 0.75,
      blur: size > 70 ? 1.1 : size > 40 ? 0.65 : 0.35,
    }
  })
}

/**
 * Global frosted-glass bubbles — CSS float animations + light pointer parallax.
 */
export default function GlassBubblesBackground() {
  const reducedMotion = useReducedMotion()
  const layerRef = useRef(null)
  const rafRef = useRef(0)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const bubbles = useMemo(() => createBubbles(), [])

  useEffect(() => {
    if (reducedMotion) return undefined

    const layer = layerRef.current
    if (!layer) return undefined

    const onMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      targetRef.current = {
        x: ((e.clientX - cx) / cx) * 12,
        y: ((e.clientY - cy) / cy) * 9,
      }
    }

    const tick = () => {
      const cur = currentRef.current
      const tgt = targetRef.current
      cur.x += (tgt.x - cur.x) * 0.045
      cur.y += (tgt.y - cur.y) * 0.045
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
          className="glass-bubble-parallax"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: b.size,
            height: b.size,
            '--bubble-depth': b.depth,
          }}
        >
          <span
            className="glass-bubble"
            style={{
              width: b.size,
              height: b.size,
              opacity: b.opacity,
              '--bubble-duration': `${b.duration}s`,
              '--bubble-delay': `${b.delay}s`,
              '--bubble-drift': `${b.drift}px`,
              '--bubble-rotate': `${b.rotate}deg`,
              '--bubble-scale': b.scaleMid,
              '--bubble-blur': `${b.blur}px`,
            }}
          />
        </span>
      ))}
    </div>
  )
}
