import { portfolioData } from '../data/portfolio'
import Footer from '../components/Footer'

export default function CapabilitiesPage() {
  const { capabilities, performance, opensource } = portfolioData

  return (
    <>
      <section className="min-h-[40vh] pt-32 section-padding">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-surface-900 dark:text-white mb-16">
            What I've Built
          </h1>

          <h2 className="font-display font-semibold text-2xl text-accent-600 dark:text-accent-500 mb-6">
            Advanced Capabilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/30"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center text-accent-600 dark:text-accent-500 font-bold text-sm">
                  {i + 1}
                </span>
                <p className="text-surface-700 dark:text-surface-300 text-sm leading-relaxed">{cap}</p>
              </div>
            ))}
          </div>

          <h2 className="font-display font-semibold text-2xl text-accent-600 dark:text-accent-500 mb-6">
            Performance & Scaling
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {performance.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/30"
              >
                <h4 className="font-display font-semibold text-accent-600 dark:text-accent-500 mb-1">
                  {item.title}
                </h4>
                <p className="text-surface-600 dark:text-surface-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-display font-semibold text-2xl text-accent-600 dark:text-accent-500 mb-6">
            Open Source & Community
          </h2>
          <div className="flex flex-wrap gap-3">
            {opensource.map((item, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full border border-surface-300 dark:border-surface-700 bg-surface-100 dark:bg-surface-800/50 text-surface-700 dark:text-surface-300 text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
