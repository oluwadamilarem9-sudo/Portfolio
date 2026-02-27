import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import LiveChat from './components/LiveChat'
import HomePage from './pages/HomePage'
import HireMePage from './pages/HireMePage'
import ProjectsPage from './pages/ProjectsPage'
import ServiceCategoriesPage from './pages/ServiceCategoriesPage'
import CategoryProjectsPage from './pages/CategoryProjectsPage'
import SkillDetailPage from './pages/SkillDetailPage'
import SubSkillDetailPage from './pages/SubSkillDetailPage'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Navbar />
          <LiveChat />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hire-me" element={<HireMePage />} />
              {/* Most specific first for correct matching */}
              <Route path="/projects/:serviceSlug/:categorySlug" element={<CategoryProjectsPage />} />
              <Route path="/projects/:serviceSlug" element={<ServiceCategoriesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/skills/:slug/:cardSlug" element={<SubSkillDetailPage />} />
              <Route path="/skills/:slug" element={<SkillDetailPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
