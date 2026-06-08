import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './GuideRequestModal.css';
import { GUIDE_INDUSTRIES, guideForIndustryId } from '../../data/guides';
import { track } from '../../lib/analytics';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Popup that collects name / email (validated) / optional phone and emails the
// requester the industry guide. `initialIndustryId` pre-selects the industry
// (set when opened from a picker tile or from the quiz result).
export default function GuideRequestModal({ initialIndustryId = '', onClose }) {
    const [industryId, setIndustryId] = useState(initialIndustryId);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error
    const [errors, setErrors] = useState({});
    const firstRef = useRef(null);

    const guide = guideForIndustryId(industryId);

    useEffect(() => {
        firstRef.current?.focus();
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
    }, [onClose]);

    const validate = () => {
        const e = {};
        if (!industryId) e.industry = 'Please choose your industry.';
        if (name.trim().length < 2) e.name = 'Please enter your name.';
        if (!EMAIL_RE.test(email.trim())) e.email = 'Please enter a valid email address.';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (status === 'sending') return;
        if (!validate()) return;
        const g = guideForIndustryId(industryId);
        setStatus('sending');
        track('guide_requested', { industry: industryId, guide: g?.slug });
        try {
            const res = await fetch('/api/guide/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(), email: email.trim(), phone: phone.trim(),
                    guide: g?.slug, _hp: ''
                })
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok && data.ok) {
                setStatus('sent');
                track('guide_email_sent', { guide: g?.slug });
            } else {
                setStatus('error');
                setErrors({ form: data.error || 'Something went wrong. Please try again.' });
            }
        } catch {
            setStatus('error');
            setErrors({ form: 'Network error. Please try again.' });
        }
    };

    return createPortal(
        <div className="gm-overlay" role="dialog" aria-modal="true" aria-label="Get your industry guide" onClick={onClose}>
            <div className="gm-modal" onClick={(e) => e.stopPropagation()}>
                <button className="gm-close" onClick={onClose} aria-label="Close">&times;</button>

                {status === 'sent' ? (
                    <div className="gm-success">
                        <div className="gm-success-icon" aria-hidden>&#9993;</div>
                        <h2>Check your inbox</h2>
                        <p>We have emailed <strong>{guide?.title}</strong> to <strong>{email}</strong>. It should land in a minute or two.</p>
                        <p className="gm-success-sub">
                            Not there? Check your spam folder, or{' '}
                            <a href="https://calendly.com/garysarco1/30min" target="_blank" rel="noopener noreferrer">book a quick call</a>{' '}
                            and we will walk you through it.
                        </p>
                        <button className="gm-btn" onClick={onClose}>Done</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="gm-form" noValidate>
                        <p className="gm-eyebrow">Free industry guide</p>
                        <h2 className="gm-title">{guide ? guide.title : 'Get the AI voice guide for your industry'}</h2>
                        <p className="gm-sub">Tell us where to send it and we will email you the guide right away.</p>

                        <label className="gm-label">
                            Industry
                            <select
                                ref={!initialIndustryId ? firstRef : null}
                                className="gm-input"
                                value={industryId}
                                onChange={(e) => setIndustryId(e.target.value)}
                            >
                                <option value="">Choose your industry...</option>
                                {GUIDE_INDUSTRIES.map((i) => (
                                    <option key={i.id} value={i.id}>{i.label}</option>
                                ))}
                            </select>
                        </label>
                        {errors.industry && <p className="gm-error">{errors.industry}</p>}

                        <label className="gm-label">
                            Name
                            <input
                                ref={initialIndustryId ? firstRef : null}
                                className="gm-input" type="text" value={name}
                                onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name"
                            />
                        </label>
                        {errors.name && <p className="gm-error">{errors.name}</p>}

                        <label className="gm-label">
                            Email
                            <input
                                className="gm-input" type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email"
                            />
                        </label>
                        {errors.email && <p className="gm-error">{errors.email}</p>}

                        <label className="gm-label">
                            Phone <span className="gm-optional">(optional)</span>
                            <input
                                className="gm-input" type="tel" value={phone}
                                onChange={(e) => setPhone(e.target.value)} placeholder="Mobile number" autoComplete="tel"
                            />
                        </label>

                        {errors.form && <p className="gm-error gm-error-form">{errors.form}</p>}

                        <button type="submit" className="gm-btn" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' : 'Email me the guide'}
                        </button>
                        <p className="gm-fineprint">No spam. We will email the guide, and only follow up if you ask us to.</p>
                    </form>
                )}
            </div>
        </div>
    );
}
