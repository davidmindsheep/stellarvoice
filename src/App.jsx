import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import CaseStudyEasyStart from './pages/CaseStudyEasyStart'
import PricingPage from './pages/PricingPage'

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Defer to allow target to render
      const t = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }, 50);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/case-studies/denes-aldott" element={<CaseStudyEasyStart />} />
          {/* Legacy slug — preserved as a client-side fallback for anyone with
              the old link cached. Vercel also 308-redirects at the edge. */}
          <Route path="/case-studies/easystart-homes" element={<CaseStudyEasyStart />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
