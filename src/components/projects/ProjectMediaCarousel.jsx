'use client'

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { resolveImageUrl } from './projectUtils'

function LazyImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const url = resolveImageUrl(src)

  if (!url || error) return null

  return (
    <div className="relative w-full h-full">
      {!loaded && <div className="absolute inset-0 project-skeleton-shimmer" />}
      <img
        src={url}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}

export default function ProjectMediaCarousel({
  project,
  images,
  showVideo = false,
  className = '',
  aspectClass = 'aspect-[16/10]',
}) {
  const [index, setIndex] = useState(0)
  const slides = images.length ? images : project.image ? [project.image] : []
  const hasMultiple = slides.length > 1
  const hasVideo = showVideo && project.videoDemo

  const go = (dir) => {
    setIndex((i) => (i + dir + slides.length) % slides.length)
  }

  if (hasVideo) {
    return (
      <div className={`relative overflow-hidden rounded-xl ${aspectClass} ${className}`}>
        <video
          src={resolveImageUrl(project.videoDemo)}
          controls
          muted
          playsInline
          preload="metadata"
          poster={project.image ? resolveImageUrl(project.image) : undefined}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  if (!slides.length) {
    return (
      <div
        className={`relative overflow-hidden rounded-xl ${aspectClass} bg-gradient-to-br ${project.gradient || 'from-teal-500 to-cyan-500'} flex items-center justify-center ${className}`}
      >
        <span className="text-white/90 text-5xl font-bold">{project.title.charAt(0)}</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-xl ${aspectClass} bg-muted/30 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index]}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <LazyImage src={slides[index]} alt={`${project.title} screenshot ${index + 1}`} className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm border border-border/60 flex items-center justify-center text-foreground hover:bg-primary/10 transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm border border-border/60 flex items-center justify-center text-foreground hover:bg-primary/10 transition-colors"
            aria-label="Next image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-primary w-5' : 'bg-foreground/30'}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
