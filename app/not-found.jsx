import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">404</p>
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Page not found</h1>
      <p className="text-muted-foreground text-lg max-w-md mb-8">
        The page you requested does not exist or has moved.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn-premium">
          Go home
        </Link>
        <Link href="/contact" className="text-primary font-medium hover:underline">
          Contact me
        </Link>
      </div>
    </div>
  )
}
