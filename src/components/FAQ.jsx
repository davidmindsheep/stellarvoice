import React, { useState } from 'react';
import './FAQ.css';
import useScrollReveal from '../hooks/useScrollReveal';

// Brief Sec 3.17: rewrites + two new questions ("How is Stellar different..."
// and "What can the AI voice agent actually do?")
const faqs = [
    {
        question: 'Do the AI agents sound robotic?',
        answer: 'Our agents respond in under two seconds with natural-sounding voices, warm pacing, and real conversational tone. They handle complex questions, adapt when callers change subjects, and guide every conversation toward a booking. Most callers do not realise they are talking to AI. Press play on any of our demos above and hear for yourself.'
    },
    {
        question: 'How fast can you deploy an agent?',
        answer: 'Standard deployment takes 5-7 business days. This includes training the AI on your specific business knowledge, scripting qualification questions, and integrating with your CRM.'
    },
    {
        question: 'Which industries do you work with?',
        answer: 'We work with any lead-driven business where speed-to-lead matters. Our biggest verticals include real estate, solar, healthcare, finance, legal, home services (HVAC, plumbing, roofing), landscaping, and insurance.'
    },
    {
        question: 'Can the AI handle complex objections?',
        answer: 'Yes. Our agents are trained on your specific sales scripts and common objections, allowing them to pivot naturally and keep the conversation moving toward a booking.'
    },
    {
        question: 'What does it cost?',
        answer: 'Our pricing starts at $497 per month plus a per-booking fee starting at $35. The more you commit, the lower the per-booking rate drops. Visit our pricing page for the full breakdown, or book a call and we will build a custom package.'
    },
    {
        question: 'How is Stellar different from other AI voice companies?',
        answer: 'We focus exclusively on sales qualification. Every agent is purpose-built to qualify leads and book appointments. Our pricing is performance-based, so you pay a low monthly retainer plus a fee per qualified booking. And we use a premium tech stack that produces voices most callers cannot distinguish from a real person.'
    },
    {
        question: 'What can the AI voice agent actually do?',
        answer: 'Our AI agents hold natural two-way conversations with your leads. They qualify callers on budget, timeline, and fit. They handle complex questions using your business knowledge. They adapt when callers go off-topic and guide the conversation back to booking. They respond in under two seconds with natural-sounding voices that carry warm pacing and real tone. And they book qualified meetings directly onto your calendar. Every call is recorded, transcribed, and scored so you can hear exactly what your AI is saying.'
    },
    {
        question: 'Does it integrate with my CRM?',
        answer: 'Yes. We integrate with most major CRMs, Google Ads, Meta Ads, and can connect via webhooks or Zapier. All call data, recordings, and transcripts are pushed to your system in real time.'
    },
    {
        question: 'What kind of ROI can I expect?',
        answer: 'Most clients see a 10x improvement in lead-to-appointment conversion because we respond in seconds instead of hours. The AI also works 24/7, capturing leads that would otherwise be lost.'
    },
    {
        question: 'Can I choose the voice and language?',
        answer: 'Absolutely. We offer multiple voice personas including male, female, and multilingual options. We customize tone, pacing, and script to match your brand identity.'
    },
    {
        question: "What if the AI can't handle a question?",
        answer: "Our agents gracefully escalate to a human when needed. You stay in full control of the handoff rules. The AI knows when to transfer, and the lead never feels abandoned."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const titleRef = useScrollReveal();
    return (
        <section id="faq" className="faq-section bg-alt">
            <div className="container">
                <div ref={titleRef} className="reveal">
                    <h2 className="section-title text-gradient">Frequently Asked Questions</h2>
                </div>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq-item glass-card ${openIndex === index ? 'open' : ''}`} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                            <div className="faq-question">
                                <h3>{faq.question}</h3>
                                <span className="toggle">+</span>
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
