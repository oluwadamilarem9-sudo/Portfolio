import { useParams } from 'react-router-dom'
import { portfolioData } from '../data/portfolio'
import ProjectDetailPage from '../pages/ProjectDetailPage'
import ServiceCategoriesPage from '../pages/ServiceCategoriesPage'

/**
 * Routes /projects/:slug to:
 * - ProjectDetailPage when slug matches a project.slug
 * - ServiceCategoriesPage when slug matches a skill (service) slug (e.g. full-stack-development)
 */
export default function ProjectsSlugRouter() {
  const { slug } = useParams()
  const project = portfolioData.projects.find((p) => p.slug === slug)
  const isServiceSlug = portfolioData.skills.some((s) => s.slug === slug)

  if (project) {
    return <ProjectDetailPage />
  }

  if (isServiceSlug) {
    return <ServiceCategoriesPage />
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-bold text-foreground mb-4">Not found</h1>
      <a href="/projects" className="text-primary hover:underline font-medium">
        ← Back to projects
      </a>
    </div>
  )
}
