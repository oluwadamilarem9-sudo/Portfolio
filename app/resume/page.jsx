import ResumeView from '@/views/ResumeView'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Resume',
  description:
    'Resume of Moses Sunday (Mhentor) — Full-Stack Developer, AI Engineer & Digital Business Builder. Experience, education, skills, and technology stack.',
  path: '/resume',
})

export default function ResumePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Resume', path: '/resume' },
        ])}
      />
      <ResumeView />
    </>
  )
}
