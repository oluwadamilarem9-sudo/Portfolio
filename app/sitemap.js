import { portfolioData } from '@/data/portfolio'
import { absoluteUrl, siteConfig } from '@/lib/site'

/** All public indexable routes for Google Search Console. */
export default function sitemap() {
  const now = new Date()

  const staticRoutes = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/projects', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/process', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/experience', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/resume', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/hire-me', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ]

  const staticEntries = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const projectEntries = (portfolioData.projects || []).map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Ensure siteConfig.url is the production domain used in GSC
  if (!siteConfig.url) {
    return staticEntries
  }

  return [...staticEntries, ...projectEntries]
}
