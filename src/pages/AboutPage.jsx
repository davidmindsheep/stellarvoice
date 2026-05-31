import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Team from '../components/Team';
import WhyDifferent from '../components/WhyDifferent';
import CTABanner from '../components/CTABanner';
import './AboutPage.css';

// /about — "Our Story"
// Per the May 31 Developer Brief Sec 3.23. Brings together the founder
// origin story, the team bios, and the WhyDifferent values that were
// previously scattered or only on the homepage.
export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="about-page">
                {/* HERO */}
                <section className="ap-hero">
                    <div className="container ap-hero-inner">
                        <p className="ap-hero-eyebrow">Our Story</p>
                        <h1>Built by people who understand sales. Not just AI.</h1>
                        <p className="ap-hero-sub">
                            Two founders, one prototype, one Virginia conference, and a six-month
                            production system that books real meetings every day.
                        </p>
                    </div>
                </section>

                {/* HOW WE MET */}
                <section className="ap-section">
                    <div className="container ap-prose">
                        <h2>How we met</h2>
                        <p>
                            Gary and David met through a mutual friend over lunch in Bali. Gary sat through
                            two hours of conversation without understanding a word: David&apos;s Australian
                            accent plus technical jargon was a wall.
                        </p>
                        <p>
                            The next day Gary told David: <em>&quot;I had no idea what you said yesterday.
                            We need to start over.&quot;</em> They blocked out one weekend, then two. By the
                            end of the second weekend, they had a working prototype.
                        </p>
                    </div>
                </section>

                {/* HOW WE KNEW IT WORKED */}
                <section className="ap-section ap-section-alt">
                    <div className="container ap-prose">
                        <h2>How we knew it worked</h2>
                        <p>
                            Gary took the prototype to a Virginia real estate conference. Nobody there knew
                            what an AI voice agent was. So Gary stopped explaining and just rang the
                            prototype&apos;s number and handed people the phone.
                        </p>
                        <p>
                            Every single time: disbelief, then excitement, then <em>&quot;where do I sign
                            up.&quot;</em> He called David from the parking lot and said they had a business.
                        </p>
                    </div>
                </section>

                {/* WHY PERFORMANCE PRICING */}
                <section className="ap-section">
                    <div className="container ap-prose">
                        <h2>Why performance pricing</h2>
                        <p>
                            After seeing how other companies in the space priced their services, David and
                            Gary made a decision. If the system works as well as they believe it does, they
                            should be willing to put their revenue on the line.
                        </p>
                        <p>
                            That is why the majority of SVA&apos;s revenue comes from per-booking fees. If SVA
                            does not book qualified meetings, SVA does not get paid. That is how confident
                            they are.
                        </p>
                        <p className="ap-prose-quote">
                            &quot;Any time someone needs to call someone, the AI should be calling them
                            first.&quot;
                            <cite>David Taylor, Co-Founder &amp; CTO</cite>
                        </p>
                    </div>
                </section>

                {/* THE TEAM (existing component) */}
                <Team />

                {/* WHAT WE STAND FOR (WhyDifferent) */}
                <WhyDifferent />

                {/* CTA */}
                <CTABanner />
            </main>
            <Footer />
        </>
    );
}
