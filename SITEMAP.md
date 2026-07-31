# Sitemap for Google Search Console

## Why "Couldn't fetch" happened

Googlebot sometimes failed to load the **dynamic** Next.js `/sitemap.xml` route on Netlify (intermittent server errors).

## Fix applied

A **static** sitemap is now served from:

- `public/sitemap.xml` → https://mhentor.netlify.app/sitemap.xml
- `public/robots.txt` → https://mhentor.netlify.app/robots.txt

Static files are more reliable for Google Search Console.

## Submit / refresh in GSC

1. Wait for Netlify deploy to finish
2. Open https://mhentor.netlify.app/sitemap.xml in your browser (must show XML)
3. Google Search Console → **Sitemaps**
4. Remove the old failed sitemap (3-dot menu → Remove) if needed
5. Add again: `sitemap.xml` → **Submit**
6. Wait a few minutes and click into the sitemap for status (can take hours to go green)

## Property tip

Your GSC property URL must match exactly:

`https://mhentor.netlify.app`
