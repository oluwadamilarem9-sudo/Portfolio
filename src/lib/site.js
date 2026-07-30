export const siteConfig = {
  name: 'Mhentor',
  fullName: 'Moses Sunday',
  title: 'Mhentor | Full-Stack Developer & Digital Business Builder',
  description:
    'Mhentor (Moses Sunday) - Full-Stack Developer & Digital Business Builder creating scalable, high-performing web products for startups and growing businesses.',
  url: 'https://mhentor.dev',
}

/** Page-level metadata. Root layout applies the `%s | Mhentor` title template. */
export function pageMetadata(title, description = siteConfig.description) {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      type: 'website',
    },
  }
}
