# Mhentor Portfolio — SEO Audit Report

**Date:** July 31, 2026  
**Site:** https://mhentor.netlify.app (override with `NEXT_PUBLIC_SITE_URL`)  
**Target keyword:** Mhentor  
**Stack:** Next.js 15 App Router · Netlify

---

## Executive summary

Production SEO foundations are implemented: unique metadata, canonicals, sitemap, robots, Open Graph/Twitter cards, JSON-LD (Person, Organization, WebSite, Breadcrumb, Service, Project, FAQ), Privacy/Terms for E-E-A-T, skip-link + semantic landmarks, and AI-crawler-friendly robots rules.

**Estimated Lighthouse SEO:** ~95–100 (after deploy + GSC verification + correct production URL).  
**Performance 95+:** depends on compressing hero video/images and Netlify CDN — see remaining actions.

---

## Changes implemented

### 1. Technical SEO
| Item | Status | Location |
|------|--------|----------|
| Auto sitemap | Done | `app/sitemap.js` → `/sitemap.xml` |
| robots.txt | Done | `app/robots.js` → `/robots.txt` |
| Canonical URLs | Done | `pageMetadata()` → `alternates.canonical` |
| Unique titles/descriptions | Done | Every `app/**/page.jsx` |
| Charset / viewport | Done | Next.js defaults + `export const viewport` |
| Duplicate meta prevention | Done | Single metadata API source; no duplicate OG in `index.html` |
| Security headers | Done | `next.config.mjs` |

### 2. Metadata (homepage)
- **Title:** Mhentor \| Full-Stack Developer, AI Engineer & Digital Business Builder  
- **Description:** Full-Stack / AI / Game Developer / Digital Business Builder positioning  
- **Keywords:** Mhentor, Moses Sunday, Full Stack Developer, … Nigeria, Freelancer  

### 3. Open Graph & Twitter
Complete `og:*` and `twitter:*` fields via `src/lib/site.js` `pageMetadata()`.

### 4. Structured data (JSON-LD)
- Person + Organization + WebSite (root layout)  
- BreadcrumbList (inner pages)  
- ProfessionalService (`/services`)  
- CreativeWork (project detail)  
- FAQPage (home + about)  
- `sameAs` social profiles: GitHub, X, LinkedIn, WhatsApp  

### 5. Performance
- Font preload via `next/font` (`display: swap`, `preload: true`)  
- Image `loading="lazy"` / width-height on key logos  
- `compress: true`, `poweredByHeader: false`  
- Background video remains decorative (`aria-hidden` overlay)  

### 6. Accessibility
- Skip to main content link  
- `main#main-content` landmark  
- Logo alt text (“Mhentor logo”)  
- Hero H1 includes accessible “Mhentor” brand signal (`sr-only`)  
- Legal nav labeled  

### 7. Google Search Console
- Supports `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (metadata + explicit meta tag)  
- **Action required:** paste your GSC token into `.env.local` / Netlify env  

### 8–10. Branding & internal SEO
- Brand entity clear in schema, titles, footer, H1 accessibility  
- SEO-friendly routes: `/about`, `/services`, `/projects`, `/contact`, `/privacy`, `/terms`  
- Breadcrumb UI + schema on legal pages; schema on major routes  

### 11. E-E-A-T
Existing: About, Services, Projects, Contact, Resume  
**Added:** `/privacy`, `/terms` with footer links  

### 12. AI SEO
robots.txt allows GPTBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot, bingbot  
Clear Person/Organization identity for AI Overviews / citations  

### 13. Code quality
- Centralized `src/lib/site.js` + `src/lib/seo.js`  
- Shared `JsonLd` component  
- Removed duplicate `'use client'` in ProjectCard  

---

## Post-deploy checklist (you)

1. Set Netlify env:  
   - `NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN` (Netlify or custom)  
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...`  
2. Submit `https://YOUR-DOMAIN/sitemap.xml` in Google Search Console.  
3. Validate rich results: [Rich Results Test](https://search.google.com/test/rich-results).  
4. Compress `public/thunder-backgroud-pages.png.mp4.mp4` and large PNGs (biggest Performance win).  
5. Prefer a 1200×630 OG image at `/og-image.png` and set `siteConfig.ogImage`.  
6. Confirm `@netlify/plugin-nextjs` is enabled on the Netlify site.

---

## Score targets

| Category | Target | Notes |
|----------|--------|-------|
| SEO | 100 | Achievable after deploy + crawlable production URL |
| Accessibility | 90+ | Skip link, alts, landmarks added |
| Performance | 95+ | Requires media compression; video is the main bottleneck |
| Best Practices | 95+ | Headers + HTTPS on Netlify |

---

## Files touched (high level)

- `app/layout.jsx`, `app/sitemap.js`, `app/robots.js`  
- `app/**/page.jsx` metadata + JsonLd  
- `app/privacy`, `app/terms`  
- `src/lib/site.js`, `src/lib/seo.js`  
- `src/components/seo/JsonLd.jsx`  
- `src/views/PrivacyView.jsx`, `TermsView.jsx`  
- Footer, Hero, Navbar, AppProviders, next.config, netlify.toml, .env.example  
