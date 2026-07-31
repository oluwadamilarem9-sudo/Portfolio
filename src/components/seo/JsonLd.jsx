/**
 * Renders one or more JSON-LD scripts for Google rich results.
 * Accepts a single schema object or an array of schemas.
 */
export default function JsonLd({ data }) {
  if (!data) return null

  const schemas = (Array.isArray(data) ? data : [data]).filter(Boolean)

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={schema['@id'] || schema['@type'] || index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
