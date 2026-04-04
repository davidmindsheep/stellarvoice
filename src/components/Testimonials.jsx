import React from 'react';
import './Testimonials.css';
import useScrollReveal, { useCardReveal } from '../hooks/useScrollReveal';

const testimonials = [
    { quote: 'We were losing leads every weekend. After switching on the AI Receptionist, we booked 11 showings in the first Saturday alone. Unreal.', name: 'Sarah M.', role: 'Real Estate Broker', company: 'Pacific Properties', seed: 'SarahM' },
    { quote: "Our cost-per-acquisition dropped 40% once ClosedLoop started calling our Google Ads leads instantly. We're getting the same results with half the ad spend.", name: 'James R.', role: 'Marketing Director', company: 'Celestial Solar Innovations', seed: 'JamesR' },
    { quote: "We pointed Outbound at 2,000 dead leads in our CRM. Within a month we had 380 booked appointments from contacts we'd written off.", name: 'Maria L.', role: 'Office Manager', company: 'Downtown Dental Group', seed: 'MariaL' }
];

const Testimonials = () => {
    const titleRef = useScrollReveal();
    const gridRef = useCardReveal();
    return (
        <section id="testimonials" className="testimonials-section">
            <div className="container">
                <div ref={titleRef} className="reveal">
                    <h2 className="section-title text-gradient">What Our Clients Say</h2>
                </div>
                <div className="testimonials-grid" ref={gridRef}>
                    {testimonials.map((t, i) => (
                        <div key={i} className="testimonial-card glass-card reveal-card">
                            <div className="quote-mark">\u201C</div>
                            <p className="testimonial-text">{t.quote}</p>
                            <div className="testimonial-author">
                                <img className="author-avatar" src={`https://api.dicebear.com/7.x/initials/svg?seed=${t.seed}&backgroundColor=7868f8`} alt={t.name} />
                                <div>
                                    <strong>{t.name}</strong>
                                    <span>{t.role}, {t.company}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
