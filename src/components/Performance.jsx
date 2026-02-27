import { portfolioData } from '../data/portfolio'

export default function Performance() {
  const { performance } = portfolioData

  return (
    <section className="section-padding bg-surface-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
          Performance & Scaling
        </h2>
        <p className="text-surface-400 mb-16 max-w-2xl">
          I build systems that are not just functional — but scalable.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {performance.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-surface-800 bg-surface-900/30 card-hover"
            >
              <h4 className="font-display font-semibold text-accent-500 mb-1">
                {item.title}
              </h4>
              <p className="text-surface-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
