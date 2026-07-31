'use client'

import { ThemeProvider } from '@/context/ThemeContext'
import ThemeBackdrop from '@/components/theme/ThemeBackdrop'
import GlassBubblesBackground from '@/components/theme/GlassBubblesBackground'
import ThemeRevealOverlay from '@/components/theme/ThemeRevealOverlay'
import Navbar from '@/components/Navbar'
import LiveChat from '@/components/LiveChat'

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen text-foreground">
        <ThemeBackdrop />
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <video
            src="/thunder-backgroud-pages.png.mp4.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="theme-bg-video absolute inset-0 w-full h-full object-cover"
          />
          <div className="theme-video-overlay absolute inset-0" aria-hidden />
        </div>
        <GlassBubblesBackground />
        <ThemeRevealOverlay />
        <div className="relative z-10 min-h-screen theme-content-shell">
          <Navbar />
          <LiveChat />
          <main id="main-content">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
