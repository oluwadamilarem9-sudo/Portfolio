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

function AppShell() {
  return (
    <div className="relative min-h-screen text-foreground transition-colors duration-300">
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <video
          src="/thunder-backgroud-pages.png.mp4.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      <div className="relative min-h-screen">
        <Navbar />
        <LiveChat />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
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
  )
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
