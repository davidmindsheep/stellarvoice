import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Demos from './components/Demos'
import ProblemSolution from './components/ProblemSolution'
import Features from './components/Features'
import FAQ from './components/FAQ'
import Team from './components/Team'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app-container">
      <Navbar onBookClick={openModal} />

      <main>
        <Hero onBookClick={openModal} />
        <Demos />
        <ProblemSolution />
        <Features />
        <FAQ />
        <Team />
      </main>

      <Footer />
      <BookingModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default App
