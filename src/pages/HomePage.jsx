import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import QuoteBar from '../components/QuoteBar';
import WhyDifferent from '../components/WhyDifferent';
import Capabilities from '../components/Capabilities';
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

// Section order:
//   Hero -> QuoteBar (big Denes pull quote)
//   -> WhyDifferent (3-card section, dark panel)
//   -> Capabilities ("What our AI actually does" 5 capabilities)
//   -> SoundsReal (positive-framed voice quality section)
//   -> Demos -> CalculatorCTA -> ProblemSolution -> Products -> HowItWorks
//   -> Features -> Industries -> Plan-finder CTA -> Team -> FAQ -> CTABanner
export default function HomePage() {
    const [calcOpen, setCalcOpen] = useState(false);

    return (
        <>
            <Navbar onOpenCalculator={() => setCalcOpen(true)} />
            <main>
                <Hero onOpenCalculator={() => setCalcOpen(true)} />
                <QuoteBar />
                <WhyDifferent />
                <Capabilities />
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
                    sub="Answer four quick questions and we will match you to the right plan. Every plan includes performance-based pricing. You pay a low retainer plus a fee per qualified booking."
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
