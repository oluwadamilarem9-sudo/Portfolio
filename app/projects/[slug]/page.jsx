import { notFound } from 'next/navigation'
import ProjectDetailView from '@/views/ProjectDetailView'
import JsonLd from '@/components/seo/JsonLd'
import { portfolioData } from '@/data/portfolio'
import { pageMetadata, siteConfig } from '@/lib/site'
import { breadcrumbSchema, projectSchema } from '@/lib/seo'

export function generateStaticParams() {
  return portfolioData.projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = portfolioData.projects.find((p) => p.slug === slug)
  if (!project) {
    return pageMetadata({
      title: 'Project Not Found',
      description: 'This project could not be found.',
      path: '/projects',
      noIndex: true,
    })
  }

  return pageMetadata({
    title: project.title,
    description:
      project.description ||
      project.overview ||
      `${project.title} — case study by ${siteConfig.name}.`,
    path: `/projects/${project.slug}`,
    image: project.image || siteConfig.ogImage,
    type: 'article',
  })
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params
  const project = portfolioData.projects.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
          projectSchema(project),
        ]}
      />
      <ProjectDetailView project={project} />
    </>
  )
}
