import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { AppProvider } from './context/AppContext'

import MarketingLayout from './components/layout/MarketingLayout'
import Overlays from './components/overlays/Overlays'
import Toast from './components/layout/Toast'

import HomePage from './pages/marketing/HomePage'
import ServicesPage from './pages/marketing/ServicesPage'
import WorkPage from './pages/marketing/WorkPage'
import PricingPage from './pages/marketing/PricingPage'
import EstimatorPage from './pages/marketing/EstimatorPage'
import AboutPage from './pages/marketing/AboutPage'
import ContactPage from './pages/marketing/ContactPage'

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
            <Route path="/estimator" element={<EstimatorPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* The client portal lives in the app (lib/clientApp); old /portal links land here too. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* global chrome that sits above any route */}
        <Overlays />
        <Toast />
      </AppProvider>
    </ToastProvider>
  )
}
