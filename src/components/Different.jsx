import { portfolioData } from '../data/portfolio'

export default function Different() {
  const { different } = portfolioData

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
          What Makes Me Different
        </h2>
        <p className="text-surface-400 mb-4">
          Most developers can write code. <span className="text-accent-500 font-semibold">I build systems.</span>
        </p>
        <p className="text-surface-500 mb-12 italic">That's rare.</p>

        <div className="space-y-4">
          {different.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 rounded-xl border-l-4 border-accent-500/50 bg-surface-900/30"
            >
              <span className="text-accent-500 font-mono text-sm">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-surface-300">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
