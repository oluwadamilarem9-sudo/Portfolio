import { portfolioData } from '@/data/portfolio'

const DEFAULT_SITE_URL = 'https://mhentor.netlify.app'

export const siteConfig = {
  name: 'Mhentor',
  fullName: 'Moses Sunday',
  title: 'Mhentor | Full-Stack Developer, AI Engineer & Digital Business Builder',
  description:
    'Mhentor is a Full-Stack Developer, AI Engineer, Game Developer and Digital Business Builder helping businesses create modern websites, AI solutions, automation systems and scalable digital products.',
  shortDescription:
    'Official portfolio of Mhentor (Moses Sunday) — Full-Stack Developer, AI Engineer & Digital Business Builder.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, ''),
  locale: 'en_US',
  keywords: [
    'Mhentor',
    'Moses Sunday',
    'Full Stack Developer',
    'Web Developer',
    'AI Engineer',
    'Software Engineer',
    'Portfolio',
    'Digital Business Builder',
    'Game Developer',
    'Nigeria',
    'Freelancer',
  ],
  ogImage: '/3fe81c63-18c4-4caa-b364-afbb46f30536.png',
  twitterHandle: '@Mhentor001',
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    'wUP3iEblxKHrvtwRk_39AidDO6zPQXnWkKbg1lVnabo',
}

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return siteConfig.url
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function getSameAsProfiles() {
  const { personal, contact } = portfolioData
  const urls = [
    personal.github,
    personal.twitter,
    personal.linkedin,
    contact.whatsappUrl,
    ...(contact.socialLinks || []).map((link) => link.url),
  ].filter(Boolean)

  return [...new Set(urls)]
}

/**
 * Build Next.js Metadata for a route.
 * Pass `absoluteTitle: true` for homepage brand title (no template suffix).
 */
export function pageMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  image = siteConfig.ogImage,
  keywords = siteConfig.keywords,
  absoluteTitle = false,
  type = 'website',
  noIndex = false,
} = {}) {
  const canonical = absoluteUrl(path)
  const ogImage = image.startsWith('http') ? image : absoluteUrl(image)
  const resolvedTitle = absoluteTitle
    ? { absolute: title }
    : title

  return {
    title: resolvedTitle,
    description,
    keywords,
    alternates: {
      canonical,
    },
    authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    applicationName: siteConfig.name,
    category: 'technology',
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      title: absoluteTitle ? title : `${title} | ${siteConfig.name}`,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.fullName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: absoluteTitle ? title : `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
  }
}
