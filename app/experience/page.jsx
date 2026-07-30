import ExperienceView from '@/views/ExperienceView'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata(
  'Experience',
  'Professional journey, milestones, education, and career focus of full-stack developer Mhentor.'
)

export default function ExperiencePage() {
  return <ExperienceView />
}
