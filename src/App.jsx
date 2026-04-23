import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import CalculatorCTA from './components/Calculator/CalculatorCTA'
import Calculator from './components/Calculator/Calculator'
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
  const [calcOpen, setCalcOpen] = useState(false)

  return (
    <div className="app-container">
      <Navbar onOpenCalculator={() => setCalcOpen(true)} />
      <main>
        <Hero onOpenCalculator={() => setCalcOpen(true)} />
        <SocialProof />
        <CalculatorCTA onOpen={() => setCalcOpen(true)} />
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
      {calcOpen && <Calculator onClose={() => setCalcOpen(false)} />}
    </div>
  )
}

export default App
