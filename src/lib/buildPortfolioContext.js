/**
 * Builds a structured context string from portfolio data for the chatbot system prompt.
 * Used to inject website content so the AI can answer questions about the portfolio.
 */

export function buildPortfolioContext(data) {
  if (!data) return ''
  const { hero, about, skills, projects, personal, capabilities, testimonials } = data

  const sections = []

  if (hero) {
    sections.push(
      `## About ${hero.name} (${personal?.realName || hero.name})\n` +
        `- Role: ${hero.role}\n` +
        `- Tagline: ${hero.tagline || ''}\n` +
        `- Intro: ${hero.supportingLine || hero.subtitle || ''}\n` +
        (hero.headlineTagline ? `- ${hero.headlineTagline}\n` : '') +
        (hero.authorityElements?.length ? `- Highlights: ${hero.authorityElements.join(', ')}\n` : '')
    )
  }

  if (about) {
    sections.push(
      `## About Me (detailed)\n` +
        `- Intro: ${about.intro || about.content || ''}\n` +
        `- Tagline: ${about.tagline || ''}\n` +
        `- Body: ${(about.body || '').replace(/\n/g, ' ')}\n` +
        `- Mission: ${about.mission || ''}\n` +
        `- Vision: ${about.vision || ''}\n` +
        `- Execution: ${about.execution || ''}\n` +
        (about.specialties?.length ? `- Specialties: ${about.specialties.join(', ')}\n` : '') +
        (about.coreValues?.length
          ? `- Core values: ${about.coreValues.map((v) => `${v.name}: ${v.desc}`).join('; ')}\n`
          : '')
    )
  }

  if (skills?.length) {
    sections.push(
      `## Services / Skills\n` +
        skills.map((s) => `- ${s.title}: ${s.description}`).join('\n')
    )
  }

  if (projects?.length) {
    sections.push(
      `## Featured Projects\n` +
        projects
          .map(
            (p) =>
              `- ${p.title}: ${p.description}${p.tech?.length ? ` (Tech: ${p.tech.join(', ')})` : ''}`
          )
          .join('\n')
    )
  }

  if (capabilities?.length) {
    sections.push(`## Capabilities\n${capabilities.map((c) => `- ${c}`).join('\n')}`)
  }

  if (testimonials?.length) {
    sections.push(
      `## Client Testimonials\n` +
        testimonials.map((t) => `- ${t.name} (${t.role}): "${t.quote}"`).join('\n')
    )
  }

  if (personal) {
    sections.push(
      `## Contact\n` +
        `- Email: ${personal.email}\n` +
        (personal.linkedin ? `- LinkedIn: ${personal.linkedin}\n` : '') +
        (personal.github ? `- GitHub: ${personal.github}\n` : '') +
        (personal.twitter ? `- Twitter: ${personal.twitter}\n` : '')
    )
  }

  return sections.join('\n\n')
}
