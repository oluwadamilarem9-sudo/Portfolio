import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'

const footerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const footerItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Footer() {
  const { personal } = portfolioData

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={footerContainerVariants}
      className="border-t border-border bg-card/50"
    >
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div variants={footerItemVariants} className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-foreground tracking-tight">
              <img src={portfolioData.personal.logo || "/3fe81c63-18c4-4caa-b364-afbb46f30536.png"} alt="Mhentor" className="h-8 w-8 rounded-lg object-contain" />
              Mhentor
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Building digital solutions with excellence, gratitude, and innovation.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={footerItemVariants}>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to={{ pathname: '/', hash: 'about' }} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to={{ pathname: '/', hash: 'skills' }} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to={{ pathname: '/', hash: 'contact' }} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div variants={footerItemVariants}>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/hire-me"
                  className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity inline-flex"
                  aria-label="Get in touch"
                >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={footerItemVariants}
          className="pt-8 border-t border-border text-center"
        >
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Mhentor. Built with <span className="text-primary">❤️</span> and passion.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
