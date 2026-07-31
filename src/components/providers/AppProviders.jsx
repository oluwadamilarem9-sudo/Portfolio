'use client'

import dynamic from 'next/dynamic'
import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/components/Navbar'
import DeferredBackgroundVideo from '@/components/theme/DeferredBackgroundVideo'
import DeferredLiveChat from '@/components/DeferredLiveChat'

const ThemeBackdrop = dynamic(() => import('@/components/theme/ThemeBackdrop'), {
  ssr: false,
  loading: () => null,
})

const GlassBubblesBackground = dynamic(() => import('@/components/theme/GlassBubblesBackground'), {
  ssr: false,
  loading: () => null,
})

const ThemeRevealOverlay = dynamic(() => import('@/components/theme/ThemeRevealOverlay'), {
  ssr: false,
  loading: () => null,
})

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen text-foreground">
        <ThemeBackdrop />
        <DeferredBackgroundVideo />
        <GlassBubblesBackground />
        <ThemeRevealOverlay />
        <div className="relative z-10 min-h-screen theme-content-shell">
          <Navbar />
          <DeferredLiveChat />
          <main id="main-content">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
