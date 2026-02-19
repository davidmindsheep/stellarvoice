import React from 'react';
import './ProblemSolution.css';

const ProblemSolution = () => {
    return (
        <section className="problem-solution">
            <div className="container ps-grid">
                <div className="ps-card challenge glass-card">
                    <h2 className="text-gradient">THE PROBLEM</h2>
                    <p className="highlight">Missed calls cost you deals.</p>
                    <p>
                        You're on the job site or in a meeting. You miss a call.
                        By the time you call back, they've already called the next guy on Google.
                    </p>
                    <div className="ps-metric">
                        <span className="value">64%</span>
                        <span className="label">of leads go with the first sales agent who answers</span>
                    </div>
                </div>

                <div className="ps-card solution glass-card">
                    <h2 className="text-gradient">THE FIX</h2>
                    <p className="highlight">Instant Qualification.</p>
                    <p>
                        Stellar answers instantly, vets the lead for budget and timeline,
                        and books the call on your calendar. You only talk to serious buyers.
                    </p>
                    <div className="ps-metric">
                        <span className="value">100%</span>
                        <span className="label">response rate, 24/7/365</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSolution;
