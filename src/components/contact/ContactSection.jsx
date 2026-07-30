'use client'

import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MailIcon, GithubIcon, TwitterIcon, GlobeIcon } from '../Icons'
import ContactForm from '../ContactForm'
import Toast, { useToast } from './Toast'
import { resolveBookingUrl, getCalendlyEmbedUrl, canEmbedBooking } from './calendlyUtils'

function LinkedInIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function CalendarIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

const SOCIAL_ICONS = {
  GitHub: GithubIcon,
  Twitter: TwitterIcon,
  LinkedIn: LinkedInIcon,
}

function ReviewCard({ review }) {
  return (
    <div className="contact-review-card flex-shrink-0 w-[min(100%,20rem)] min-w-[260px] md:w-[20rem]">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={
            review.image ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=14b8a6&color=fff&size=64`
          }
          alt={review.name}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/30"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=14b8a6&color=fff&size=64`
          }}
        />
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-sm truncate">{review.name}</p>
          <p className="text-muted-foreground text-xs truncate">{review.role}</p>
        </div>
      </div>
      <div className="flex gap-0.5 mb-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg key={s} className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 italic">
        &quot;{review.quote}&quot;
      </p>
    </div>
  )
}

function ReviewsCarousel({ testimonials }) {
  if (!testimonials?.length) return null
  const strip = [...testimonials.slice(0, 6), ...testimonials.slice(0, 6)]

  return (
    <div className="overflow-hidden w-full">
      <div className="flex gap-5 animate-scroll-left-slow" style={{ width: 'max-content' }}>
        {strip.map((t, i) => (
          <ReviewCard key={`${t.name}-${i}`} review={t} />
        ))}
      </div>
    </div>
  )
}

