import { portfolioData } from '../data/portfolio'
import Footer from '../components/Footer'

export default function AboutPage() {
  const { about, education } = portfolioData

  return (
    <>
      <section className="min-h-[40vh] pt-32 section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-surface-900 dark:text-white mb-8">
            About Me
          </h1>
          <p className="text-surface-600 dark:text-surface-300 text-lg leading-relaxed mb-12">
            {about.content}
          </p>
          <div className="space-y-6 mb-12">
            <div className="p-6 rounded-2xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/30">
              <h2 className="font-display font-semibold text-lg text-accent-600 dark:text-accent-500 mb-2">My Vision</h2>
              <p className="text-surface-600 dark:text-surface-400">{about.vision}</p>
            </div>
            <div className="p-6 rounded-2xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/30">
              <h2 className="font-display font-semibold text-lg text-accent-600 dark:text-accent-500 mb-2">My Values</h2>
              <p className="text-surface-600 dark:text-surface-400">{about.values}</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/30">
            <h2 className="font-display font-semibold text-xl text-accent-600 dark:text-accent-500 mb-3">
              {education.degree}
            </h2>
            <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
              {education.description}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
