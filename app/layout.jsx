import { Inter } from 'next/font/google'
import AppProviders from '@/components/providers/AppProviders'
import { siteConfig } from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: 'website',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  icons: {
    icon: '/3fe81c63-18c4-4caa-b364-afbb46f30536.png',
  },
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
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
