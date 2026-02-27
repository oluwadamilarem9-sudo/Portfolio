import { portfolioData } from '../data/portfolio'

export default function Capabilities() {
  const { capabilities } = portfolioData

  return (
    <section id="capabilities" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
          Advanced Capabilities
        </h2>
        <p className="text-surface-400 mb-16 max-w-2xl">
          I have built production systems that handle real complexity
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 rounded-xl border border-surface-800 bg-surface-900/30 hover:border-accent-500/30 transition-colors"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center text-accent-500 font-bold text-sm">
                {i + 1}
              </span>
              <p className="text-surface-300 text-sm leading-relaxed">{cap}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
