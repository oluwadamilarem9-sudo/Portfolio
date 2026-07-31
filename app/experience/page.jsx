import ExperienceView from '@/views/ExperienceView'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Experience',
  description:
    'Professional journey of Mhentor (Moses Sunday) — milestones, education, career focus, and production systems shipped as a Full-Stack Developer and AI Engineer.',
  path: '/experience',
})

export default function ExperiencePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Experience', path: '/experience' },
        ])}
      />
      <ExperienceView />
    </>
  )
}
