'use client'

import { usePathname } from 'next/navigation'
import PageTransition from '@/components/layout/PageTransition'

export default function Template({ children }) {
  const pathname = usePathname()

  return (
    <PageTransition key={pathname}>
      {children}
    </PageTransition>
  )
}
