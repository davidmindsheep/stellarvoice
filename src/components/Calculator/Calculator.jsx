import React, { useReducer, useState, useEffect, useRef } from 'react';
import './Calculator.css';
import { QUESTIONS } from '../../calculator/questions';
import { getNextQuestion, getProgress } from '../../calculator/nextQuestion';
import { calculate } from '../../calculator/calc';
import { submitLead } from '../../calculator/submit';

const fmt = (n) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(n);

const initialState = {
    stage: 'start',
    currentId: 'pain',
    answers: {}
};

function reducer(state, action) {
    switch (action.type) {
        case 'start':
            return { ...state, stage: 'quiz', currentId: 'pain' };
        case 'answer': {
            const answers = { ...state.answers, [action.id]: action.value };
            const next = getNextQuestion(action.id, answers);
            if (next === null) return { ...state, answers, stage: 'result' };
            return { ...state, answers, currentId: next };
        }
        default:
            return state;
    }
}

function StartScreen({ onStart }) {
    return (
        <div className="calc-start">
            <p className="calc-eyebrow">30-second test</p>
            <h1 className="calc-headline">Never lose<br />another lead.</h1>
            <p className="calc-subhead">
                Answer four quick questions. See exactly how much revenue is walking past your business every month — and how a voice agent would engage, qualify, and book it.
            </p>
            <button className="calc-continue" style={{ maxWidth: 280 }} onClick={onStart}>
                Start the test
            </button>
            <p className="calc-fineprint-small">No signup. Takes about 30 seconds.</p>
        </div>
    );
}

function OptionButton({ option, onClick }) {
    return (
        <button type="button" className="calc-option" onClick={onClick}>
            {option.icon && <span className="calc-option-icon" aria-hidden>{option.icon}</span>}
            <span className="calc-option-label">{option.label}</span>
        </button>
    );
}

function QuestionCard({ question, onSelect }) {
    return (
        <div>
            <h2 className="calc-prompt">{question.prompt}</h2>
            {question.helper && <p className="calc-helper">{question.helper}</p>}
            <div className="calc-options">
                {question.options.map((opt) => (
                    <OptionButton key={opt.id} option={opt} onClick={() => onSelect(opt)} />
                ))}
            </div>
        </div>
    );
}

function TextInputCard({ question, onSubmit }) {
    const [value, setValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim().length < 2) return;
        onSubmit(value.trim());
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="calc-prompt">{question.prompt}</h2>
            {question.helper && <p className="calc-helper">{question.helper}</p>}
            <input
                ref={inputRef}
                type={question.inputType ?? 'text'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={question.placeholder}
                className="calc-input"
            />
            <button type="submit" className="calc-continue" disabled={value.trim().length < 2}>
                Continue
            </button>
        </form>
    );
}

function ResultScreen({ result }) {
    const { breakdown } = result;
    const rows = [
        { icon: '📞', label: 'Missed calls we engage, qualify, and book', value: breakdown.missedCallsMonthly },
        { icon: '⚡', label: 'Web leads reached under 60 seconds', value: breakdown.speedToLeadMonthly },
        { icon: '🌙', label: 'After-hours enquiries captured', value: breakdown.afterHoursMonthly },
        { icon: '⏳', label: 'Hours your team gets back', value: breakdown.timeSavedMonthly }
    ].filter((r) => r.value > 0);

    return (
        <div className="calc-result">
            <div className="calc-hero-panel">
                <p className="calc-hero-label">Your hidden revenue, monthly</p>
                <p className="calc-hero-number">{fmt(result.monthlyRevenue)}</p>
                <p className="calc-hero-annual">
                    or <strong>{fmt(result.annualRevenue)}</strong> a year
                </p>
            </div>

            {rows.length > 0 && (
                <div className="calc-breakdown">
                    <p className="calc-breakdown-header">Where it's coming from</p>
                    <ul>
                        {rows.map((r) => (
                            <li key={r.label}>
                                <span className="row-icon" aria-hidden>{r.icon}</span>
                                <span className="row-label">{r.label}</span>
                                <span className="row-value">{fmt(r.value)}/mo</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="calc-roi">
                <p className="calc-roi-label">For every $1 you spend with Stellar Voice Agents</p>
                <p className="calc-roi-value">${result.roiMultiple.toFixed(2)} comes back</p>
            </div>

            <a
                href="https://calendly.com/garysarco1/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="calc-cta"
            >
                Book a Demo
            </a>

            <p className="calc-fineprint">
                Estimates based on your answers plus the SVA pillar metrics: 3× speed-to-lead, +120% qualified leads, +45% coverage uplift. On a demo we'll tune them to your actual data.
            </p>
        </div>
    );
}

export default function Calculator({ onClose }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const q = QUESTIONS[state.currentId];
    const progress = state.stage === 'quiz' ? getProgress(state.currentId, state.answers) : (state.stage === 'result' ? 1 : 0);

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const handleAnswer = async (id, value) => {
        dispatch({ type: 'answer', id, value });
        if (id === 'contact') {
            const finalAnswers = { ...state.answers, contact: value };
            await submitLead(finalAnswers);
        }
    };

    return (
        <div className="calc-overlay" role="dialog" aria-modal="true" aria-label="Revenue calculator" onClick={onClose}>
            <div className="calc-modal" onClick={(e) => e.stopPropagation()}>
                <button className="calc-close" onClick={onClose} aria-label="Close calculator">×</button>
                <div className="calc-progress-track" aria-hidden={state.stage === 'start'}>
                    <div className="calc-progress-bar" style={{ width: `${Math.round(progress * 100)}%` }} role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100} />
                </div>

                <main className="calc-main">
                    <div className="calc-card">
                        {state.stage === 'start' && (
                            <div className="calc-slide" key="start">
                                <StartScreen onStart={() => dispatch({ type: 'start' })} />
                            </div>
                        )}

                        {state.stage === 'quiz' && q && (
                            <div className="calc-slide" key={q.id}>
                                {q.kind === 'choice' ? (
                                    <QuestionCard question={q} onSelect={(opt) => handleAnswer(q.id, opt.id)} />
                                ) : (
                                    <TextInputCard question={q} onSubmit={(val) => handleAnswer(q.id, val)} />
                                )}
                            </div>
                        )}

                        {state.stage === 'result' && (
                            <div className="calc-slide" key="result">
                                <ResultScreen result={calculate(state.answers)} />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
