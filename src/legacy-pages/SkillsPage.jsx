import { portfolioData } from '../data/portfolio'
import Footer from '../components/Footer'

export default function SkillsPage() {
  const { skills } = portfolioData
  const skillCategories = [skills.fullstack, skills.frontend, skills.backend, skills.databases, skills.devops]

  return (
    <>
      <section className="min-h-[40vh] pt-32 section-padding">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-surface-900 dark:text-white mb-4">
            Technical Expertise
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mb-16 max-w-2xl">
            A comprehensive toolkit for building production-grade systems
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="group p-6 rounded-2xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/30 hover:border-accent-500/50 transition-all duration-300"
              >
                <h3 className="font-display font-semibold text-xl text-accent-600 dark:text-accent-500 mb-3">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-surface-200 dark:bg-surface-800 text-surface-700 dark:text-surface-300 text-sm font-mono border border-surface-300 dark:border-surface-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
