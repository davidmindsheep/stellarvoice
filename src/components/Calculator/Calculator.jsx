import React, { useReducer, useState, useEffect, useRef } from 'react';
import './Calculator.css';
import { QUESTIONS } from '../../calculator/questions';
import { getNextQuestion, getProgress } from '../../calculator/nextQuestion';
import { calculate } from '../../calculator/calc';
import { submitLead } from '../../calculator/submit';
import { track } from '../../lib/analytics';
import { setRecommendation } from '../../lib/recommendationCookie';
import QuoteScreen, { EnterpriseQuoteScreen } from './QuoteScreen';

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
                Answer four quick questions. See exactly how much revenue is walking past your business every month, plus the plan that fits.
            </p>
            <button className="calc-continue" style={{ maxWidth: 280 }} onClick={() => { track('quiz_started'); onStart(); }}>
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
        track('quiz_question_answered', { question_id: id, answer: value });
        dispatch({ type: 'answer', id, value });
        if (id === 'contact') {
            const finalAnswers = { ...state.answers, contact: value };
            const result = calculate(finalAnswers);

            // Phase 2: set the recommendation cookie so the pricing page lights
            // up the matching tier when the user clicks "View plan".
            setRecommendation({
                tier: result.tier,
                revenue_leak: result.monthlyRevenue,
                revenue_annual: result.annualRevenue,
                customer_value: finalAnswers.customerValue,
                lead_volume: finalAnswers.leadVolume
            });

            // Phase 3 analytics.
            track('quiz_completed', {
                value: result.monthlyRevenue,
                currency: 'USD',
                monthly_revenue: result.monthlyRevenue,
                annual_revenue: result.annualRevenue,
                roi_multiple: result.roiMultiple,
                tier: result.tier,
                enterprise: result.enterprise,
                pain: finalAnswers.pain,
                industry: finalAnswers.industry,
                contact_kind: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'email' : 'phone'
            });
            track('quiz_tier_recommended', { tier: result.tier });
            if (result.enterprise) {
                track('enterprise_redirect', { source: 'quiz_result', monthly_revenue: result.monthlyRevenue });
            }

            const submitResult = await submitLead({ ...finalAnswers, _tier: result.tier });
            if (!submitResult.ok) {
                track('quiz_submit_failed', { status: submitResult.status, error: submitResult.error });
            }
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

                        {state.stage === 'result' && (() => {
                            const result = calculate(state.answers);
                            const businessName = state.answers.businessName;
                            return (
                                <div className="calc-slide calc-slide-quote" key="result">
                                    {result.enterprise ? (
                                        <EnterpriseQuoteScreen result={result} businessName={businessName} />
                                    ) : (
                                        <QuoteScreen result={result} businessName={businessName} />
                                    )}
                                </div>
                            );
                        })()}
                    </div>
                </main>
            </div>
        </div>
    );
}
