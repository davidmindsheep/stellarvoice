import React from 'react';
import './ProblemSolution.css';

const ProblemSolution = () => {
    return (
        <section className="problem-solution">
            <div className="container ps-grid">
                <div className="ps-card challenge glass-card">
                    <h2 className="text-gradient">THE CHALLENGE</h2>
                    <p className="highlight">Leads go cold in minutes.</p>
                    <p>
                        In Real Estate, Healthcare, and Finance, speed is everything.
                        Most opportunities are lost simply because no one followed up
                        within the first 5 minutes.
                    </p>
                    <div className="ps-metric">
                        <span className="value">80%</span>
                        <span className="label">of leads go cold without instant follow-up</span>
                    </div>
                </div>

                <div className="ps-card solution glass-card">
                    <h2 className="text-gradient">OUR SOLUTION</h2>
                    <p className="highlight">Instant response, zero lag.</p>
                    <p>
                        Our AI voice agents instantly respond, re-engage, and book
                        appointments automatically. You get more connected
                        conversations — without hiring or chasing.
                    </p>
                    <div className="ps-metric">
                        <span className="value">10x</span>
                        <span className="label">increase in booking rates compared to manual</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSolution;
