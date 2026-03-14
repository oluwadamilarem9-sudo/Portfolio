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

const skillIcons = {
  code: CodeIcon,
  palette: PaletteIcon,
  server: ServerIcon,
  chart: ChartIcon,
  briefcase: BriefcaseIcon,
  lightbulb: LightbulbIcon,
}

export default function SkillDetailPage() {
  const { slug } = useParams()
  const skill = portfolioData.skills.find((s) => s.slug === slug)
  const detailCards = portfolioData.skillDetailCards?.[slug] || []

  if (!skill) {
    return (
      <div className="min-h-screen pt-32 section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-bold text-2xl text-foreground mb-4">Skill not found</h1>
          <Link to="/#skills" className="text-primary hover:underline">
            ← Back to Skills
          </Link>
        </div>
      </div>
    )
  }

  const SkillIconComponent = skillIcons[skill.icon] || CodeIcon
  const titleParts = skill.title.split(/\s+/)
  const lastWord = titleParts.pop()
  const titleStart = titleParts.join(' ')

  return (
    <>
      <section className="min-h-screen pt-28 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/#skills"
            className="inline-block text-primary hover:underline mb-10 text-sm font-medium"
          >
            ← Back to Skills
          </Link>

          {/* Header: icon + title + intro + optional image */}
          <div className="flex flex-col md:flex-row items-start gap-6 mb-10">
            {skill.image && (
              <div className="w-full md:w-56 h-40 md:h-44 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={skill.image}
                  alt={skill.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="min-w-0 flex-1 flex flex-col gap-3">
              <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
                <SkillIconComponent className="w-7 h-7" />
              </div>
              <div>
                <h1 className="font-bold text-3xl md:text-4xl text-foreground mb-2">
                  {titleStart}
                  {titleStart && ' '}
                  <span className="gradient-text">{lastWord}</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>
          </div>

          {/* Detail cards - each links to its own detail page */}
          {detailCards.length > 0 ? (
            <div className="space-y-4">
              {detailCards.map((card) => {
                const IconComponent = cardIcons[card.icon] || CodeIcon
                const cardImage = card.cardImage || card.heroImage
                return (
                  <Link
                    key={card.slug}
                    to={`/skills/${slug}/${card.slug}`}
                    className="card-premium block p-6 group hover:border-primary/40 transition-colors overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row items-start gap-4">
                      {cardImage && (
                        <div className="w-full md:w-40 h-28 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={cardImage}
                            alt={card.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1 flex flex-col gap-2">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-105 transition-transform">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="font-semibold text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
                            {card.title}
                          </h2>
                          <p className="text-muted-foreground leading-relaxed">
                            {card.description}
                          </p>
                          <span className="inline-block mt-2 text-sm font-medium text-primary group-hover:underline">
                            View full details →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <p className="text-muted-foreground">No detail cards for this skill yet.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}
