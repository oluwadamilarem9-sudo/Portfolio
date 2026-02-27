import { portfolioData } from '../data/portfolio'

export default function Career() {
  const { career } = portfolioData

  return (
    <section id="career" className="section-padding bg-surface-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
          Career Positioning
        </h2>
        <p className="text-surface-400 mb-12 max-w-2xl">
          Currently targeting opportunities that match my systems-thinking approach
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {career.targets.map((target, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-accent-500/30 bg-accent-500/5 flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-accent-500 flex-shrink-0" />
              <span className="text-surface-200 font-medium">{target}</span>
            </div>
          ))}
        </div>

        <p className="text-surface-400 italic border-l-4 border-accent-500 pl-6">
          {career.note}
        </p>
      </div>
    </section>
  )
}
