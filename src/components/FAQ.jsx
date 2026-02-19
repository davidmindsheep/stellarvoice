import React, { useState } from 'react';
import './FAQ.css';

const faqs = [
    {
        question: "Won't calling 6 times annoy my leads?",
        answer: "Data shows that 93% of leads are contacted by the 6th attempt. We are persistent but polite. In Real Estate, being 'annoyingly helpful' is better than being forgotten."
    },
    {
        question: "Does it integrate with my CRM?",
        answer: "Yes. We integrate seamlessly with major Real Estate CRMs like Follow Up Boss, kvCORE, LionDesk, and HubSpot to sync leads and appointments automatically."
    },
    {
        question: "Can it answer questions about specific properties?",
        answer: "Stellar is an expert at qualification and appointment setting. For complex property details, it can take a detailed message or live-transfer the hot lead directly to your mobile."
    },
    {
        question: "Do the agents sound human?",
        answer: "Yes. We select the most professional, warm, and hyper-realistic voices specifically for this industry. Most callers never realize they are speaking to an AI at all."
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
