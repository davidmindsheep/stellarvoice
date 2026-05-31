import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Capabilities from '../components/Capabilities';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Demos from '../components/Demos';
import CTABanner from '../components/CTABanner';
import './HowItWorksPage.css';

// /how-it-works — the product + process deep dive.
// Reuses existing homepage components (Capabilities, HowItWorks, Features,
// Demos) under a single page so the homepage can stay short.
export default function HowItWorksPage() {
    return (
        <>
            <Navbar />
            <main className="hiw-page">
                {/* HERO */}
                <section className="hiw-hero">
                    <div className="container hiw-hero-inner">
                        <p className="hiw-hero-eyebrow">How It Works</p>
                        <h1>An AI that books revenue. Not just calls.</h1>
                        <p className="hiw-hero-sub">
                            What our voice agents actually do, how we deploy them, and what makes them
                            different from generalist AI platforms.
                        </p>
                    </div>
                </section>

                {/* CAPABILITIES */}
                <Capabilities />

                {/* PROCESS */}
                <HowItWorks />

                {/* FEATURES */}
                <Features />

                {/* DEMOS */}
                <Demos />

                {/* CTA */}
                <CTABanner />
            </main>
            <Footer />
        </>
    );
}
