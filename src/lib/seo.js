import { absoluteUrl, getSameAsProfiles, siteConfig } from '@/lib/site'
import { portfolioData } from '@/data/portfolio'

export function personSchema() {
  const { personal, hero, about } = portfolioData

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.fullName,
    alternateName: ['Mhentor', 'Sunday Moses'],
    url: siteConfig.url,
    image: absoluteUrl(personal.profileImage || siteConfig.ogImage),
    email: personal.email,
    telephone: personal.phone,
    jobTitle: hero.role || 'Full-Stack Developer',
    description: about?.intro || siteConfig.description,
    nationality: {
      '@type': 'Country',
      name: 'Nigeria',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NG',
    },
    sameAs: getSameAsProfiles(),
    knowsAbout: [
      'Full-Stack Development',
      'AI Engineering',
      'Web Development',
      'Digital Business',
      'Game Development',
      'React',
      'Next.js',
      'Node.js',
    ],
    worksFor: {
      '@id': `${siteConfig.url}/#organization`,
    },
  }
}

export function organizationSchema() {
  const { personal } = portfolioData

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.fullName,
    url: siteConfig.url,
    logo: absoluteUrl(personal.logo || siteConfig.ogImage),
    image: absoluteUrl(personal.logo || siteConfig.ogImage),
    description: siteConfig.description,
    email: personal.email,
    telephone: personal.phone,
    founder: {
      '@id': `${siteConfig.url}/#person`,
    },
    sameAs: getSameAsProfiles(),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: personal.email,
      telephone: personal.phone,
      availableLanguage: ['English'],
    },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: `${siteConfig.fullName} Portfolio`,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'en-US',
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    author: {
      '@id': `${siteConfig.url}/#person`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/projects?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbSchema(items = []) {
  if (!items.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path || '/'),
    })),
  }
}

export function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/services#service`,
    name: `${siteConfig.name} Development Services`,
    url: absoluteUrl('/services'),
    description: siteConfig.description,
    provider: {
      '@id': `${siteConfig.url}/#person`,
    },
    areaServed: 'Worldwide',
    serviceType: [
      'Full Stack Web Development',
      'Frontend Development',
      'Backend Development',
      'AI Solutions',
      'Digital Product Development',
    ],
  }
}

export function projectSchema(project) {
  if (!project) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description || project.overview,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: project.image ? absoluteUrl(project.image) : absoluteUrl(siteConfig.ogImage),
    dateCreated: String(project.year || ''),
    creator: {
      '@id': `${siteConfig.url}/#person`,
    },
    keywords: (project.tech || []).join(', '),
    about: project.category,
  }
}

export function faqSchema(faqs = []) {
  if (!faqs.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question || faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer || faq.a,
      },
    })),
  }
}
