import React, { useState } from 'react';
import './FAQ.css';

const faqs = [
    { question: 'Do the AI agents sound robotic?', answer: 'No. We use state-of-the-art voice synthesis that captures human-like nuances, tone, and pacing. Most people can\'t tell they\'re talking to an AI. You can listen to real demos above.' },
    { question: 'How fast can you deploy an agent?', answer: 'Standard deployment takes 5-7 business days. This includes training the AI on your specific business knowledge, scripting qualification questions, and integrating with your CRM.' },
    { question: 'Which industries do you work with?', answer: 'We work with any lead-driven business where speed-to-lead matters. Our biggest verticals include real estate, solar, healthcare, finance, legal, home services (HVAC, plumbing, roofing), landscaping, and insurance.' },
    { question: 'Can the AI handle complex objections?', answer: 'Yes. Our agents are trained on your specific sales scripts and common objections, allowing them to pivot naturally and keep the conversation moving toward a booking.' },
    { question: 'What does it cost?', answer: 'We offer flexible plans based on call volume and which products you need (AI Receptionist, ClosedLoop Callback, ClosedLoop Outbound). Book a strategy call and we will build a custom quote for your business.' },
    { question: 'Does it integrate with my CRM?', answer: 'Yes. We integrate with most major CRMs, Google Ads, Meta Ads, and can connect via webhooks or Zapier. All call data, recordings, and transcripts are pushed to your system in real time.' },
    { question: 'What kind of ROI can I expect?', answer: 'Most clients see a 10x improvement in lead-to-appointment conversion because we respond in seconds instead of hours. The AI also works 24/7, capturing leads that would otherwise be lost.' },
    { question: 'Can I choose the voice and language?', answer: 'Absolutely. We offer multiple voice personas including male, female, and multilingual options. We customize tone, pacing, and script to match your brand identity.' },
    { question: 'What if the AI can\'t handle a question?', answer: 'Our agents gracefully escalate to a human when needed. You stay in full control of the handoff rules \u2014 the AI knows when to transfer, and the lead never feels abandoned.' }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    return (
        <section id="faq" className="faq-section">
            <div className="container">
                <h2 className="section-title text-gradient">Frequently Asked Questions</h2>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq-item glass-card ${openIndex === index ? 'open' : ''}`} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                            <div className="faq-question">
                                <h3>{faq.question}</h3>
                                <span className="toggle">{openIndex === index ? '\u2212' : '+'}</span>
                            </div>
                            <div className="faq-answer"><p>{faq.answer}</p></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
