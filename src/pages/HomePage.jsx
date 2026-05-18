import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import CalculatorCTA from '../components/Calculator/CalculatorCTA';
import Calculator from '../components/Calculator/Calculator';
import ProblemSolution from '../components/ProblemSolution';
import Products from '../components/Products';
import HowItWorks from '../components/HowItWorks';
import Demos from '../components/Demos';
import Features from '../components/Features';
import Industries from '../components/Industries';
import Team from '../components/Team';
import FAQ from '../components/FAQ';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

export default function HomePage() {
    const [calcOpen, setCalcOpen] = useState(false);

    return (
        <>
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
                {/* Plan-finder CTA replaces the old static 3-tier preview.
                    Anchored at #pricing so existing nav links still land here. */}
                <CalculatorCTA
                    id="pricing"
                    onOpen={() => setCalcOpen(true)}
                    eyebrow="Plan Finder"
                    headline="Find the best plan for your business."
                    sub="Answer four quick questions and we'll match you to the right tier, then show you the full pricing breakdown."
                    buttonText="Find My Plan →"
                />
                <Team />
                <FAQ />
                <CTABanner />
            </main>
            <Footer />
            {calcOpen && <Calculator onClose={() => setCalcOpen(false)} />}
        </>
    );
}
