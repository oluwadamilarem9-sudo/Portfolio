import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import LiveChat from './components/LiveChat'
import ProjectsSlugRouter from './components/ProjectsSlugRouter'
import HomePage from './pages/HomePage'
import HireMePage from './pages/HireMePage'
import ProjectsPage from './pages/ProjectsPage'
import CategoryProjectsPage from './pages/CategoryProjectsPage'
import SkillDetailPage from './pages/SkillDetailPage'
import SubSkillDetailPage from './pages/SubSkillDetailPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative min-h-screen text-foreground transition-colors duration-300">
          {/* Full-site background video - all pages */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <video
              src="/thunder-backgroud-pages.png.mp4.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Slight overlay so content stays readable but video is visible */}
            <div className="absolute inset-0 bg-black/40" aria-hidden />
          </div>

          <div className="relative min-h-screen bg-background/80">
            <Navbar />
            <LiveChat />
            <main>
              <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/hire-me" element={<HireMePage />} />
              {/* Most specific first for correct matching */}
              <Route path="/projects/:serviceSlug/:categorySlug" element={<CategoryProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectsSlugRouter />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/skills/:slug/:cardSlug" element={<SubSkillDetailPage />} />
              <Route path="/skills/:slug" element={<SkillDetailPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
