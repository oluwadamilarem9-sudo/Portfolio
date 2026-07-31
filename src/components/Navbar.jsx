'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import ThemeToggle from './theme/ThemeToggle'

const navLinks = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'process', label: 'Process', href: '/process' },
  { id: 'experience', label: 'Experience', href: '/experience' },
  { id: 'contact', label: 'Contact', href: '/contact' },
  { id: 'resume', label: 'Resume', href: '/resume' },
]

function ThemeToggleSlot({ className = '' }) {
  return <ThemeToggle className={className} />
}

function NavBrand({ onClick }) {
  const reducedMotion = useReducedMotion()
  const logo = portfolioData.personal.logo || '/3fe81c63-18c4-4caa-b364-afbb46f30536.png'

  return (
    <Link
      href="/"
      onClick={onClick}
      className="navbar-brand group flex items-center gap-2.5 font-bold text-lg tracking-tight text-foreground"
      aria-label="Mhentor — Home"
    >
      <motion.span
        className="navbar-brand-logo relative flex-shrink-0"
        whileHover={reducedMotion ? {} : { scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      >
        <span className="navbar-brand-glow" aria-hidden />
        <motion.img
          src={logo}
          alt="Mhentor logo"
          className="relative z-10 h-9 w-9 rounded-xl object-contain"
          width={36}
          height={36}
          animate={reducedMotion ? {} : { y: [0, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.span>
      <span className="navbar-brand-text group-hover:text-primary transition-colors duration-300">
        Mhentor
      </span>
    </Link>
  )
}

function HamburgerButton({ open, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="navbar-hamburger lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-foreground hover:bg-foreground/5 transition-colors"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-controls="mobile-navigation"
    >
      <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      <span className="relative w-5 h-4 flex flex-col justify-between" aria-hidden>
        <motion.span
          className="block h-0.5 w-full bg-current rounded-full origin-center"
          animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <motion.span
          className="block h-0.5 w-full bg-current rounded-full"
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-0.5 w-full bg-current rounded-full origin-center"
          animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </span>
    </button>
  )
}

function DesktopNavLink({ link, isActive, onNavigate }) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className={`navbar-link group relative px-1 py-2 text-[13px] font-medium tracking-tight transition-colors ${
        isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="relative z-10">{link.label}</span>
      <span className="navbar-link-hover-line" aria-hidden />
      {isActive && (
        <motion.span
          layoutId="navbar-active-indicator"
          className="navbar-link-active-indicator"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  )
}

function MobileNavLink({ link, isActive, onNavigate, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`navbar-mobile-link text-2xl sm:text-3xl font-semibold tracking-tight transition-colors ${
        isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      <Link
        href={link.href}
        onClick={onNavigate}
        aria-current={isActive ? 'page' : undefined}
      >
        {link.label}
      </Link>
    </motion.div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)
  const pathname = usePathname()
  const isActive = (href) => href === '/' ? pathname === '/' : pathname.startsWith(href)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)

      if (mobileOpen) {
        setVisible(true)
        lastScrollY.current = y
        return
      }

      if (y < 64) {
        setVisible(true)
      } else if (y > lastScrollY.current + 4) {
        setVisible(false)
      } else if (y < lastScrollY.current - 4) {
        setVisible(true)
      }

      lastScrollY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleNavigate = () => setMobileOpen(false)

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`navbar-header fixed top-0 left-0 right-0 z-50 transition-[background,box-shadow,border-color] duration-500 ${
          scrolled ? 'navbar-header-scrolled' : 'navbar-header-top'
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-5 sm:px-6 h-16 lg:h-[4.25rem] flex items-center justify-between gap-4"
          aria-label="Main navigation"
        >
          <NavBrand onClick={handleNavigate} />

          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-1 justify-center max-w-3xl mx-4">
            {navLinks.map((link) => (
              <DesktopNavLink
                key={link.id}
                link={link}
                isActive={isActive(link.href)}
                onNavigate={handleNavigate}
              />
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <ThemeToggleSlot />
            <motion.div whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.97 }}>
              <Link href="/hire-me" className="navbar-cta-btn">
                Hire Me
              </Link>
            </motion.div>
          </div>

          <div className="flex items-center gap-1 lg:hidden flex-shrink-0">
            <ThemeToggleSlot />
            <HamburgerButton open={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 backdrop-blur-sm lg:hidden theme-mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="navbar-mobile-menu fixed inset-0 z-50 lg:hidden flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between px-5 sm:px-6 h-16 flex-shrink-0">
                <NavBrand onClick={handleNavigate} />
                <HamburgerButton open onClick={() => setMobileOpen(false)} />
              </div>

              <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 pb-12 overflow-y-auto">
                <nav className="flex flex-col gap-5 sm:gap-6" aria-label="Mobile section links">
                  {navLinks.map((link, index) => (
                    <MobileNavLink
                      key={link.id}
                      link={link}
                      index={index}
                      isActive={isActive(link.href)}
                      onNavigate={handleNavigate}
                    />
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.04 + 0.1, duration: 0.4 }}
                  className="mt-10 sm:mt-12"
                >
                  <Link
                    href="/hire-me"
                    onClick={() => setMobileOpen(false)}
                    className="navbar-cta-btn navbar-cta-btn-mobile w-full sm:w-auto inline-flex justify-center"
                  >
                    Hire Me
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
