import ServicesView from '@/views/ServicesView'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/site'
import { breadcrumbSchema, professionalServiceSchema } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Services',
  description:
    'Mhentor offers full-stack web development, frontend, backend APIs, AI solutions, database design, performance optimization, and deployment services for startups and growing businesses.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
          professionalServiceSchema(),
        ]}
      />
      <ServicesView />
    </>
  )
}
