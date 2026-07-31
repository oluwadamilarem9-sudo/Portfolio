import HomeView from '@/views/HomeView'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata, siteConfig } from '@/lib/site'
import { faqSchema } from '@/lib/seo'
import { portfolioData } from '@/data/portfolio'

export const metadata = pageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: '/',
  absoluteTitle: true,
  keywords: siteConfig.keywords,
})

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(portfolioData.faq || [])} />
      <HomeView />
    </>
  )
}
