// Math engine. Constants calibrated against SVA pillar metrics
// (3x speed-to-lead, 80% follow-up consistency, +45% coverage).
// Currency: USD. Don't change constants without David.

import { QUESTIONS } from './questions';

const SVA_MONTHLY_FEE = 600;

function meta(answers, qid) {
    const q = QUESTIONS[qid];
    const answerId = answers[qid];
    if (!q?.options || !answerId) return {};
    return q.options.find(o => o.id === answerId)?.meta ?? {};
}

export function calculate(answers) {
    const value = Number(meta(answers, 'customerValue').value ?? 1500);

    // MISSED CALLS — weekly missed × monthly factor × 60% real prospects × 40% book × 30% close.
    const weeklyMissed = Number(meta(answers, 'missedVolume').weekly ?? 0);
    const missedCallsMonthly = weeklyMissed * 4.33 * 0.60 * 0.40 * 0.30 * value;

    // SPEED-TO-LEAD — leads × uplift fraction × customer value.
    const monthlyLeads = Number(meta(answers, 'leadVolume').monthly ?? 0);
    const lift = Number(meta(answers, 'responseTime').lift ?? 0);
    const speedUplift = Math.max(0, lift - 1.0) * 0.10;
    const speedToLeadMonthly = monthlyLeads * speedUplift * value;

    // AFTER-HOURS — share of call volume × retention × close × value.
    const channel = answers.afterHoursChannel;
    const retention = Number(meta(answers, 'afterHoursConversion').retention ?? 0);
    const baselineWeeklyCalls = weeklyMissed || 15;
    const afterHoursShare = channel === 'both' ? 0.35 : 0.25;
    const afterHoursMonthly = channel
        ? baselineWeeklyCalls * 4.33 * afterHoursShare * retention * 0.30 * value
        : 0;

    // TIME DRAIN — reclaimable hours × $45/hr opportunity cost.
    const hoursOnPhone = Number(meta(answers, 'hoursOnPhone').hours ?? 0);
    const timeSavedMonthly = hoursOnPhone * 4.33 * 45 * 0.6;

    const monthlyRevenue =
        missedCallsMonthly + speedToLeadMonthly + afterHoursMonthly + timeSavedMonthly;

    const drivers = [
        ['missedCallsMonthly', missedCallsMonthly, 'Missed calls we engage, qualify, and book'],
        ['speedToLeadMonthly', speedToLeadMonthly, 'Web leads reached under 60 seconds'],
        ['afterHoursMonthly', afterHoursMonthly, 'After-hours enquiries captured'],
        ['timeSavedMonthly', timeSavedMonthly, 'Hours your team gets back']
    ];
    const primary = drivers.reduce((a, b) => (b[1] > a[1] ? b : a));

    return {
        monthlyRevenue: Math.round(monthlyRevenue),
        annualRevenue: Math.round(monthlyRevenue * 12),
        roiMultiple: Math.round((monthlyRevenue / SVA_MONTHLY_FEE) * 100) / 100,
        primaryDriverLabel: primary[2],
        breakdown: {
            missedCallsMonthly: Math.round(missedCallsMonthly),
            speedToLeadMonthly: Math.round(speedToLeadMonthly),
            afterHoursMonthly: Math.round(afterHoursMonthly),
            timeSavedMonthly: Math.round(timeSavedMonthly)
        },
        sva: { monthlyFee: SVA_MONTHLY_FEE }
    };
}
