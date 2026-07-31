import PrivacyView from '@/views/PrivacyView'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Mhentor’s official website — how personal data from contact forms, chat, and inquiries is handled.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy' },
        ])}
      />
      <PrivacyView />
    </>
  )
}
