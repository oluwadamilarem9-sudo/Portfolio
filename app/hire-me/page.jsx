import HireMeView from '@/views/HireMeView'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata(
  'Hire Me',
  'Share your project brief — scope, timeline, and budget — and get a clear plan from Mhentor.'
)

export default function HireMePage() {
  return <HireMeView />
}
