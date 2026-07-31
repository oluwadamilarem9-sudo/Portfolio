import { Inter } from 'next/font/google'
import AppProviders from '@/components/providers/AppProviders'
import JsonLd from '@/components/seo/JsonLd'
import { siteConfig } from '@/lib/site'
import { organizationSchema, personSchema, websiteSchema } from '@/lib/seo'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.fullName}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/3fe81c63-18c4-4caa-b364-afbb46f30536.png', type: 'image/png' }],
    apple: [{ url: '/3fe81c63-18c4-4caa-b364-afbb46f30536.png' }],
    shortcut: ['/3fe81c63-18c4-4caa-b364-afbb46f30536.png'],
  },
  category: 'technology',
  other: {
    'ai-content-declaration': 'human-authored portfolio website for Mhentor personal brand',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0b1220' },
    { media: '(prefers-color-scheme: light)', color: '#f5f0e8' },
  ],
}

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('portfolio-theme') || localStorage.getItem('theme');
    var theme = stored === 'sunrise' || stored === 'light'
      ? 'sunrise'
      : stored === 'night' || stored === 'dark'
        ? 'night'
        : window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'sunrise'
          : 'night';
    var root = document.documentElement;
    root.dataset.theme = theme;
    if (theme === 'night') {
      root.classList.add('dark');
    } else {
      root.classList.add('sunrise');
    }
    root.style.colorScheme = theme === 'night' ? 'dark' : 'light';
  } catch (e) {}
})();
`

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta
          name="google-site-verification"
          content="wUP3iEblxKHrvtwRk_39AidDO6zPQXnWkKbg1lVnabo"
        />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd data={[personSchema(), organizationSchema(), websiteSchema()]} />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
