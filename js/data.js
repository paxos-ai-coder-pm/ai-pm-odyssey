/* ============================================
   MODULES DATA
   ============================================ */

const modulesData = [
    {
        id: 'ai-foundations',
        icon: '🧠',
        title: 'AI Foundations',
        description: 'What is AI? ML vs DL vs GenAI. Neural networks, transformers, embeddings, vector databases, RAG, agents, and more. No PhD required.',
        level: 'beginner',
        progress: 0,
        hours: 12,
        lessons: 8,
        xp: 500,
        color: '#8b5cf6',
        topics: ['What is AI?', 'ML vs DL vs GenAI', 'Neural Networks', 'Transformers', 'Embeddings', 'Vector Databases', 'Fine Tuning', 'RAG', 'AI Agents', 'Multimodal AI']
    },
    {
        id: 'llm-mastery',
        icon: '💬',
        title: 'LLM Mastery for PMs',
        description: 'Prompt engineering, context windows, hallucinations, AI evaluation, system prompts, agent workflows, function calling, and memory systems.',
        level: 'intermediate',
        progress: 0,
        hours: 15,
        lessons: 10,
        xp: 750,
        color: '#06b6d4',
        topics: ['Prompt Engineering', 'Context Windows', 'Hallucinations', 'AI Evaluation', 'AI UX', 'System Prompts', 'Agent Workflows', 'Function Calling', 'Memory Systems', 'Reasoning Models']
    },
    {
        id: 'ai-product-mgmt',
        icon: '📊',
        title: 'AI Product Management',
        description: 'AI product discovery, AI-first thinking, roadmap planning, prioritization, monetization, metrics, and learning from AI product failures.',
        level: 'intermediate',
        progress: 0,
        hours: 18,
        lessons: 12,
        xp: 1000,
        color: '#f97316',
        topics: ['AI Product Discovery', 'AI-First Thinking', 'AI Roadmap Planning', 'AI Feature Prioritization', 'Product Sense for AI', 'AI Monetization', 'Metrics for AI Products', 'Retention Loops', 'Human-in-the-Loop', 'AI Product Failures']
    },
    {
        id: 'design-ai',
        icon: '🎨',
        title: 'Design for AI Products',
        description: 'Conversational UX, copilot design, AI onboarding, trust design, explainability, interaction patterns, voice UX, and personalization.',
        level: 'intermediate',
        progress: 0,
        hours: 10,
        lessons: 8,
        xp: 600,
        color: '#ec4899',
        topics: ['Conversational UX', 'Copilot Design', 'AI Onboarding', 'Trust Design', 'Explainability', 'AI Interaction Patterns', 'Voice UX', 'Personalization']
    },
    {
        id: 'tech-skills',
        icon: '⚙️',
        title: 'Tech Skills for PMs',
        description: 'APIs, JSON, Python basics, SQL, LangChain, MCP, Vector DBs, cloud basics, AI architecture, and deployment pipelines.',
        level: 'advanced',
        progress: 0,
        hours: 20,
        lessons: 14,
        xp: 1200,
        color: '#22c55e',
        topics: ['APIs', 'JSON', 'Python Basics', 'SQL', 'LangChain', 'MCP', 'Vector DBs', 'Cloud Basics', 'AI Architecture', 'CI/CD for AI']
    },
    {
        id: 'ai-agents',
        icon: '🤖',
        title: 'AI Agents & Automation',
        description: 'Autonomous agents, multi-agent systems, tool usage, agent memory, workflow automation, and agent orchestration.',
        level: 'advanced',
        progress: 0,
        hours: 16,
        lessons: 10,
        xp: 900,
        color: '#eab308',
        topics: ['Autonomous Agents', 'Multi-Agent Systems', 'Tool Usage', 'Agent Memory', 'Workflow Automation', 'AI Assistants', 'Agent Orchestration']
    },
    {
        id: 'data-analytics',
        icon: '📈',
        title: 'Data & Analytics for AI PMs',
        description: 'Product analytics, experimentation, A/B testing, AI evaluation metrics, retention analytics, dashboards, and data storytelling.',
        level: 'intermediate',
        progress: 0,
        hours: 12,
        lessons: 8,
        xp: 700,
        color: '#3b82f6',
        topics: ['Product Analytics', 'Experimentation', 'A/B Testing', 'AI Evaluation Metrics', 'Retention Analytics', 'Dashboards', 'Data Storytelling']
    },
    {
        id: 'ai-business',
        icon: '💼',
        title: 'AI Business & Strategy',
        description: 'AI startups, moats, competition, economics, open source disruption, regulations, ethics, and GTM for AI products.',
        level: 'advanced',
        progress: 0,
        hours: 14,
        lessons: 10,
        xp: 800,
        color: '#ef4444',
        topics: ['AI Startups', 'AI Moats', 'AI Competition', 'AI Economics', 'Open Source Disruption', 'AI Regulations', 'AI Ethics', 'GTM for AI Products']
    },
    {
        id: 'building-ai',
        icon: '🏗️',
        title: 'Building Real AI Products',
        description: 'Capstone. Build AI copilots, chatbots, search engines, RAG systems, and more. End-to-end tutorials with deploy buttons.',
        level: 'advanced',
        progress: 0,
        hours: 25,
        lessons: 16,
        xp: 2000,
        color: '#8b5cf6',
        topics: ['AI Copilots', 'Chatbots', 'AI Search Engine', 'RAG System', 'AI Legal Assistant', 'AI PM Assistant', 'AI Resume Optimizer', 'AI Research Assistant']
    }
];

