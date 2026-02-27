import { portfolioData } from '../data/portfolio'
import Footer from '../components/Footer'

export default function ContactPage() {
  const { personal } = portfolioData

  return (
    <>
      <section className="min-h-[60vh] pt-32 section-padding">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-surface-900 dark:text-white mb-4">
            Let's Build Something
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mb-12">
            Ready to discuss your next project? I'm open to remote roles, freelance SaaS builds, and startup opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent-500 text-surface-950 font-semibold hover:bg-accent-400 transition-colors shadow-lg shadow-accent-500/20"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-surface-300 dark:border-surface-700 text-surface-700 dark:text-surface-300 font-medium hover:border-accent-500/50 hover:text-accent-600 dark:hover:text-accent-500 transition-colors"
            >
              View GitHub
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
