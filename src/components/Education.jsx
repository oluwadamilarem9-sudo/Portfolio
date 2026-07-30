import { portfolioData } from '../data/portfolio'

export default function Education() {
  const { education } = portfolioData

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
          Education
        </h2>
        <div className="p-6 rounded-2xl border border-surface-800 bg-surface-900/30">
          <h3 className="font-display font-semibold text-xl text-accent-500 mb-3">
            {education.degree}
          </h3>
          <p className="text-surface-400 leading-relaxed">
            {education.description}
          </p>
        </div>
      </div>
    </section>
  )
}
