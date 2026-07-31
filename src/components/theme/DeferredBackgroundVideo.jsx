'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Loads the full-site background video only after first paint / idle time.
 * Skips on mobile, reduced-motion, and Save-Data to keep first load fast.
 */
export default function DeferredBackgroundVideo({
  src = '/thunder-backgroud-pages.png.mp4.mp4',
}) {
  const reducedMotion = useReducedMotion()
  const videoRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (reducedMotion) return undefined

    const connection = typeof navigator !== 'undefined' ? navigator.connection : null
    const saveData = Boolean(connection?.saveData)
    const slowNet = ['slow-2g', '2g'].includes(connection?.effectiveType || '')
    const isNarrow = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

    if (saveData || slowNet || isNarrow) return undefined

    let idleId
    let timeoutId

    const enable = () => setShouldLoad(true)

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 1800 })
    } else {
      timeoutId = window.setTimeout(enable, 900)
    }

    return () => {
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [reducedMotion])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return undefined

    const playSafe = () => {
      video.play().catch(() => {})
    }

    playSafe()

    const onVisibility = () => {
      if (document.hidden) video.pause()
      else playSafe()
    }

    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [shouldLoad])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      {shouldLoad ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="theme-bg-video absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="theme-bg-video-fallback absolute inset-0" />
      )}
      <div className="theme-video-overlay absolute inset-0" />
    </div>
  )
}
