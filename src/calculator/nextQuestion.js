const TAIL = ['customerValue', 'industry', 'businessName', 'contact'];

const BRANCH_QUESTIONS = {
    missed: ['missedVolume'],
    speed: ['responseTime', 'leadVolume'],
    afterHours: ['afterHoursChannel', 'afterHoursConversion'],
    timeDrain: ['callsHandledBy', 'hoursOnPhone']
};

export function buildQuestionOrder(answers) {
    const pain = answers.pain;
    if (!pain) return ['pain'];
    return ['pain', ...BRANCH_QUESTIONS[pain], ...TAIL];
}

export function getNextQuestion(currentId, answers) {
    const order = buildQuestionOrder(answers);
    const idx = order.indexOf(currentId);
    if (idx === -1 || idx === order.length - 1) return null;
    return order[idx + 1];
}

export function getProgress(currentId, answers) {
    const order = buildQuestionOrder(answers);
    const idx = order.indexOf(currentId);
    return order.length === 0 ? 0 : (idx + 1) / order.length;
}
