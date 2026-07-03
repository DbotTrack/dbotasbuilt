import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { AppProvider } from './context/AppContext'

import MarketingLayout from './components/layout/MarketingLayout'
import PortalLayout from './components/layout/PortalLayout'
import Overlays from './components/overlays/Overlays'
import Toast from './components/layout/Toast'
import ProtoStrip from './components/layout/ProtoStrip'

import HomePage from './pages/marketing/HomePage'
import ServicesPage from './pages/marketing/ServicesPage'
import WorkPage from './pages/marketing/WorkPage'
import PricingPage from './pages/marketing/PricingPage'
import AboutPage from './pages/marketing/AboutPage'
import ContactPage from './pages/marketing/ContactPage'

import PortalHome from './pages/portal/PortalHome'
import ProjectsPage from './pages/portal/ProjectsPage'
import ProjectDetailPage from './pages/portal/ProjectDetailPage'
import InvoicesPage from './pages/portal/InvoicesPage'
import NotificationsPage from './pages/portal/NotificationsPage'
import ProfilePage from './pages/portal/ProfilePage'
import PreviewPayPage from './pages/portal/PreviewPayPage'
import FilesActivePage from './pages/portal/FilesActivePage'
import FilesExpiredPage from './pages/portal/FilesExpiredPage'

export default function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <Routes>
          {/* Marketing */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Client portal */}
          <Route path="/portal" element={<PortalLayout />}>
            <Route index element={<PortalHome />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:id" element={<ProjectDetailPage />} />
            <Route path="invoices" element={<InvoicesPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="preview-pay" element={<PreviewPayPage />} />
            <Route path="files/active" element={<FilesActivePage />} />
            <Route path="files/expired" element={<FilesExpiredPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* global chrome that sits above any route */}
        <Overlays />
        <Toast />
        <ProtoStrip />
      </AppProvider>
    </ToastProvider>
  )
}