/* ============================================
   ACHIEVEMENTS DATA
   ============================================ */

const achievementsData = [
    { id: 'first-lesson', icon: '🎯', name: 'First Steps', description: 'Complete your first lesson', xp: 50, unlocked: false },
    { id: 'streak-3', icon: '🔥', name: 'On Fire', description: '3-day learning streak', xp: 100, unlocked: false },
    { id: 'streak-7', icon: '💪', name: 'Unstoppable', description: '7-day learning streak', xp: 250, unlocked: false },
    { id: 'xp-500', icon: '⭐', name: 'XP Hunter', description: 'Earn 500 XP', xp: 100, unlocked: false },
    { id: 'xp-1000', icon: '🌟', name: 'XP Master', description: 'Earn 1000 XP', xp: 200, unlocked: false },
    { id: 'xp-5000', icon: '💫', name: 'XP Legend', description: 'Earn 5000 XP', xp: 500, unlocked: false },
    { id: 'module-complete', icon: '📚', name: 'Knowledge Seeker', description: 'Complete your first module', xp: 150, unlocked: false },
    { id: 'all-modules', icon: '🏆', name: 'AI PM Complete', description: 'Complete all modules', xp: 1000, unlocked: false },
    { id: 'quiz-master', icon: '🧠', name: 'Quiz Master', description: 'Get 100% on any quiz', xp: 100, unlocked: false },
    { id: 'boss-slayer', icon: '🐉', name: 'Boss Slayer', description: 'Defeat your first boss', xp: 200, unlocked: false },
    { id: 'prompt-wizard', icon: '✨', name: 'Prompt Wizard', description: 'Master the prompt arena', xp: 150, unlocked: false },
    { id: 'level-10', icon: '📈', name: 'Level Up!', description: 'Reach Level 10', xp: 300, unlocked: false },
    { id: 'level-25', icon: '🚀', name: 'Rocket Powered', description: 'Reach Level 25', xp: 500, unlocked: false },
    { id: 'level-50', icon: '👑', name: 'AI Strategist', description: 'Reach Level 50', xp: 1000, unlocked: false },
    { id: 'level-100', icon: '🧙‍♂️', name: 'AI Product Wizard', description: 'Reach Level 100', xp: 5000, unlocked: false },
    { id: 'chaos-deployed', icon: '💥', name: 'Chaos Agent', description: 'Click "Deploy Chaos"', xp: 50, unlocked: false }
];

/* ============================================
   SKILLS DATA
   ============================================ */

const skillsData = [
    { id: 'ai-literacy', icon: '🧠', name: 'AI Literacy', level: 1, maxLevel: 10, unlocked: true },
    { id: 'prompting', icon: '💬', name: 'Prompt Engineering', level: 0, maxLevel: 10, unlocked: false },
    { id: 'product-sense', icon: '🎯', name: 'AI Product Sense', level: 0, maxLevel: 10, unlocked: false },
    { id: 'technical', icon: '⚙️', name: 'Technical Skills', level: 0, maxLevel: 10, unlocked: false },
    { id: 'agents', icon: '🤖', name: 'Agent Systems', level: 0, maxLevel: 10, unlocked: false },
    { id: 'data', icon: '📊', name: 'Data Analytics', level: 0, maxLevel: 10, unlocked: false },
    { id: 'strategy', icon: '💼', name: 'AI Strategy', level: 0, maxLevel: 10, unlocked: false },
    { id: 'design', icon: '🎨', name: 'AI Design', level: 0, maxLevel: 10, unlocked: false },
    { id: 'building', icon: '🏗️', name: 'AI Building', level: 0, maxLevel: 10, unlocked: false },
    { id: 'leadership', icon: '👑', name: 'AI Leadership', level: 0, maxLevel: 10, unlocked: false }
];

export { modulesData, achievementsData, skillsData };