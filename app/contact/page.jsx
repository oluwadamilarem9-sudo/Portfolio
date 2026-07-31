import ContactView from '@/views/ContactView'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Contact Mhentor to start a project — email, WhatsApp Business, X (@Mhentor001), or book a discovery call for websites, AI solutions, and digital products.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <ContactView />
    </>
  )
}
