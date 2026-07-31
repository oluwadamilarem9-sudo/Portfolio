import TermsView from '@/views/TermsView'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Terms of Service',
  description:
    'Terms of Service for the official Mhentor personal brand website, portfolio content, and related inquiries.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Terms of Service', path: '/terms' },
        ])}
      />
      <TermsView />
    </>
  )
}
