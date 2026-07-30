const GOOGLE_BOOKING_HOSTS = new Set(['calendar.app.google', 'calendar.google.com'])

/** Resolve booking URL from env or portfolio data. */
export function resolveBookingUrl(contact) {
  const fromEnv =
    process.env.NEXT_PUBLIC_BOOKING_URL?.trim() ||
    process.env.NEXT_PUBLIC_CALENDLY_URL?.trim()
  const fromData = contact?.bookingUrl?.trim() || contact?.calendlyUrl?.trim()
  const url = fromEnv || fromData
  if (!url) return null

  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'calendly.com') {
      const segments = parsed.pathname.split('/').filter(Boolean)
      if (segments.length < 2) return null
      return parsed.origin + parsed.pathname
    }
    if (GOOGLE_BOOKING_HOSTS.has(parsed.hostname)) {
      return parsed.origin + parsed.pathname
    }
    return null
  } catch {
    return null
  }
}

export function getBookingProvider(url) {
  if (!url) return null
  try {
    const host = new URL(url).hostname
    if (host === 'calendly.com') return 'calendly'
    if (GOOGLE_BOOKING_HOSTS.has(host)) return 'google'
    return null
  } catch {
    return null
  }
}

export function canEmbedBooking(url) {
  return getBookingProvider(url) === 'calendly'
}

/** Calendly inline embed URL (Calendly only) */
export function getCalendlyEmbedUrl(eventUrl) {
  if (!eventUrl || getBookingProvider(eventUrl) !== 'calendly') return null
  const separator = eventUrl.includes('?') ? '&' : '?'
  return `${eventUrl}${separator}hide_gdpr_banner=1&background_color=0f1419&text_color=e8eaed&primary_color=14b8a6`
}

// Backward-compatible alias
export const resolveCalendlyUrl = resolveBookingUrl
