import AboutView from '@/views/AboutView'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/site'
import { breadcrumbSchema, faqSchema } from '@/lib/seo'
import { portfolioData } from '@/data/portfolio'

export const metadata = pageMetadata({
  title: 'About Mhentor',
  description:
    'Learn about Mhentor (Moses Sunday) — Full-Stack Developer, AI Engineer and Digital Business Builder. Background, values, mission, and how we work together.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
          faqSchema(portfolioData.aboutFaqs || []),
        ]}
      />
      <AboutView />
    </>
  )
}
