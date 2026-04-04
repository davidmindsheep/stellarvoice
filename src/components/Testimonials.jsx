import React from 'react';
import './Testimonials.css';

const testimonials = [
    { quote: 'We went from missing 60% of our after-hours calls to capturing every single one. Stellar\'s AI Receptionist paid for itself in the first week.', name: 'Sarah M.', role: 'Real Estate Broker', company: 'Pacific Properties' },
    { quote: 'The ClosedLoop Callback is a game changer. Our Google Ads leads used to sit for hours \u2014 now they get a call within 5 seconds of filling out the form.', name: 'James R.', role: 'Marketing Director', company: 'Celestial Solar Innovations' },
    { quote: 'We had 3,000 contacts sitting in our CRM doing nothing. ClosedLoop Outbound turned 400 of them into booked appointments in the first month.', name: 'Maria L.', role: 'Office Manager', company: 'Downtown Dental Group' }
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="testimonials-section">
            <div className="container">
                <h2 className="section-title text-gradient">What Our Clients Say</h2>
                <div className="testimonials-grid">
                    {testimonials.map((t, i) => (
                        <div key={i} className="testimonial-card glass-card">
                            <div className="quote-mark">\u201c</div>
                            <p className="testimonial-text">{t.quote}</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">{t.name[0]}</div>
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
