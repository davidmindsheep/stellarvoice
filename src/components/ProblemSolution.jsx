import React from 'react';
import './ProblemSolution.css';
import useScrollReveal from '../hooks/useScrollReveal';

const ProblemSolution = () => {
    const ref = useScrollReveal();
    return (
        <section className="problem-solution reveal" ref={ref}>
            <div className="container ps-grid">
                <div className="ps-card challenge glass-card">
                    <h2 className="text-gradient">THE PROBLEM</h2>
                    <p className="highlight">Missed calls cost you deals.</p>
                    <p>
                        You're on the job site or in a meeting. A lead fills out your form.
                        By the time you call back 2 hours later, they've already booked with someone who answered first.
                    </p>
                    <div className="ps-metric">
                        <span className="value">64%</span>
                        <span className="label">of leads go with the first sales agent who answers</span>
                    </div>
                </div>

                <div className="ps-card solution glass-card">
                    <h2 className="text-gradient">THE FIX</h2>
                    <p className="highlight">Instant Response. Instant Qualification.</p>
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
