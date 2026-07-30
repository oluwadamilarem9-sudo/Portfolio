'use client'

import Breadcrumbs from './Breadcrumbs'

function HighlightedTitle({ title, highlight }) {
  if (!highlight) return title

  const index = title.toLowerCase().indexOf(highlight.toLowerCase())
  if (index === -1) return title

  return (
    <>
      {title.slice(0, index)}
      <span className="gradient-text">{title.slice(index, index + highlight.length)}</span>
      {title.slice(index + highlight.length)}
    </>
  )
}

export default function PageHero({ title, highlight, subtitle, breadcrumbs = [] }) {
  return (
    <section className="pt-28 pb-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
          <HighlightedTitle title={title} highlight={highlight} />
        </h1>
        {subtitle && (
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
