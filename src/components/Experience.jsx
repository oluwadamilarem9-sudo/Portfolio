import { portfolioData } from '../data/portfolio'

export default function Experience() {
  const { experience } = portfolioData

  return (
    <section id="experience" className="section-padding bg-surface-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
          Professional Experience
        </h2>
        <p className="text-surface-400 mb-16 max-w-2xl">
          3+ years building real systems in production
        </p>

        <div className="space-y-12">
          {experience.map((exp, i) => (
            <div key={i} className="relative pl-8 border-l-2 border-accent-500/50">
              <div className="absolute -left-2 top-0 w-3 h-3 rounded-full bg-accent-500" />
              <h3 className="font-display font-semibold text-xl text-white mb-4">
                {exp.role}
              </h3>
              <ul className="space-y-2">
                {exp.points.map((point, j) => (
                  <li key={j} className="text-surface-400 flex gap-3">
                    <span className="text-accent-500 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
