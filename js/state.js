/* ============================================
   STATE MANAGEMENT
   ============================================ */

const state = {
    xp: 0,
    level: 1,
    streak: 0,
    lessonsCompleted: 0,
    achievements: [],
    modules: {},
    skills: {},
    currentSection: 'home',
    chatOpen: false,
    quizActive: false,
    bossBattleActive: false,
    loadingMessages: [
        "Initializing neural pathways...",
        "Aligning stakeholders emotionally...",
        "Converting buzzwords into strategy...",
        "Convincing engineers this is MVP...",
        "Generating synergy...",
        "Deploying AI agents...",
        "Brewing coffee for PMs...",
        "Optimizing roadmap dependencies...",
        "Hallucinating product requirements...",
        "Calculating ROI of learning...",
        "Syncing with the AI mothership...",
        "Preparing dopamine hits...",
        "Loading meme generators...",
        "Warming up neural networks...",
        "Deploying chaos monkeys..."
    ],
    loadingIndex: 0
};

export { state };