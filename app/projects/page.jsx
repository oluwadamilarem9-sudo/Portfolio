import ProjectsView from '@/views/ProjectsView'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Projects & Portfolio',
  description:
    'Explore Mhentor’s live portfolio — marketing platforms, lead intelligence SaaS, e-commerce stores, and production-ready digital products engineered for performance and growth.',
  path: '/projects',
})

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />
      <ProjectsView />
    </>
  )
}
