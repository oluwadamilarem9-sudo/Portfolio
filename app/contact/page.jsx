import ContactView from '@/views/ContactView'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata(
  'Contact',
  'Start a project with Mhentor — book a discovery call, send a message, or reach out via email and WhatsApp.'
)

export default function ContactPage() {
  return <ContactView />
}
