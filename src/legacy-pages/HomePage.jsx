import { portfolioData } from '../data/portfolio'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/about/AboutSection'
import DevelopmentProcessSection from '../components/process/DevelopmentProcessSection'
import ServicesSection from '../components/services/ServicesSection'
import ExperienceTimelineSection from '../components/experience/ExperienceTimelineSection'
import ProjectsShowcase from '../components/projects/ProjectsShowcase'
import TechStackShowcase from '../components/tech/TechStackShowcase'
import FaqSection from '../components/faq/FaqSection'
import ContactSection from '../components/contact/ContactSection'

export default function HomePage() {
  const { hero, about, developmentProcess, services, experienceTimeline, techStack, projects, testimonials, personal, contact, faq } = portfolioData

  return (
    <>
      <HeroSection hero={hero} />

      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <AboutSection about={about} personal={personal} hero={hero} />

      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <DevelopmentProcessSection developmentProcess={developmentProcess} />

      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <ServicesSection services={services} />

      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <ExperienceTimelineSection experienceTimeline={experienceTimeline} />

      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <TechStackShowcase techStack={techStack} />

      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <ProjectsShowcase projects={projects} showViewAllLink />

      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <FaqSection faq={faq} contact={contact} />

      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <ContactSection contact={contact} personal={personal} testimonials={testimonials} />

      <Footer />
    </>
  )
}
