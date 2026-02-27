import { Link } from 'react-router-dom'
import { portfolioData } from '../data/portfolio'

export default function Hero() {
  const { hero } = portfolioData

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-100 via-surface-50 to-surface-100 dark:from-surface-950 dark:via-surface-950 dark:to-surface-900 transition-colors duration-300" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-400/20 dark:bg-accent-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 dark:bg-accent-600/5 rounded-full blur-3xl animate-float-delayed" />
      <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, var(--hero-fade) 70%)',
          }}
        />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p
          className="text-accent-600 dark:text-accent-500 font-mono text-sm tracking-widest uppercase mb-4 hero-animate"
          style={{ animationDelay: '0s' }}
        >
          {hero.greeting}
        </p>
        <h1
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-surface-900 dark:text-white mb-6 hero-animate"
          style={{ animationDelay: '0.1s' }}
        >
          {hero.name}
        </h1>
        <p
          className="font-display font-semibold text-2xl md:text-3xl text-accent-600 dark:text-accent-500 mb-8 hero-animate"
          style={{ animationDelay: '0.2s' }}
        >
          {hero.tagline}
        </p>
        <p
          className="text-surface-600 dark:text-surface-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 hero-animate"
          style={{ animationDelay: '0.3s' }}
        >
          {hero.subtitle}
        </p>
        <div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-accent-500/30 bg-accent-500/10 dark:bg-accent-500/5 hero-animate"
          style={{ animationDelay: '0.4s' }}
        >
          <span className="font-mono text-accent-600 dark:text-accent-500 font-bold text-xl">{hero.rating}</span>
          <span className="text-surface-600 dark:text-surface-400 text-sm">{hero.ratingNote}</span>
        </div>
      </div>

      {/* Scroll / Explore indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Link
          to="/about"
          className="text-surface-500 hover:text-accent-600 dark:hover:text-accent-500 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
