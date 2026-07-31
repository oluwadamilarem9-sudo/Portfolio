import { portfolioData } from '@/data/portfolio'
import { absoluteUrl } from '@/lib/site'

export default function sitemap() {
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/process',
    '/experience',
    '/contact',
    '/resume',
    '/hire-me',
    '/privacy',
    '/terms',
  ]

  const now = new Date()

  const staticEntries = staticRoutes.map((path) => ({
    url: absoluteUrl(path || '/'),
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/projects' || path === '/about' ? 0.9 : 0.8,
  }))

  const projectEntries = (portfolioData.projects || []).map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticEntries, ...projectEntries]
}
