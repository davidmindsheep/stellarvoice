import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import ProblemSolution from './components/ProblemSolution'
import Products from './components/Products'
import HowItWorks from './components/HowItWorks'
import Demos from './components/Demos'
import Features from './components/Features'
import Industries from './components/Industries'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import Team from './components/Team'
import FAQ from './components/FAQ'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <ProblemSolution />
        <Products />
        <HowItWorks />
        <Demos />
        <Features />
        <Industries />
        <Testimonials />
        <Pricing />
        <Team />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}

export default App
