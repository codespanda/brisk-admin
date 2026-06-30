import { Routes, Route, Navigate } from 'react-router-dom'
import { DocsLayout } from './components/DocsLayout'
import { IntroductionPage } from './pages/IntroductionPage'
import { GettingStartedPage } from './pages/GettingStartedPage'
import { ArchitecturePage } from './pages/ArchitecturePage'
import { ComponentsPage } from './pages/ComponentsPage'
import { AuthPage } from './pages/AuthPage'
import { FeaturesPage } from './pages/FeaturesPage'
import { ThemingPage } from './pages/ThemingPage'
import { DeploymentPage } from './pages/DeploymentPage'

export function DocsApp() {
  return (
    <Routes>
      <Route element={<DocsLayout />}>
        <Route index element={<Navigate to="introduction" replace />} />
        <Route path="introduction" element={<IntroductionPage />} />
        <Route path="getting-started" element={<GettingStartedPage />} />
        <Route path="architecture" element={<ArchitecturePage />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="theming" element={<ThemingPage />} />
        <Route path="deployment" element={<DeploymentPage />} />
      </Route>
    </Routes>
  )
}
