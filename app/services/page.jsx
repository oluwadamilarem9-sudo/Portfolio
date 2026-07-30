import ServicesView from '@/views/ServicesView'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata(
  'Services',
  'Full-stack web development, frontend, backend APIs, database design, performance optimization, and deployment services.'
)

export default function ServicesPage() {
  return <ServicesView />
}
