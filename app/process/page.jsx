import ProcessView from '@/views/ProcessView'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata(
  'Process',
  'A clear six-stage development process — from discovery and architecture to deployment and ongoing support.'
)

export default function ProcessPage() {
  return <ProcessView />
}
