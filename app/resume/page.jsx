import ResumeView from '@/views/ResumeView'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata(
  'Resume',
  'Resume of Moses Sunday (Mhentor) — experience, education, skills, and technology stack.'
)

export default function ResumePage() {
  return <ResumeView />
}
