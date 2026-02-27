import { portfolioData } from '../data/portfolio'

export default function Skills() {
  const { skills } = portfolioData
  const skillCategories = [skills.frontend, skills.backend, skills.databases, skills.devops]

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
          Technical Expertise
        </h2>
        <p className="text-surface-400 mb-16 max-w-2xl">
          A comprehensive toolkit for building production-grade systems
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, i) => (
            <div
              key={category.title}
              className="group p-6 rounded-2xl border border-surface-800 bg-surface-900/30 card-hover"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <h3 className="font-display font-semibold text-xl text-accent-500 mb-3">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {category.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-surface-800 text-surface-300 text-sm font-mono border border-surface-700 group-hover:border-accent-500/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-surface-400 text-sm leading-relaxed">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
