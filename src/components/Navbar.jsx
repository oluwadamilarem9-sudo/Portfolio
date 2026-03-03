import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { portfolioData } from '../data/portfolio'

const navLinks = [
  { path: '/', hash: null, label: 'Home', isHome: true },
  { path: '/about', hash: null, label: 'About' },
  { path: '/', hash: '#skills', label: 'Skills' },
  { path: '/projects', hash: null, label: 'Projects' },
  { path: '/', hash: '#testimonials', label: 'Testimonials' },
  { path: '/', hash: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname, location.hash])

  const handleNavClick = (e, hash) => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: hash } })
    } else {
      const el = document.querySelector(hash)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-foreground tracking-tight"
        >
          <img
            src={portfolioData.personal.logo || "/3fe81c63-18c4-4caa-b364-afbb46f30536.png"}
            alt="Mhentor"
            className="h-8 w-8 rounded-lg object-contain"
          />
          Mhentor
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.isHome ? (
              <Link
                key={link.label}
                to="/"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ) : link.hash ? (
              <a
                key={link.hash}
                href={link.path + link.hash}
                onClick={(e) => handleNavClick(e, link.hash)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <button
            onClick={toggleTheme}
            className="relative w-12 h-6 rounded-full bg-muted transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-primary transition-all duration-300 ${
                theme === 'light' ? 'left-1' : 'left-7'
              }`}
            />
            <span className="absolute left-1 top-1/2 -translate-y-1/2">
              <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <span className="absolute right-1 top-1/2 -translate-y-1/2">
              <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </span>
          </button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/hire-me"
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Hire Me
            </Link>
          </motion.div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 text-muted-foreground"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-muted-foreground hover:text-foreground"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border py-4 px-6 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
            {navLinks.map((link) =>
              link.isHome ? (
                <Link
                  key={link.label}
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="text-muted-foreground hover:text-primary font-medium"
                >
                  {link.label}
                </Link>
              ) : link.hash ? (
                <a
                  key={link.hash}
                  href={link.path + link.hash}
                  onClick={(e) => {
                    handleNavClick(e, link.hash)
                    setMobileOpen(false)
                  }}
                  className="text-muted-foreground hover:text-primary font-medium"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path + link.label}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="text-muted-foreground hover:text-primary font-medium"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
