import { useParams, Link } from 'react-router-dom'
import { portfolioData } from '../data/portfolio'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import {
  CodeIcon,
  PaletteIcon,
  ServerIcon,
  ChartIcon,
  BriefcaseIcon,
  LightbulbIcon,
  GlobeIcon,
  DatabaseIcon,
  ShieldIcon,
  LightningIcon,
} from '../components/Icons'

const cardIcons = {
  code: CodeIcon,
  palette: PaletteIcon,
  server: ServerIcon,
  chart: ChartIcon,
  briefcase: BriefcaseIcon,
  lightbulb: LightbulbIcon,
  globe: GlobeIcon,
  database: DatabaseIcon,
  shield: ShieldIcon,
  lightning: LightningIcon,
}

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5 },
}

export default function SubSkillDetailPage() {
  const { slug, cardSlug } = useParams()
  const skill = portfolioData.skills.find((s) => s.slug === slug)
  const cards = portfolioData.skillDetailCards?.[slug] || []
  const card = cards.find((c) => c.slug === cardSlug)

  if (!skill || !card) {
    return (
      <div className="min-h-screen pt-32 section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-bold text-2xl text-foreground mb-4">Detail not found</h1>
          <Link to="/#skills" className="text-primary hover:underline">
            ← Back to Skills
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = cardIcons[card.icon] || CodeIcon

  return (
    <>
      {/* Hero section – similar to reference detail page */}
      <section className="pt-28 pb-16 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to={`/skills/${slug}`}
              className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm font-medium"
            >
              <span className="text-lg">←</span>
              <span>Back to {skill.title}</span>
            </Link>

            <div className="flex flex-wrap items-start gap-6 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
                <IconComponent className="w-8 h-8" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
                  <span className="gradient-text">{card.title}</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detail feature blocks – structured, animated layout */}
      <section className="pb-24 pt-6 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            {...fadeInUp}
            className="grid md:grid-cols-2 gap-8 items-start"
          >
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                Modern &amp; Purposeful
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {card.detailBody}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-muted/20 h-full min-h-[220px] overflow-hidden flex items-stretch justify-stretch">
              {card.heroImage ? (
                <img
                  src={card.heroImage}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-muted-foreground text-sm md:text-base px-6 m-auto text-center">
                  Placeholder for visual mockups, UI previews, or architecture diagrams for this service.
                </span>
              )}
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
            }}
          >
            {[
              {
                title: 'Architecture & Strategy',
                body: 'I help you choose the right stack, structure your application, and design workflows that stay maintainable long-term.',
              },
              {
                title: 'Implementation',
                body: 'Clean, modern code with reusable components, clear separation of concerns, and a focus on performance and accessibility.',
              },
              {
                title: 'Collaboration',
                body: 'I work closely with designers, founders, and teams to translate ideas into concrete technical solutions.',
              },
              {
                title: 'Delivery & Iteration',
                body: 'From MVPs to production systems, I ship, measure, and iterate so your product keeps improving after launch.',
              },
            ].map((section, idx) => (
              <motion.div
                key={section.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                className="card-premium p-6 h-full"
              >
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {section.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {section.body}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Optional gallery thumbnails under the feature blocks */}
          {Array.isArray(card.gallery) && card.gallery.length > 0 && (
            <motion.div
              {...fadeInUp}
              className="grid md:grid-cols-3 gap-4 pt-4"
            >
              {card.gallery.map((src, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden border border-border bg-muted/20"
                >
                  <img
                    src={src}
                    alt={`${card.title} screenshot ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}
