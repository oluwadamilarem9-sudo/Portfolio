import AboutView from '@/views/AboutView'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata(
  'About',
  'Learn about Mhentor (Moses Sunday) — full-stack developer, approach, values, experience, and how we can work together.'
)

export default function AboutPage() {
  return <AboutView />
}
