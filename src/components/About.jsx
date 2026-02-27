import { portfolioData } from '../data/portfolio'

export default function About() {
  const { about } = portfolioData

  return (
    <section id="about" className="section-padding bg-surface-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
          <span className="gradient-text">About Me</span>
        </h2>
        <p className="text-surface-300 text-lg leading-relaxed">
          {about.content}
        </p>
      </div>
    </section>
  )
}
