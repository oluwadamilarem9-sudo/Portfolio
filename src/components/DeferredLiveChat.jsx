'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const LiveChat = dynamic(() => import('@/components/LiveChat'), {
  ssr: false,
  loading: () => null,
})

/** Mount chat only after idle so it never blocks first paint. */
export default function DeferredLiveChat() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let idleId
    let timeoutId

    const enable = () => setReady(true)

    const onInteract = () => enable()
    window.addEventListener('pointerdown', onInteract, { once: true, passive: true })
    window.addEventListener('keydown', onInteract, { once: true })

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 4000 })
    } else {
      timeoutId = window.setTimeout(enable, 2500)
    }

    return () => {
      window.removeEventListener('pointerdown', onInteract)
      window.removeEventListener('keydown', onInteract)
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  if (!ready) return null
  return <LiveChat />
}
