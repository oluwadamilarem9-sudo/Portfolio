import { useState, useEffect } from 'react'
import { portfolioData } from '../data/portfolio'

export default function FloatingActionButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
      aria-label="Scroll to top"
    >
      <img src={portfolioData.personal.logo || "/3fe81c63-18c4-4caa-b364-afbb46f30536.png"} alt="Mhentor" className="w-8 h-8 rounded-lg object-contain" />
    </button>
  )
}
