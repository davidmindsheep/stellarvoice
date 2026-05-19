import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import QuoteBar from '../components/QuoteBar';
import SoundsReal from '../components/SoundsReal';
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

// Section order per blueprint v2.7:
//   Hero -> SocialProof -> QuoteBar -> SoundsReal -> Demos
//   -> CalculatorCTA -> ProblemSolution -> Products -> HowItWorks
//   -> Features -> Industries -> Plan-finder CTA (anchored #pricing)
//   -> Team -> FAQ -> CTABanner
//
// Rationale: a visitor lands, sees the proof bar immediately, reads the
// "does it actually sound real?" answer, hears the voice via the demos,
// then is invited to take the calculator quiz once they've already been
// convinced the voice is the real deal. Products and the rest of the
// page follow.
export default function HomePage() {
    const [calcOpen, setCalcOpen] = useState(false);

    return (
        <>
            <Navbar onOpenCalculator={() => setCalcOpen(true)} />
            <main>
                <Hero onOpenCalculator={() => setCalcOpen(true)} />
                <SocialProof />
                <QuoteBar />
                <SoundsReal />
                <Demos />
                <CalculatorCTA onOpen={() => setCalcOpen(true)} />
                <ProblemSolution />
                <Products />
                <HowItWorks />
                <Features />
                <Industries />
                {/* Plan-finder CTA in the former pricing slot.
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
