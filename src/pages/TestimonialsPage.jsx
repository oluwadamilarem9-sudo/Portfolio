import { portfolioData } from '../data/portfolio'
import Footer from '../components/Footer'

export default function TestimonialsPage() {
  const { testimonials } = portfolioData

  return (
    <>
      <section className="min-h-[40vh] pt-32 section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-surface-900 dark:text-white mb-4">
            Client Testimonials
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mb-16 max-w-2xl">
            What people say about working with me
          </p>

          <div className="space-y-12">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/30 relative"
              >
                <span className="absolute top-6 right-6 text-6xl text-accent-500/20 font-display">"</span>
                <p className="text-surface-700 dark:text-surface-300 text-lg leading-relaxed mb-6 relative z-10">
                  {t.quote}
                </p>
                <div>
                  <p className="font-display font-semibold text-surface-900 dark:text-white">{t.name}</p>
                  <p className="text-sm text-surface-500 dark:text-surface-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
