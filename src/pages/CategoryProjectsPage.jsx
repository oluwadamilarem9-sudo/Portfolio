import { useParams, Link } from 'react-router-dom'
import { portfolioData } from '../data/portfolio'
import Footer from '../components/Footer'

export default function CategoryProjectsPage() {
  const { serviceSlug, categorySlug } = useParams()
  const skill = portfolioData.skills.find((s) => s.slug === serviceSlug)
  const categories = portfolioData.serviceCategories?.[serviceSlug]
  const category = categories?.find((c) => c.slug === categorySlug)

  const projects = portfolioData.projects.filter(
    (p) => p.serviceSlug === serviceSlug && p.categorySlug === categorySlug
  )

  if (!skill || !category) {
    return (
      <div className="min-h-screen pt-32 section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-bold text-2xl text-foreground mb-4">
            Category not found
          </h1>
          <Link to="/projects" className="text-primary hover:underline">
            ← Back to Featured Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="min-h-[40vh] pt-32 section-padding">
        <div className="max-w-6xl mx-auto">
          <Link
            to={`/projects/${serviceSlug}`}
            className="inline-block text-primary hover:underline mb-8"
          >
            ← Back to {skill.title}
          </Link>
          <h1 className="font-bold text-4xl md:text-5xl text-foreground mb-4">
            {category.title}
          </h1>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            {category.description}
          </p>

          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="card-premium overflow-hidden p-0"
                >
                  <div className="h-36 overflow-hidden bg-muted/30">
                    {project.image ? (
                      <img
                        src={project.image.startsWith('http') ? project.image : `${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}/${project.image.replace(/^\//, '')}`}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          const fallback = e.target.nextElementSibling
                          if (fallback) fallback.classList.remove('hidden')
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-full h-full bg-gradient-to-br ${project.gradient || 'from-teal-500 to-cyan-500'} flex items-center justify-center ${project.image ? 'hidden' : ''}`}
                      aria-hidden={!!project.image}
                    >
                      <span className="text-white/90 text-4xl font-bold">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-foreground mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-xs font-mono bg-muted text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Link
                        to="/hire-me"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                      >
                        Inquire about project
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border p-12 text-center">
              <p className="text-muted-foreground mb-4">
                No projects in this category yet. Check back soon!
              </p>
              <Link to="/projects" className="text-primary hover:underline font-medium">
                View all projects →
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}
