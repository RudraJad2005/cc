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

import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Settings } from './pages/Settings';

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
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/about" element={<About />} />
          <Route path="/compute" element={<Compute />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/community" element={<Community />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/changelog" element={<Changelog />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
