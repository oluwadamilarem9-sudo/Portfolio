import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import Footer from '../components/Footer'

export default function ServiceCategoriesPage() {
  const { serviceSlug } = useParams()
  const skill = portfolioData.skills.find((s) => s.slug === serviceSlug)
  const categories = portfolioData.serviceCategories?.[serviceSlug]

  if (!skill || !categories) {
    return (
      <div className="min-h-screen pt-32 section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-bold text-2xl text-foreground mb-4">
            Service not found
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
            to="/projects"
            className="inline-block text-primary hover:underline mb-8"
          >
            ← Back to Featured Projects
          </Link>
          <h1 className="font-bold text-4xl md:text-5xl text-foreground mb-4">
            {skill.title}
          </h1>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            {skill.description}
          </p>

          <p className="text-sm text-muted-foreground mb-6">Select a category to view projects:</p>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
            }}
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.slug}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <Link
                  to={`/projects/${serviceSlug}/${cat.slug}`}
                  className="card-premium block group"
                >
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {cat.description}
                  </p>
                  <span className="inline-block mt-4 text-primary text-sm font-medium">
                    View projects →
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  )
}
