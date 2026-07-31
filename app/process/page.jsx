import ProcessView from '@/views/ProcessView'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Development Process',
  description:
    'Mhentor’s structured development process — from discovery and architecture to UI, backend, testing, deployment, and ongoing support.',
  path: '/process',
})

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Process', path: '/process' },
        ])}
      />
      <ProcessView />
    </>
  )
}
