'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import PageHero from '@/components/layout/PageHero'
import Footer from '@/components/Footer'
import { portfolioData } from '@/data/portfolio'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

function BulletList({ items = [] }) {
  return (
    <ul className="space-y-2 text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-2"><span className="text-primary">•</span><span>{item}</span></li>
      ))}
    </ul>
  )
}

export default function AboutView() {
  const [openFaq, setOpenFaq] = useState(null)
  const { about, education, experience, opensource, different, career, personal, hero, aboutFaqs } = portfolioData

  return (
    <>
      <PageHero
        title="About Me"
        highlight="Me"
        subtitle="Full details, how I work, and answers to questions clients often ask."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      <section className="py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-start">
          <motion.img
            {...fadeInUp}
            src={personal.profileImage || '/dacced.png'}
            alt={hero.name}
            className="w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 rounded-xl object-cover object-top ring-4 ring-primary/30 shadow-premium"
          />
          <div className="flex-1 min-w-0 space-y-6">
            <motion.p {...fadeInUp} className="text-muted-foreground text-lg leading-relaxed">{about.intro}</motion.p>
            <motion.p {...fadeInUp} className="font-semibold text-xl text-primary">{about.tagline}</motion.p>
            <motion.p {...fadeInUp} className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">{about.body}</motion.p>
            <motion.div {...fadeInUp}>
              <h3 className="font-semibold text-xl text-primary mb-3">I specialize in:</h3>
              <BulletList items={about.specialties} />
            </motion.div>
            <motion.p {...fadeInUp} className="text-muted-foreground text-lg leading-relaxed">{about.execution}</motion.p>
            {[
              ['My Mission', about.mission],
              ['My Vision', about.vision],
            ].map(([title, text]) => (
              <motion.div {...fadeInUp} key={title}>
                <h3 className="font-semibold text-xl text-primary mb-2">{title}</h3>
                <p className="text-muted-foreground">{text}</p>
              </motion.div>
            ))}
            <motion.div {...fadeInUp}>
              <h3 className="font-semibold text-xl text-primary mb-3">Core Values</h3>
              {about.coreValues.map((value) => (
                <p key={value.name} className="text-muted-foreground mb-2">
                  <span className="font-medium text-foreground">{value.name}</span> – {value.desc}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 lg:px-24 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-2xl md:text-3xl text-foreground mb-10">What sets me apart</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="card-premium p-6 md:p-8">
              <h3 className="font-semibold text-lg text-primary mb-4">How I think & build</h3>
              <BulletList items={different} />
            </div>
            <div className="card-premium p-6 md:p-8">
              <h3 className="font-semibold text-lg text-primary mb-4">Open source & learning</h3>
              <BulletList items={opensource} />
            </div>
          </div>
          <div className="card-premium p-6 md:p-8 mb-8">
            <h3 className="font-semibold text-lg text-primary mb-4">Experience</h3>
            <div className="space-y-6">
              {experience.map((entry) => (
                <div key={entry.role}>
                  <p className="font-medium text-foreground mb-2">{entry.role}</p>
                  <BulletList items={entry.points} />
                </div>
              ))}
            </div>
          </div>
          <div className="card-premium p-6 md:p-8 mb-8">
            <h3 className="font-semibold text-lg text-primary mb-2">{education.degree}</h3>
            <p className="text-muted-foreground leading-relaxed">{education.description}</p>
          </div>
          <div className="card-premium p-6 md:p-8">
            <h3 className="font-semibold text-lg text-primary mb-3">{career.title}</h3>
            <BulletList items={career.targets} />
            <p className="text-muted-foreground text-sm mt-4">{career.note}</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold text-2xl md:text-3xl text-foreground mb-2">Frequently asked questions</h2>
          <p className="text-muted-foreground mb-10">Common questions about what I do and how we can work together.</p>
          <div className="space-y-3">
            {aboutFaqs.map((faq, index) => (
              <div key={faq.q} className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-4 md:p-5 text-left font-medium text-foreground hover:bg-muted/50"
                  aria-expanded={openFaq === index}
                >
                  {faq.q}<span className="text-primary">{openFaq === index ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <p className="px-4 md:px-5 pb-5 pt-4 text-muted-foreground leading-relaxed border-t border-border">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/hire-me" className="inline-flex px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold">
              Let&apos;s work together
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