function CalendlyEmbed({ eventUrl }) {
  const [loaded, setLoaded] = useState(false)
  const embedUrl = getCalendlyEmbedUrl(eventUrl)
  if (!embedUrl) return null

  return (
    <div className="contact-calendly-wrap relative rounded-xl overflow-hidden min-h-[420px]">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center contact-skeleton-shimmer">
          <span className="text-muted-foreground text-sm">Loading calendar...</span>
        </div>
      )}
      <iframe
        src={embedUrl}
        title="Schedule a call"
        className={`w-full h-[420px] md:h-[480px] border-0 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  )
}

export default function ContactSection({ contact, personal, testimonials }) {
  const { toasts, showToast, dismissToast } = useToast()
  const [emailCopied, setEmailCopied] = useState(false)

  const bookingUrl = useMemo(() => resolveBookingUrl(contact), [contact])
  const bookingHref = bookingUrl || contact.bookingLink || '/hire-me'
  const bookingExternal = Boolean(bookingUrl)

  const whatsappUrl = useMemo(() => {
    const phone = personal.phone?.replace(/\D/g, '') || ''
    const text = encodeURIComponent(contact.whatsappMessage || "Hi! I'd like to discuss a project.")
    return phone ? `https://wa.me/${phone}?text=${text}` : null
  }, [personal.phone, contact.whatsappMessage])

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setEmailCopied(true)
      showToast('Email copied to clipboard!', 'success')
      setTimeout(() => setEmailCopied(false), 2000)
    } catch {
      showToast('Could not copy email. Please copy manually.', 'error')
    }
  }, [personal.email, showToast])

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5 },
  }

  return (
    <section id="contact" className="contact-section relative scroll-mt-20 overflow-hidden">
      <div className="contact-section-bg" aria-hidden />
      <Toast toasts={toasts} onDismiss={dismissToast} />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 py-24 md:py-28">
        {/* Header */}
        <motion.div {...fadeUp} className="text-center mb-10 md:mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Start Your Project
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {contact.headline || "Let's Work"}{' '}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            {contact.subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 contact-response-badge"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {contact.responseTime || 'Usually replies within 1 hour'}
          </motion.div>
        </motion.div>

        {/* Trust badges */}
        {contact.trustBadges?.length > 0 && (
          <motion.div
            {...fadeUp}
            className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16"
          >
            {contact.trustBadges.map((badge) => (
              <span key={badge} className="contact-trust-badge">
                <svg className="w-3.5 h-3.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {badge}
              </span>
            ))}
          </motion.div>
        )}

        {/* Main grid: contact cards + form */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 mb-16 md:mb-20">
          {/* Left: quick contact cards */}
          <motion.div {...fadeUp} className="lg:col-span-2 space-y-4">
            {/* Email card */}
            <div className="contact-glass-card p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="contact-icon-wrap">
                  <MailIcon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                  <p className="text-foreground font-semibold truncate">{personal.email}</p>
                </div>
                <motion.button
                  type="button"
                  onClick={copyEmail}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="contact-copy-btn flex-shrink-0"
                  aria-label="Copy email"
                >
                  {emailCopied ? (
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>

            {/* WhatsApp */}
            {whatsappUrl && (
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="contact-glass-card contact-whatsapp-card p-5 md:p-6 flex items-center gap-4 group"
              >
                <div className="contact-icon-wrap contact-icon-whatsapp">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-emerald-400 transition-colors">
                    Chat on WhatsApp
                  </p>
                  <p className="text-muted-foreground text-sm">Quick response, direct line</p>
                </div>
                <svg className="w-5 h-5 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            )}

            {/* Book a call — Calendly when configured, otherwise Hire Me */}
            <BookingCard
              href={bookingHref}
              external={bookingExternal}
              label={contact.calendlyLabel || 'Book a Free Discovery Call'}
              subtitle={bookingExternal ? '30-min free consultation' : 'Share your project details'}
            />

            {/* Social links */}
            <div className="contact-glass-card p-5 md:p-6">
              <p className="text-sm font-medium text-muted-foreground mb-4">Connect on social</p>
              <div className="flex flex-wrap gap-3">
                {(contact.socialLinks || []).map((link) => {
                  const Icon = SOCIAL_ICONS[link.platform] || GlobeIcon
                  return (
                    <motion.a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -4, scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="contact-social-btn group"
                      title={link.handle}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="sr-only">{link.platform}</span>
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 contact-glass-card contact-form-card p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-foreground mb-1">Send a Message</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Share your project details and I&apos;ll respond personally.
            </p>
            <ContactForm
              email={personal.email}
              onToast={showToast}
            />
          </motion.div>
        </div>

        {/* Booking — Calendly embed or Google Calendar link */}
        {bookingUrl && (
          <motion.div {...fadeUp} className="mb-16 md:mb-20">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Or <span className="gradient-text">Schedule Directly</span>
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Pick a time that works for you — no back-and-forth needed.
              </p>
            </div>
            <div className="contact-glass-card p-2 md:p-3">
              {canEmbedBooking(bookingUrl) ? (
                <CalendlyEmbed eventUrl={bookingUrl} />
              ) : (
                <GoogleBookingCard url={bookingUrl} label={contact.calendlyLabel} />
              )}
            </div>
          </motion.div>
        )}

        {/* Client reviews */}
        {testimonials?.length > 0 && (
          <motion.div {...fadeUp}>
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Client <span className="gradient-text">Reviews</span>
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Trusted by founders and teams who value quality delivery
              </p>
            </div>
            <ReviewsCarousel testimonials={testimonials} />
          </motion.div>
        )}
      </div>
    </section>
  )
}

function GoogleBookingCard({ url, label }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 md:py-20">
      <div className="contact-icon-wrap w-16 h-16 mb-6">
        <CalendarIcon className="w-8 h-8" />
      </div>
      <h4 className="text-xl md:text-2xl font-bold text-foreground mb-2">
        {label || 'Book a Free Discovery Call'}
      </h4>
      <p className="text-muted-foreground text-sm md:text-base max-w-md mb-8">
        Choose an available slot on my Google Calendar — it only takes a minute.
      </p>
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow"
      >
        <CalendarIcon className="w-5 h-5" />
        Open Booking Calendar
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </motion.a>
    </div>
  )
}

function BookingCard({ href, external, label, subtitle }) {
  const className =
    'contact-glass-card p-5 md:p-6 flex items-center gap-4 group'
  const inner = (
    <>
      <div className="contact-icon-wrap">
        <CalendarIcon className="w-6 h-6" />
      </div>
      <div>
        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {label}
        </p>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>
      <svg
        className="w-5 h-5 text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </>
  )

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={className}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
      <Link href={href} className={className}>
        {inner}
      </Link>
    </motion.div>
  )
}
