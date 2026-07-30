'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import { GithubIcon, TwitterIcon, MailIcon } from './Icons'

function LinkedInIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const SOCIAL_ICONS = {
  GitHub: GithubIcon,
  Twitter: TwitterIcon,
  LinkedIn: LinkedInIcon,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function FooterLink({ href, label }) {
  return (
    <Link href={href} className="footer-link group">
      <span>{label}</span>
      <span className="footer-link-line" aria-hidden />
    </Link>
  )
}

function SocialIconLink({ link, reducedMotion }) {
  const Icon = SOCIAL_ICONS[link.platform] || MailIcon

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-social-icon"
      aria-label={link.platform}
      whileHover={reducedMotion ? {} : { y: -4, scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  )
}

function BackToTopButton({ reducedMotion }) {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      className="footer-back-to-top group"
      aria-label="Back to top"
      whileHover={reducedMotion ? {} : { y: -3, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
    >
      <motion.svg
        className="w-5 h-5 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
        animate={reducedMotion ? {} : { y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </motion.svg>
      <span className="footer-back-to-top-label">Back to Top</span>
    </motion.button>
  )
}

export default function Footer() {
  const { personal, contact, hero, footer } = portfolioData
  const reducedMotion = useReducedMotion()

  const logo = personal.logo || '/3fe81c63-18c4-4caa-b364-afbb46f30536.png'
  const availability = hero?.availabilityBadge || 'Available for Freelance'
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Process', href: '/process' },
    { label: 'Experience', href: '/experience' },
    { label: 'Contact', href: '/contact' },
    { label: 'Resume', href: '/resume' },
  ]
  const techStack = footer?.techStack || []
  const socialLinks = contact?.socialLinks || []
  const year = new Date().getFullYear()

  return (
    <footer className="footer-section relative overflow-hidden" aria-label="Site footer">
      <div className="footer-section-bg" aria-hidden />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={containerVariants}
        className="footer-glass relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 rounded-2xl"
      >
        <div className="px-6 sm:px-8 lg:px-10 py-12 md:py-14 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand */}
            <motion.div variants={itemVariants} className="lg:col-span-4 space-y-5">
              <Link href="/" className="footer-brand group inline-flex items-center gap-3">
                <span className="footer-brand-logo relative flex-shrink-0">
                  <span className="footer-brand-glow" aria-hidden />
                  <img src={logo} alt="" className="relative z-10 h-10 w-10 rounded-xl object-contain" />
                </span>
                <span className="font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {personal.displayName || 'Mhentor'}
                </span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                {footer?.tagline}
              </p>
              <div className="footer-availability inline-flex items-center gap-2.5">
                <span className="footer-availability-dot" aria-hidden />
                <span className="text-sm font-medium text-foreground">{availability}</span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <h3 className="footer-heading">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a href={`mailto:${personal.email}`} className="footer-contact-item group">
                    <MailIcon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{personal.email}</span>
                  </a>
                </li>
                {personal.phone && (
                  <li>
                    <a href={`tel:${personal.phone.replace(/\s/g, '')}`} className="footer-contact-item group">
                      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{personal.phone}</span>
                    </a>
                  </li>
                )}
                <li>
                  <Link href="/hire-me" className="footer-contact-item group font-medium text-primary">
                    <span>Start a Project →</span>
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Social + Tech */}
            <motion.div variants={itemVariants} className="lg:col-span-3 space-y-6">
              <div>
                <h3 className="footer-heading">Connect</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <SocialIconLink key={link.platform} link={link} reducedMotion={reducedMotion} />
                  ))}
                  <SocialIconLink
                    link={{ platform: 'Email', url: `mailto:${personal.email}` }}
                    reducedMotion={reducedMotion}
                  />
                </div>
              </div>
              <div>
                <h3 className="footer-heading">Built With</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <motion.span
                      key={tech}
                      className="footer-tech-badge"
                      whileHover={reducedMotion ? {} : { y: -2, scale: 1.04 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="footer-bottom mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-5"
          >
            <p className="text-muted-foreground text-sm text-center sm:text-left">
              © {year} {personal.realName || personal.displayName}. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs text-center sm:text-right hidden sm:block">
              {personal.realName} · Full Stack Developer
            </p>
            <BackToTopButton reducedMotion={reducedMotion} />
          </motion.div>
        </div>
      </motion.div>
    </footer>
  )
}
