import { notFound } from 'next/navigation'
import ProjectDetailView from '@/views/ProjectDetailView'
import { portfolioData } from '@/data/portfolio'
import { pageMetadata, siteConfig } from '@/lib/site'

export function generateStaticParams() {
  return portfolioData.projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = portfolioData.projects.find((p) => p.slug === slug)
  if (!project) {
    return pageMetadata('Project Not Found', 'This project could not be found.')
  }

  return pageMetadata(
    project.title,
    project.description || project.overview || `${project.title} — case study by ${siteConfig.name}.`
  )
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params
  const project = portfolioData.projects.find((p) => p.slug === slug)
  if (!project) notFound()
  return <ProjectDetailView project={project} />
}
