import { useParams, Link } from 'react-router-dom'
import { portfolioData } from '../data/portfolio'
import Footer from '../components/Footer'
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
      <section className="min-h-screen pt-28 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <Link
            to={`/skills/${slug}`}
            className="inline-block text-primary hover:underline mb-10 text-sm font-medium"
          >
            ← Back to {skill.title}
          </Link>

          <div className="flex flex-wrap items-start gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
              <IconComponent className="w-7 h-7" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-bold text-3xl md:text-4xl text-foreground mb-3">
                <span className="gradient-text">{card.title}</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
              {card.detailBody}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
