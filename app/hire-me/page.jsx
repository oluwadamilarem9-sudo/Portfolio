import HireMeView from '@/views/HireMeView'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Hire Mhentor',
  description:
    'Hire Mhentor for full-stack development, AI solutions, and digital products. Share your brief — scope, timeline, and budget — and get a clear plan.',
  path: '/hire-me',
})

export default function HireMePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Hire Me', path: '/hire-me' },
        ])}
      />
      <HireMeView />
    </>
  )
}
