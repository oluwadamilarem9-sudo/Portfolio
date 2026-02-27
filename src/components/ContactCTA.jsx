import { Link } from 'react-router-dom'

export default function ContactCTA() {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-bold text-3xl md:text-4xl text-foreground mb-4">
          Let&apos;s Build Something
        </h2>
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
          Ready to discuss your next project? I&apos;m open to remote roles, freelance SaaS builds, and startup opportunities.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/hire-me"
            className="btn-premium inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow"
          >
            Get in Touch
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
