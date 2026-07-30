import { portfolioData } from '../data/portfolio'

export default function OpenSource() {
  const { opensource } = portfolioData

  return (
    <section className="section-padding bg-surface-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
          Open Source & Community
        </h2>
        <p className="text-surface-400 mb-12 max-w-2xl">
          I believe in building publicly and contributing back to the developer ecosystem.
        </p>

        <div className="flex flex-wrap gap-3">
          {opensource.map((item, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full border border-surface-700 bg-surface-800/50 text-surface-300 text-sm hover:border-accent-500/30 hover:text-accent-500 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
