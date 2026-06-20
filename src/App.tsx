/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollProgress } from './components/ScrollProgress';
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { Templates } from './pages/Templates';
import { About } from './pages/About';
import { Compute } from './pages/Compute';
import { Integrations } from './pages/Integrations';
import { Pricing } from './pages/Pricing';
import { Community } from './pages/Community';
import { Blog } from './pages/Blog';
import { Careers } from './pages/Careers';
import { Changelog } from './pages/Changelog';
import { Customers } from './pages/Customers';
import { Packages } from './pages/Packages';

import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { DashboardSandboxes } from './pages/DashboardSandboxes';
import { Settings } from './pages/Settings';
import { DashboardDeployments } from './pages/DashboardDeployments';
import { DashboardTemplates } from './pages/DashboardTemplates';
import { DashboardIntegrations } from './pages/DashboardIntegrations';
import { DashboardNewProject } from './pages/DashboardNewProject';

import { ProjectLayout } from './layouts/ProjectLayout';
import { ProjectOverview } from './pages/ProjectOverview';
import { ProjectSettings } from './pages/ProjectSettings';
import { NativeIDE } from './pages/NativeIDE';

import { MarketplaceLayout } from './layouts/MarketplaceLayout';
import { DashboardMarketplace } from './pages/DashboardMarketplace';

import { AuthLayout } from './layouts/AuthLayout';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

import { AuthProvider } from './contexts/AuthContext';

function MarketingLayout() {
  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-blue-500/30 font-sans flex flex-col items-center">
      <ScrollProgress />
      <div className="w-full max-w-[1400px] border-x border-white/[0.08] min-h-screen flex flex-col">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/about" element={<About />} />
          <Route path="/compute" element={<Compute />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/community" element={<Community />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/changelog" element={<Changelog />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="sandboxes" element={<DashboardSandboxes />} />
          <Route path="deployments" element={<DashboardDeployments />} />
          <Route path="templates" element={<DashboardTemplates />} />
          <Route path="integrations" element={<DashboardIntegrations />} />
          <Route path="settings" element={<Settings />} />
          <Route path="new" element={<DashboardNewProject />} />
        </Route>

        <Route path="/dashboard/projects/:projectId" element={<ProjectLayout />}>
          <Route index element={<ProjectOverview />} />
          <Route path="settings" element={<ProjectSettings />} />
        </Route>

        <Route path="/dashboard/projects/:projectId/editor" element={<NativeIDE />} />

        <Route path="/dashboard/integrations/marketplace" element={<MarketplaceLayout />}>
          <Route index element={<DashboardMarketplace />} />
        </Route>
      </Routes>
      </Router>
    </AuthProvider>
  );
}
