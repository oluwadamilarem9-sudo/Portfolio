import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import Footer from '../components/Footer'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

export default function AboutPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const {
    about,
    education,
    experience,
    opensource,
    different,
    career,
    personal,
    hero,
  } = portfolioData
  const faqs = portfolioData.aboutFaqs || []

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            {...fadeInUp}
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4"
          >
            About <span className="gradient-text">Me</span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            Full details, how I work, and answers to questions clients often ask.
          </motion.p>
        </div>
      </section>

      {/* Full about content */}
      <section className="py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <motion.div
              {...fadeInUp}
              className="flex-shrink-0 w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80"
            >
              <img
                src={personal.profileImage || '/dacced.png'}
                alt={hero.name}
                className="w-full h-full rounded-xl object-cover object-top ring-4 ring-primary/30 shadow-premium"
              />
            </motion.div>
            <div className="flex-1 min-w-0 space-y-6">
              <motion.p {...fadeInUp} className="text-muted-foreground text-lg leading-relaxed">
                {about.intro}
              </motion.p>
              <motion.p {...fadeInUp} className="font-semibold text-xl text-primary">
                {about.tagline}
              </motion.p>
              <motion.p
                {...fadeInUp}
                className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line"
              >
                {about.body}
              </motion.p>
              <motion.div {...fadeInUp}>
                <h3 className="font-semibold text-xl text-primary mb-2">I specialize in:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {about.specialties?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.p {...fadeInUp} className="text-muted-foreground text-lg leading-relaxed">
                {about.execution}
              </motion.p>
              <motion.div {...fadeInUp}>
                <h3 className="font-semibold text-xl text-primary mb-2">My Mission</h3>
                <p className="text-muted-foreground">{about.mission}</p>
              </motion.div>
              <motion.div {...fadeInUp}>
                <h3 className="font-semibold text-xl text-primary mb-2">My Vision</h3>
                <p className="text-muted-foreground">{about.vision}</p>
              </motion.div>
              <motion.div {...fadeInUp}>
                <h3 className="font-semibold text-xl text-primary mb-2">Core Values</h3>
                <div className="space-y-2 mt-2">
                  {about.coreValues?.map((v, i) => (
                    <div key={i}>
                      <span className="font-medium text-foreground">{v.name}</span>
                      <span className="text-muted-foreground"> – {v.desc}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced topics */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            {...fadeInUp}
            className="font-bold text-2xl md:text-3xl text-foreground mb-10"
          >
            What sets me apart
          </motion.h2>

          <motion.div {...fadeInUp} className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card-premium p-6 md:p-8">
              <h3 className="font-semibold text-lg text-primary mb-3">How I think & build</h3>
              <ul className="space-y-2 text-muted-foreground">
                {different?.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-premium p-6 md:p-8">
              <h3 className="font-semibold text-lg text-primary mb-3">Open source & learning</h3>
              <ul className="space-y-2 text-muted-foreground">
                {opensource?.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="card-premium p-6 md:p-8 mb-8">
            <h3 className="font-semibold text-lg text-primary mb-4">Experience</h3>
            <div className="space-y-6">
              {experience?.map((exp, i) => (
                <div key={i}>
                  <p className="font-medium text-foreground">{exp.role}</p>
                  <ul className="mt-2 space-y-1 text-muted-foreground list-disc list-inside">
                    {exp.points?.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="card-premium p-6 md:p-8 mb-8">
            <h3 className="font-semibold text-lg text-primary mb-2">{education?.degree}</h3>
            <p className="text-muted-foreground leading-relaxed">{education?.description}</p>
          </motion.div>

          {career && (
            <motion.div {...fadeInUp} className="card-premium p-6 md:p-8">
              <h3 className="font-semibold text-lg text-primary mb-2">{career.title}</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-3">
                {career.targets?.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
              <p className="text-muted-foreground text-sm">{career.note}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            {...fadeInUp}
            className="font-bold text-2xl md:text-3xl text-foreground mb-2"
          >
            Frequently asked questions
          </motion.h2>
          <motion.p {...fadeInUp} className="text-muted-foreground mb-10">
            Common questions about what I do and how we can work together.
          </motion.p>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-4 md:p-5 text-left font-medium text-foreground hover:bg-muted/50 transition-colors"
                  aria-expanded={openFaqIndex === i}
                >
                  <span>{faq.q}</span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary transition-transform ${
                      openFaqIndex === i ? 'rotate-180' : ''
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaqIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 text-muted-foreground leading-relaxed border-t border-border">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-12 text-center">
            <Link
              to="/hire-me"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Let&apos;s work together
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
