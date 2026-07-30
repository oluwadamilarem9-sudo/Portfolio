'use client'

import { useCallback, useId, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { resolveBookingUrl } from '../contact/calendlyUtils'

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function AccordionIcon({ isOpen, reducedMotion }) {
  return (
    <span
      className="faq-accordion-icon flex-shrink-0"
      aria-hidden
    >
      <motion.span
        className="faq-accordion-line faq-accordion-line-h"
        animate={reducedMotion ? {} : { scaleX: 1 }}
      />
      <motion.span
        className="faq-accordion-line faq-accordion-line-v"
        animate={
          reducedMotion
            ? {}
            : { scaleY: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }
        }
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </span>
  )
}

function FaqItem({ faq, index, isOpen, onToggle, reducedMotion }) {
  const panelId = useId()
  const buttonId = useId()

  return (
    <motion.div
      variants={item}
      className={`faq-item group ${isOpen ? 'faq-item-open' : ''}`}
    >
      <div className="faq-item-border rounded-2xl p-[1px]">
        <div className="faq-item-inner rounded-2xl overflow-hidden">
          <div className="faq-item-shine" aria-hidden />
          <h3 className="m-0">
            <button
              id={buttonId}
              type="button"
              onClick={() => onToggle(index)}
              className="faq-accordion-trigger w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="font-semibold text-foreground text-base md:text-lg pr-2 group-hover:text-primary transition-colors">
                {faq.question}
              </span>
              <AccordionIcon isOpen={isOpen} reducedMotion={reducedMotion} />
            </button>
          </h3>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div className="faq-accordion-panel px-5 md:px-6 pb-5 md:pb-6 pt-0">
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default function FaqSection({ faq, contact }) {
  const reducedMotion = useReducedMotion()
  const [openIndex, setOpenIndex] = useState(null)
  const items = faq?.items || []
  const cta = faq?.cta || {}

  const bookingUrl = useMemo(() => resolveBookingUrl(contact), [contact])
  const scheduleHref = bookingUrl || contact?.bookingLink || '/hire-me'
  const scheduleExternal = Boolean(bookingUrl)

  const handleToggle = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }, [])

  if (!items.length) return null

  return (
    <section
      id="faq"
      className="faq-section relative scroll-mt-20 overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="faq-section-bg" aria-hidden />

      <div className="relative max-w-3xl mx-auto px-6 sm:px-8 py-24 md:py-28">
        <motion.header {...fadeInUp} className="text-center mb-12 md:mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Got Questions?
          </p>
          <h2
            id="faq-heading"
            className="text-4xl md:text-5xl font-bold text-foreground mb-5 tracking-tight"
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {faq.subtitle}
          </p>
        </motion.header>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="space-y-3 md:space-y-4"
        >
          {items.map((entry, index) => (
            <FaqItem
              key={entry.question}
              faq={entry}
              index={index}
              isOpen={openIndex === index}
              onToggle={handleToggle}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.1 }}
          className="faq-cta-card mt-12 md:mt-16 text-center p-8 md:p-12 rounded-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {cta.headline || 'Still Have Questions?'}
          </h3>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            {cta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={cta.primaryLink || '/contact'}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow"
              >
                {cta.primaryLabel || 'Contact Me'}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              {scheduleExternal ? (
                <a
                  href={scheduleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary/60 text-primary font-semibold hover:bg-primary/10 transition-colors"
                >
                  {cta.secondaryLabel || 'Schedule a Call'}
                </a>
              ) : (
                <Link
                  href={scheduleHref}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary/60 text-primary font-semibold hover:bg-primary/10 transition-colors"
                >
                  {cta.secondaryLabel || 'Schedule a Call'}
                </Link>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
