import ProjectsView from '@/views/ProjectsView'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata(
  'Projects',
  'Featured case studies and production builds — e-commerce, dashboards, social apps, and business tools by Mhentor.'
)

export default function ProjectsPage() {
  return <ProjectsView />
}
