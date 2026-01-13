import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Demos from './components/Demos'
import ProblemSolution from './components/ProblemSolution'
import Features from './components/Features'
import FAQ from './components/FAQ'
import Team from './components/Team'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main>
        <Hero />
        <Demos />
        <ProblemSolution />
        <Features />
        <FAQ />
        <Team />
      </main>

      <Footer />
    </div>
  )
}

export default App
