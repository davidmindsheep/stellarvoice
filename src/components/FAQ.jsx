import React, { useState } from 'react';
import './FAQ.css';

const faqs = [
    {
        question: "Do the AI agents sound robotic?",
        answer: "No. We use state-of-the-art voice synthesis that captures human-like nuances, tone, and pacing. Most people can't tell they're talking to an AI."
    },
    {
        question: "How fast can you deploy an agent?",
        answer: "Standard deployment takes 5-7 business days. This includes training the AI on your specific business knowledge and integrating it with your CRM."
    },
    {
        question: "Which industries do you specialize in?",
        answer: "We focus on high-stakes, lead-driven industries including Real Estate, Healthcare, and Finance, where speed-to-lead is critical for conversion."
    },
    {
        question: "Can the AI handle complex objections?",
        answer: "Yes. Our agents are trained on your specific sales scripts and common objections, allowing them to pivot and keep the conversation moving toward a booking."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="faq-section">
            <div className="container">
                <h2 className="section-title text-gradient">Frequently Asked Questions</h2>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item glass-card ${openIndex === index ? 'open' : ''}`}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <div className="faq-question">
                                <h3>{faq.question}</h3>
                                <span className="toggle">+</span>
                            </div>
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
