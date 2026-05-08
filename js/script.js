/* ============================================
   AI PM ODYSSEY - MAIN APPLICATION
   ============================================ */

// ============================================
// STATE MANAGEMENT
// ============================================
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

// ============================================
// MODULES DATA
// ============================================
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

// ============================================
// ACHIEVEMENTS DATA
// ============================================
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

// ============================================
// SKILLS DATA
// ============================================
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

// ============================================
// LEADERBOARD DATA
// ============================================
const leaderboardData = [
    { name: 'AI_Wizard_42', title: 'AI Product Strategist', xp: 15420, avatar: '🧙' },
    { name: 'PromptMaster', title: 'LLM Engineer', xp: 12350, avatar: '💬' },
    { name: 'NeuralNinja', title: 'ML Engineer', xp: 10890, avatar: '🥷' },
    { name: 'DataDruid', title: 'Data Scientist', xp: 9450, avatar: '📊' },
    { name: 'AgentSmith', title: 'AI Agent Builder', xp: 8720, avatar: '🤖' },
    { name: 'VectorViking', title: 'RAG Specialist', xp: 7650, avatar: '⚡' },
    { name: 'TokenWizard', title: 'Prompt Engineer', xp: 6540, avatar: '✨' },
    { name: 'ModelMaverick', title: 'AI Product Manager', xp: 5430, avatar: '🚀' },
    { name: 'GPTPilgrim', title: 'AI Researcher', xp: 4320, avatar: '🔬' },
    { name: 'AIAcolyte', title: 'AI Apprentice', xp: 3210, avatar: '🌱' }
];

// ============================================
// QUIZ DATA
// ============================================
const quizData = [
    {
        question: "What does RAG stand for in AI systems?",
        options: [
            "Retrieval-Augmented Generation",
            "Random Access Generation",
            "Recursive Algorithmic Gradient",
            "Real-time AI Gateway"
        ],
        correct: 0,
        explanation: "RAG = Retrieval-Augmented Generation. It combines retrieval of relevant documents with text generation for more accurate, grounded responses."
    },
    {
        question: "What's the main difference between ML and DL?",
        options: [
            "DL uses deeper neural networks with more layers",
            "ML is always better than DL",
            "DL doesn't need data",
            "ML uses neural networks, DL doesn't"
        ],
        correct: 0,
        explanation: "Deep Learning is a subset of ML that uses deep neural networks with multiple layers to learn hierarchical representations."
    },
    {
        question: "What is a 'hallucination' in LLMs?",
        options: [
            "When the model generates false or nonsensical information confidently",
            "When the model dreams about electric sheep",
            "When the model refuses to answer",
            "When the model runs out of tokens"
        ],
        correct: 0,
        explanation: "Hallucinations occur when LLMs generate plausible-sounding but factually incorrect information. It's a key challenge in AI product design."
    },
    {
        question: "What is a 'vector database' used for?",
        options: [
            "Storing and searching high-dimensional vector embeddings",
            "Storing regular SQL data",
            "Running machine learning models",
            "Generating images"
        ],
        correct: 0,
        explanation: "Vector databases store embeddings (vector representations of data) and enable semantic similarity search, crucial for RAG systems."
    },
    {
        question: "What is 'fine-tuning' in AI?",
        options: [
            "Taking a pre-trained model and training it further on specific data",
            "Making minor adjustments to the UI",
            "Deleting unnecessary model parameters",
            "Running the model on a smaller server"
        ],
        correct: 0,
        explanation: "Fine-tuning adapts a pre-trained model to specific tasks or domains by continuing training on targeted datasets."
    },
    {
        question: "What is 'prompt engineering'?",
        options: [
            "Crafting inputs to get desired outputs from AI models",
            "Building physical computer prompts",
            "Engineering the prompt programming language",
            "Designing UI prompts for users"
        ],
        correct: 0,
        explanation: "Prompt engineering is the practice of carefully designing inputs to guide AI models toward desired outputs."
    },
    {
        question: "What is an 'AI agent'?",
        options: [
            "An AI system that can perceive, reason, and act autonomously",
            "A chatbot",
            "A recommendation algorithm",
            "A data processing pipeline"
        ],
        correct: 0,
        explanation: "AI agents are autonomous systems that perceive their environment, reason about goals, and take actions to achieve them."
    },
    {
        question: "What is 'chain-of-thought' prompting?",
        options: [
            "Breaking down complex problems into step-by-step reasoning",
            "A type of neural network architecture",
            "A database query method",
            "A UI design pattern"
        ],
        correct: 0,
        explanation: "Chain-of-thought prompting encourages models to show their reasoning step-by-step, improving accuracy on complex tasks."
    }
];

// ============================================
// AI MENTOR RESPONSES
// ============================================
const mentorResponses = {
    'hello': "Hey there! Ready to level up your AI PM game? 🚀 What's on your mind?",
    'ai': "AI is like having a super-smart intern who works 24/7 but sometimes hallucinates. Your job as an AI PM is to harness that power while managing the risks.",
    'prompt': "Prompt engineering is the new black. Think of it like giving instructions to a very literal, very creative genius. Be specific, provide context, and always test!",
    'roadmap': "Ah, the roadmap. In AI products, your roadmap should be more like a compass than a map. The landscape changes weekly. Stay flexible!",
    'career': "AI PM is the hottest role in tech right now. You're not just managing products - you're shaping how humans interact with intelligence itself.",
    'learn': "Start with the foundations, but don't get stuck in theory. Build something. Break something. Learn from both. That's the AI PM way.",
    'default': "Great question! Here's the thing about AI products: they're 10% model, 90% product thinking. Focus on the user experience, not just the technology."
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Loading sequence
    let progress = 0;
    const loaderText = document.getElementById('loader-text');
    const loaderProgress = document.querySelector('.loader-progress');
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;
        
        loaderProgress.style.width = progress + '%';
        
        if (progress < 30) {
            loaderText.textContent = state.loadingMessages[0];
        } else if (progress < 50) {
            loaderText.textContent = state.loadingMessages[1];
        } else if (progress < 70) {
            loaderText.textContent = state.loadingMessages[2];
        } else if (progress < 90) {
            loaderText.textContent = state.loadingMessages[3];
        } else {
            loaderText.textContent = "🚀 Launching AI PM Odyssey...";
        }
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                document.getElementById('loading-screen').classList.add('hidden');
                document.getElementById('app').style.display = 'flex';
                initParticles();
                renderModules();
                renderAchievements();
                renderLeaderboard();
                renderSkills();
                renderModulesPreview();
                updateUI();
                startStreakCheck();
                startNewsTicker();
            }, 500);
        }
    }, 200);
}

// ============================================
// PARTICLE SYSTEM
// ============================================
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = ['#8b5cf6', '#3b82f6', '#06b6d4', '#ec4899'][Math.floor(Math.random() * 4)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            
            // Glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
    
    // Create particles
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
    
    // Connection lines
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        drawConnections();
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// RENDER FUNCTIONS
// ============================================
function renderModules() {
    const container = document.getElementById('modules-full');
    container.innerHTML = modulesData.map(module => createModuleCard(module)).join('');
}

function renderModulesPreview() {
    const container = document.getElementById('modules-preview');
    container.innerHTML = modulesData.slice(0, 3).map(module => createModuleCard(module)).join('');
}

function createModuleCard(module) {
    const progress = state.modules[module.id]?.progress || 0;
    const completed = state.modules[module.id]?.completed || false;
    
    return `
        <div class="module-card" onclick="openModule('${module.id}')" style="border-top: 3px solid ${module.color}">
            <div class="module-header">
                <span class="module-icon">${module.icon}</span>
                <span class="module-level ${module.level}">${module.level}</span>
            </div>
            ${completed ? '<div class="module-badge">✅</div>' : ''}
            <h3>${module.title}</h3>
            <p>${module.description}</p>
            <div class="module-progress">
                <div class="progress-header">
                    <span>Progress</span>
                    <span>${progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width:${progress}%;background:${module.color}"></div>
                </div>
            </div>
            <div class="module-stats">
                <span>📚 ${module.lessons} lessons</span>
                <span>⏱ ${module.hours}h</span>
                <span>⭐ ${module.xp} XP</span>
            </div>
        </div>
    `;
}

function renderAchievements() {
    const container = document.getElementById('achievements-grid');
    container.innerHTML = achievementsData.map(ach => {
        const unlocked = state.achievements.includes(ach.id);
        return `
            <div class="achievement-card ${unlocked ? '' : 'locked'}">
                <div class="achievement-icon">${ach.icon}</div>
                <div class="achievement-info">
                    <h4>${ach.name}</h4>
                    <p>${ach.description}</p>
                    <span class="achievement-xp">+${ach.xp} XP</span>
                </div>
            </div>
        `;
    }).join('');
}

function renderLeaderboard() {
    const container = document.getElementById('leaderboard-container');
    container.innerHTML = leaderboardData.map((player, i) => {
        const rankClass = i === 0 ? 'top-1' : i === 1 ? 'top-2' : i === 2 ? 'top-3' : '';
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
        return `
            <div class="leaderboard-item ${rankClass}">
                <div class="leaderboard-rank">${medal}</div>
                <div class="leaderboard-avatar">${player.avatar}</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-name">${player.name}</div>
                    <div class="leaderboard-title">${player.title}</div>
                </div>
                <div class="leaderboard-xp">${player.xp.toLocaleString()} XP</div>
            </div>
        `;
    }).join('');
}

function renderSkills() {
    const container = document.getElementById('skill-nodes');
    container.innerHTML = skillsData.map(skill => {
        const unlocked = skill.unlocked;
        return `
            <div class="skill-node ${unlocked ? 'unlocked' : 'locked'}" onclick="${unlocked ? `upgradeSkill('${skill.id}')` : ''}">
                <div class="skill-node-icon">${skill.icon}</div>
                <div class="skill-node-name">${skill.name}</div>
                <div class="skill-node-level">Lv.${skill.level}/${skill.maxLevel}</div>
                <div class="progress-bar" style="height:4px;margin-top:0.5rem">
                    <div class="progress-fill" style="width:${(skill.level/skill.maxLevel)*100}%;background:var(--neon-green)"></div>
                </div>
            </div>
        `;
    }).join('');
    
    // Draw skill tree connections
    drawSkillTree();
}

function drawSkillTree() {
    const canvas = document.getElementById('skill-tree-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    
    const nodes = container.querySelectorAll('.skill-node');
    const positions = [];
    
    nodes.forEach(node => {
        const rect = node.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        positions.push({
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2,
            unlocked: node.classList.contains('unlocked')
        });
    });
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections
    for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
            const dx = positions[i].x - positions[j].x;
            const dy = positions[i].y - positions[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 250) {
                ctx.beginPath();
                ctx.moveTo(positions[i].x, positions[i].y);
                ctx.lineTo(positions[j].x, positions[j].y);
                
                const gradient = ctx.createLinearGradient(positions[i].x, positions[i].y, positions[j].x, positions[j].y);
                gradient.addColorStop(0, positions[i].unlocked ? '#22c55e' : '#606080');
                gradient.addColorStop(1, positions[j].unlocked ? '#22c55e' : '#606080');
                
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1.5;
                ctx.globalAlpha = 0.3;
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }
    }
}

// ============================================
// NAVIGATION
// ============================================
function switchSection(sectionId) {
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.section === sectionId);
    });
    
    // Update sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
        targetSection.classList.add('active');
        state.currentSection = sectionId;
        
        // Re-draw skill tree if switching to skills
        if (sectionId === 'skills') {
            setTimeout(drawSkillTree, 100);
        }
    }
}

// Add click handlers to nav items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        switchSection(item.dataset.section);
    });
});

// ============================================
// MODULE INTERACTION
// ============================================
function openModule(moduleId) {
    const module = modulesData.find(m => m.id === moduleId);
    if (!module) return;
    
    const progress = state.modules[moduleId]?.progress || 0;
    const completed = state.modules[moduleId]?.completed || false;
    
    const content = `
        <div style="text-align:center;margin-bottom:2rem">
            <div style="font-size:4rem;margin-bottom:1rem">${module.icon}</div>
            <h2 style="font-size:1.8rem;font-weight:800;margin-bottom:0.5rem;color:${module.color}">${module.title}</h2>
            <p style="color:var(--text-secondary);margin-bottom:1rem">${module.description}</p>
            <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
                <span style="padding:0.25rem 0.75rem;background:var(--glass-bg);border-radius:100px;font-size:0.8rem">📚 ${module.lessons} lessons</span>
                <span style="padding:0.25rem 0.75rem;background:var(--glass-bg);border-radius:100px;font-size:0.8rem">⏱ ${module.hours}h</span>
                <span style="padding:0.25rem 0.75rem;background:var(--glass-bg);border-radius:100px;font-size:0.8rem">⭐ ${module.xp} XP</span>
            </div>
            ${completed ? '<div style="margin-top:1rem;padding:0.5rem 1rem;background:rgba(34,197,94,0.2);border-radius:8px;color:var(--neon-green)">✅ Completed!</div>' : ''}
        </div>
        
        <div style="margin-bottom:1.5rem">
            <h3 style="margin-bottom:1rem;color:var(--neon-cyan)">📋 Topics Covered</h3>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem">
                ${module.topics.map(topic => `
                    <div style="padding:0.5rem 1rem;background:var(--glass-bg);border-radius:8px;font-size:0.85rem;display:flex;align-items:center;gap:0.5rem">
                        <span style="color:${module.color}">▸</span> ${topic}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div style="margin-bottom:1.5rem">
            <h3 style="margin-bottom:1rem;color:var(--neon-cyan)">📊 Progress</h3>
            <div class="progress-header">
                <span>Overall Progress</span>
                <span>${progress}%</span>
            </div>
            <div class="progress-bar" style="height:10px">
                <div class="progress-fill" style="width:${progress}%;background:${module.color}"></div>
            </div>
        </div>
        
        <div style="display:flex;gap:1rem;flex-wrap:wrap">
            <button onclick="startLesson('${module.id}')" style="flex:1;padding:1rem;background:var(--gradient-primary);color:white;border-radius:12px;font-weight:600;font-size:1rem">
                ${progress > 0 ? '▶ Continue Learning' : '🚀 Start Learning'}
            </button>
            <button onclick="startBossBattle('${module.id}')" style="flex:1;padding:1rem;background:linear-gradient(135deg,#ef4444,#f97316);color:white;border-radius:12px;font-weight:600;font-size:1rem">
                ⚔️ Boss Challenge
            </button>
        </div>
    `;
    
    openModal(content);
}

function startLesson(moduleId) {
    closeModal();
    const module = modulesData.find(m => m.id === moduleId);
    if (!module) return;
    
    // Simulate lesson progress
    const currentProgress = state.modules[moduleId]?.progress || 0;
    const newProgress = Math.min(100, currentProgress + Math.floor(Math.random() * 20) + 10);
    
    if (!state.modules[moduleId]) {
        state.modules[moduleId] = { progress: 0, completed: false };
    }
    
    state.modules[moduleId].progress = newProgress;
    
    if (newProgress >= 100 && !state.modules[moduleId].completed) {
        state.modules[moduleId].completed = true;
        addXP(module.xp);
        unlockAchievement('module-complete');
        showNotification(`🎉 Completed ${module.title}!`, `+${module.xp} XP`, 'achievement');
        triggerConfetti();
    } else {
        const xpGain = Math.floor(module.xp * 0.15);
        addXP(xpGain);
        showNotification(`📖 Progress on ${module.title}`, `+${xpGain} XP`, 'xp');
    }
    
    state.lessonsCompleted++;
    renderModules();
    renderModulesPreview();
    updateUI();
}

function startBossBattle(moduleId) {
    closeModal();
    const module = modulesData.find(m => m.id === moduleId);
    if (!module) return;
    
    const bosses = [
        { name: 'Hallucination Dragon', icon: '🐉', hp: 100 },
        { name: 'Overfitting Monster', icon: '👾', hp: 120 },
        { name: 'Bias Gremlin', icon: '👹', hp: 80 },
        { name: 'Latency Kraken', icon: '🐙', hp: 150 },
        { name: 'Data Leak Phantom', icon: '👻', hp: 90 }
    ];
    
    const boss = bosses[Math.floor(Math.random() * bosses.length)];
    let bossHP = boss.hp;
    let playerHP = 100;
    let battleActive = true;
    
    const content = `
        <div class="boss-battle">
            <div class="boss-icon">${boss.icon}</div>
            <div class="boss-name">⚔️ ${boss.name}</div>
            <p style="color:var(--text-secondary);margin-bottom:1rem">Defeat the ${boss.name} to master ${module.title}!</p>
            
            <div class="boss-hp">
                <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:0.25rem">
                    <span style="color:#ef4444">${boss.icon} ${boss.name}</span>
                    <span id="boss-hp-text">${bossHP}/${boss.hp}</span>
                </div>
                <div class="boss-hp-bar">
                    <div class="boss-hp-fill" id="boss-hp-fill" style="width:100%"></div>
                </div>
            </div>
            
            <div class="boss-hp" style="margin-top:1rem">
                <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:0.25rem">
                    <span style="color:var(--neon-green)">🧑‍💻 You</span>
                    <span id="player-hp-text">${playerHP}/100</span>
                </div>
                <div class="boss-hp-bar" style="border-color:rgba(34,197,94,0.3)">
                    <div class="boss-hp-fill" id="player-hp-fill" style="width:100%;background:linear-gradient(90deg,#22c55e,#06b6d4)"></div>
                </div>
            </div>
            
            <div id="battle-log" style="margin:1rem 0;padding:1rem;background:var(--bg-card);border-radius:12px;min-height:60px;font-size:0.85rem;color:var(--text-secondary)">
                🎮 The ${boss.name} appears! Use your AI knowledge to defeat it!
            </div>
            
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center">
                <button class="boss-attack-btn" onclick="bossAttack('prompt')">💬 Use Prompt Engineering</button>
                <button class="boss-attack-btn" onclick="bossAttack('rag')">📚 Use RAG</button>
                <button class="boss-attack-btn" onclick="bossAttack('agent')">🤖 Deploy Agent</button>
                <button class="boss-attack-btn" onclick="bossAttack('fine-tune')">⚡ Fine-tune Attack</button>
            </div>
        </div>
    `;
    
    openModal(content);
    
    // Store battle state globally
    window.currentBattle = { boss, bossHP, playerHP, battleActive, moduleId };
}

function bossAttack(attackType) {
    const battle = window.currentBattle;
    if (!battle || !battle.battleActive) return;
    
    const attacks = {
        'prompt': { damage: Math.floor(Math.random() * 25) + 15, messages: [
            'You craft the perfect prompt. The ${battle.boss.name} is confused!',
            'Chain-of-thought reasoning crushes the ${battle.boss.name}\'s defenses!',
            'Few-shot prompting shows the ${battle.boss.name} who\'s boss!'
        ]},
        'rag': { damage: Math.floor(Math.random() * 30) + 10, messages: [
            'You retrieve relevant context and ground the ${battle.boss.name}!',
            'Vector search finds the ${battle.boss.name}\'s weakness!',
            'RAG pipeline delivers a devastating blow!'
        ]},
        'agent': { damage: Math.floor(Math.random() * 35) + 5, messages: [
            'Your AI agent autonomously attacks the ${battle.boss.name}!',
            'Multi-agent swarm overwhelms the ${battle.boss.name}!',
            'Tool-using agent finds the ${battle.boss.name}\'s vulnerability!'
        ]},
        'fine-tune': { damage: Math.floor(Math.random() * 20) + 20, messages: [
            'You fine-tune your approach and strike with precision!',
            'Domain adaptation makes your attack super effective!',
            'Transfer learning powers up your attack!'
        ]}
    };
    
    const attack = attacks[attackType];
    const damage = attack.damage;
    const message = attack.messages[Math.floor(Math.random() * attack.messages.length)];
    
    battle.bossHP -= damage;
    if (battle.bossHP < 0) battle.bossHP = 0;
    
    // Boss counter-attack
    const bossDamage = Math.floor(Math.random() * 15) + 5;
    battle.playerHP -= bossDamage;
    if (battle.playerHP < 0) battle.playerHP = 0;
    
    // Update UI
    document.getElementById('boss-hp-fill').style.width = (battle.bossHP / battle.boss.hp * 100) + '%';
    document.getElementById('boss-hp-text').textContent = `${battle.bossHP}/${battle.boss.hp}`;
    document.getElementById('player-hp-fill').style.width = (battle.playerHP / 100 * 100) + '%';
    document.getElementById('player-hp-text').textContent = `${battle.playerHP}/100`;
    
    const log = document.getElementById('battle-log');
    
    if (battle.bossHP <= 0) {
        battle.battleActive = false;
        log.innerHTML = `🎉 VICTORY! You defeated the ${battle.boss.name}! +250 XP`;
        addXP(250);
        unlockAchievement('boss-slayer');
        triggerConfetti();
        showNotification(`⚔️ Defeated ${battle.boss.name}!`, '+250 XP', 'achievement');
        
        // Add a "Claim Reward" button
        const claimBtn = document.createElement('button');
        claimBtn.className = 'boss-attack-btn';
        claimBtn.textContent = '🎁 Claim Reward';
        claimBtn.onclick = closeModal;
        log.parentElement.appendChild(claimBtn);
    } else if (battle.playerHP <= 0) {
        battle.battleActive = false;
        log.innerHTML = `😵 You've been defeated! The ${battle.boss.name} is too strong. Try again when you've leveled up!`;
    } else {
        log.innerHTML = `💥 ${message.replace(/\$\{battle\.boss\.name\}/g, battle.boss.name)}\n🤕 The ${battle.boss.name} counter-attacks for ${bossDamage} damage!`;
    }
}

// ============================================
// XP & LEVEL SYSTEM
// ============================================
function addXP(amount) {
    state.xp += amount;
    
    // Check level up
    const xpForNextLevel = state.level * 100;
    if (state.xp >= xpForNextLevel) {
        state.xp -= xpForNextLevel;
        state.level++;
        
        // Show level up
        showLevelUp();
        
        // Check level achievements
        if (state.level >= 10) unlockAchievement('level-10');
        if (state.level >= 25) unlockAchievement('level-25');
        if (state.level >= 50) unlockAchievement('level-50');
        if (state.level >= 100) unlockAchievement('level-100');
        
        // Unlock skills based on level
        if (state.level >= 3) unlockSkill('prompting');
        if (state.level >= 5) unlockSkill('product-sense');
        if (state.level >= 8) unlockSkill('technical');
        if (state.level >= 12) unlockSkill('agents');
        if (state.level >= 15) unlockSkill('data');
        if (state.level >= 20) unlockSkill('strategy');
        if (state.level >= 25) unlockSkill('design');
        if (state.level >= 30) unlockSkill('building');
        if (state.level >= 40) unlockSkill('leadership');
    }
    
    // Check XP achievements
    if (state.xp >= 500) unlockAchievement('xp-500');
    if (state.xp >= 1000) unlockAchievement('xp-1000');
    if (state.xp >= 5000) unlockAchievement('xp-5000');
    
    updateUI();
}

function showLevelUp() {
    const popup = document.getElementById('xp-popup');
    popup.innerHTML = `
        <div class="xp-popup-content">
            <div class="xp-popup-icon">🎉</div>
            <div class="xp-popup-text">LEVEL UP!</div>
            <div class="xp-popup-sub">You're now Level ${state.level} PM</div>
        </div>
    `;
    popup.classList.add('show');
    triggerConfetti();
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 2000);
}

function updateUI() {
    // Update XP bar
    const xpForNext = state.level * 100;
    const xpPercent = (state.xp / xpForNext) * 100;
    document.getElementById('xp-fill').style.width = Math.min(100, xpPercent) + '%';
    document.getElementById('current-xp').textContent = state.xp;
    document.getElementById('xp-to-next').textContent = xpForNext;
    
    // Update stats
    document.getElementById('lessons-completed').textContent = state.lessonsCompleted;
    document.getElementById('total-xp').textContent = state.xp;
    document.getElementById('achievements-count').textContent = state.achievements.length;
    document.getElementById('streak-display-count').textContent = state.streak;
    document.getElementById('streak-count').textContent = state.streak;
    
    // Update profile
    const titles = ['AI Apprentice', 'Prompt Padawan', 'LLM Learner', 'AI Explorer', 'Model Master', 'Agent Architect', 'AI Strategist', 'Product Wizard', 'AI Legend', 'AI God'];
    const titleIndex = Math.min(Math.floor(state.level / 10), titles.length - 1);
    document.querySelector('.profile-title').textContent = `Level ${state.level} ${titles[titleIndex]}`;
    
    // Update journey path
    const pathProgress = document.getElementById('path-progress');
    if (pathProgress) {
        const progressPercent = Math.min(100, (state.level / 100) * 100);
        pathProgress.style.height = progressPercent + '%';
    }
}

// ============================================
// ACHIEVEMENTS
// ============================================
function unlockAchievement(achievementId) {
    if (state.achievements.includes(achievementId)) return;
    
    state.achievements.push(achievementId);
    const achievement = achievementsData.find(a => a.id === achievementId);
    if (achievement) {
        addXP(achievement.xp);
        showNotification(`🏆 Achievement: ${achievement.name}`, `+${achievement.xp} XP`, 'achievement');
        renderAchievements();
    }
}

// ============================================
// SKILLS
// ============================================
function unlockSkill(skillId) {
    const skill = skillsData.find(s => s.id === skillId);
    if (skill && !skill.unlocked) {
        skill.unlocked = true;
        skill.level = 1;
        renderSkills();
        showNotification(`⚡ New Skill Unlocked: ${skill.name}`, 'Level 1', 'achievement');
    }
}

function upgradeSkill(skillId) {
    const skill = skillsData.find(s => s.id === skillId);
    if (!skill || !skill.unlocked || skill.level >= skill.maxLevel) return;
    
    const cost = skill.level * 50;
    if (state.xp >= cost) {
        state.xp -= cost;
        skill.level++;
        renderSkills();
        updateUI();
        showNotification(`⚡ ${skill.name} upgraded to Level ${skill.level}!`, `-${cost} XP`, 'xp');
    } else {
        showNotification('Not enough XP!', `Need ${cost} XP`, 'error');
    }
}

// ============================================
// NOTIFICATIONS
// ============================================
function showNotification(title, message, type = 'default') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = { xp: '⭐', achievement: '🏆', error: '⚠️', default: '📢' };
    
    notification.innerHTML = `
        <span class="notification-icon">${icons[type] || icons.default}</span>
        <div>
            <div style="font-weight:600;font-size:0.9rem">${title}</div>
            <div style="font-size:0.8rem;color:var(--text-secondary)">${message}</div>
        </div>
        ${type === 'xp' ? `<span class="notification-xp">${message}</span>` : ''}
    `;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// CONFETTI
// ============================================
function triggerConfetti() {
    const colors = ['#8b5cf6', '#3b82f6', '#06b6d4', '#ec4899', '#f97316', '#22c55e', '#eab308'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// ============================================
// MODAL SYSTEM
// ============================================
function openModal(content) {
    const overlay = document.getElementById('modal-overlay');
    const body = document.getElementById('modal-body');
    body.innerHTML = content;
    overlay.classList.add('open');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
}

// ============================================
// CHAT SYSTEM
// ============================================
function toggleChat() {
    const chat = document.getElementById('ai-chat');
    state.chatOpen = !state.chatOpen;
    chat.classList.toggle('collapsed', !state.chatOpen);
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;
    
    const messages = document.getElementById('chat-messages');
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerHTML = `<div class="msg-content">${message}</div>`;
    messages.appendChild(userMsg);
    
    // Generate AI response
    const response = generateMentorResponse(message);
    
    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai';
        aiMsg.innerHTML = `<div class="msg-content">${response}</div>`;
        messages.appendChild(aiMsg);
        messages.scrollTop = messages.scrollHeight;
    }, 500 + Math.random() * 1000);
    
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
}

function generateMentorResponse(message) {
    const lower = message.toLowerCase();
    
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        return mentorResponses.hello;
    } else if (lower.includes('ai') && (lower.includes('what') || lower.includes('explain'))) {
        return mentorResponses.ai;
    } else if (lower.includes('prompt')) {
        return mentorResponses.prompt;
    } else if (lower.includes('roadmap') || lower.includes('plan')) {
        return mentorResponses.roadmap;
    } else if (lower.includes('career') || lower.includes('job') || lower.includes('interview')) {
        return mentorResponses.career;
    } else if (lower.includes('learn') || lower.includes('study') || lower.includes('start')) {
        return mentorResponses.learn;
    } else if (lower.includes('rag') || lower.includes('vector') || lower.includes('embedding')) {
        return "RAG is like giving your AI a textbook to reference before answering. Vector databases store meaning, not just words. It's how AI gets context without memorizing everything!";
    } else if (lower.includes('agent')) {
        return "AI agents are autonomous systems that can perceive, reason, and act. Think of them as digital employees who never sleep and don't complain about standup meetings.";
    } else if (lower.includes('hallucinat')) {
        return "Hallucinations are when AI confidently says something wrong. It's like that one PM who always sounds sure but hasn't read the docs. Mitigation: RAG, prompt engineering, and human-in-the-loop.";
    } else if (lower.includes('fine-tun') || lower.includes('training')) {
        return "Fine-tuning is taking a pre-trained model and teaching it your specific domain. Like taking a generalist PM and making them an AI expert through specialized training.";
    } else if (lower.includes('model') && (lower.includes('open') || lower.includes('closed'))) {
        return "Open-source models (like Llama) are free but need more work. Closed models (like GPT-4) are powerful but cost money. Choose based on your use case, budget, and need for control.";
    } else if (lower.includes('joke') || lower.includes('funny') || lower.includes('meme')) {
        const jokes = [
            "Why did the AI PM cross the road? To optimize the chicken's conversion funnel. 🐔",
            "How many AI PMs does it take to change a light bulb? None. They'll just prompt-engineer the darkness away. 💡",
            "An AI PM walks into a bar. The bartender says 'We don't serve your kind here.' The AI PM says 'That's fine, I'll just generate my own bar.' 🤖",
            "What's an AI PM's favorite song? 'Should I Stay or Should I Go' - because they can't decide on features. 🎵"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    } else {
        return mentorResponses.default;
    }
}

// ============================================
// PLAYGROUND FUNCTIONS
// ============================================
function openPromptPlayground() {
    const content = `
        <div style="margin-bottom:1.5rem">
            <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:0.5rem">💬 Prompt Battle Arena</h2>
            <p style="color:var(--text-secondary)">Write a prompt and see how it performs. Battle against bad prompts!</p>
        </div>
        <div class="prompt-playground">
            <div class="prompt-editor">
                <label>Your Prompt</label>
                <textarea id="prompt-input" placeholder="Write your prompt here...">Write a product description for an AI-powered coffee maker that learns your preferences.</textarea>
                <button onclick="evaluatePrompt()" style="padding:0.75rem 1.5rem;background:var(--gradient-primary);color:white;border-radius:12px;font-weight:600">
                    🚀 Evaluate Prompt
                </button>
            </div>
            <div>
                <label style="font-size:0.85rem;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:0.5rem">AI Response</label>
                <div class="prompt-output" id="prompt-output">
                    Your evaluated prompt will appear here. Try being specific, providing context, and using examples!
                </div>
                <div id="prompt-score" style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted)"></div>
            </div>
        </div>
    `;
    openModal(content);
}

function evaluatePrompt() {
    const input = document.getElementById('prompt-input');
    const output = document.getElementById('prompt-output');
    const score = document.getElementById('prompt-score');
    
    const prompt = input.value;
    const length = prompt.length;
    const hasContext = prompt.includes('context') || prompt.includes('audience') || prompt.includes('user');
    const hasSpecific = prompt.includes('example') || prompt.includes('format') || prompt.includes('specific');
    const hasStructure = prompt.includes('step') || prompt.includes('first') || prompt.includes('then') || prompt.includes('finally');
    
    let promptScore = 0;
    if (length > 50) promptScore += 20;
    if (length > 100) promptScore += 10;
    if (hasContext) promptScore += 30;
    if (hasSpecific) promptScore += 25;
    if (hasStructure) promptScore += 15;
    
    const responses = [
        "The AI analyzes your prompt and generates a thoughtful response based on the context provided. It considers the specific requirements and structures its output accordingly.",
        "Based on your prompt, here's what the AI would generate:\n\n1. First, it identifies the key requirements\n2. Then it applies relevant context\n3. Finally, it formats the response appropriately\n\nThis approach ensures high-quality, relevant outputs."
    ];
    
    output.textContent = responses[Math.floor(Math.random() * responses.length)];
    
    if (promptScore >= 80) {
        score.innerHTML = `⭐ Prompt Score: ${promptScore}/100 - Excellent! You're a prompt engineering wizard!`;
        score.style.color = 'var(--neon-green)';
        addXP(25);
        showNotification('✨ Excellent Prompt!', '+25 XP', 'xp');
    } else if (promptScore >= 50) {
        score.innerHTML = `⭐ Prompt Score: ${promptScore}/100 - Good! Try adding more context and specific examples.`;
        score.style.color = 'var(--neon-yellow)';
        addXP(10);
    } else {
        score.innerHTML = `⭐ Prompt Score: ${promptScore}/100 - Needs work. Be more specific and provide context!`;
        score.style.color = '#ef4444';
    }
}

function openQuiz() {
    const question = quizData[Math.floor(Math.random() * quizData.length)];
    showQuizQuestion(question);
}

function showQuizQuestion(question) {
    const content = `
        <div class="quiz-question">
            <h3>🧠 AI Knowledge Quiz</h3>
            <p style="color:var(--text-secondary);margin-bottom:1rem">Test your AI PM knowledge!</p>
            <p style="font-size:1.1rem;font-weight:600;margin-bottom:1rem">${question.question}</p>
            <div class="quiz-options" id="quiz-options">
                ${question.options.map((opt, i) => `
                    <button class="quiz-option" onclick="answerQuiz(${i}, ${question.correct})" data-index="${i}">
                        ${opt}
                    </button>
                `).join('')}
            </div>
            <div id="quiz-feedback" style="margin-top:1rem"></div>
        </div>
    `;
    openModal(content);
    window.currentQuiz = question;
}

function answerQuiz(selected, correct) {
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');
    const question = window.currentQuiz;
    
    options.forEach(opt => opt.classList.add('disabled'));
    
    if (selected === correct) {
        options[selected].classList.add('correct');
        feedback.innerHTML = `
            <div style="padding:1rem;background:rgba(34,197,94,0.2);border-radius:12px;border:1px solid rgba(34,197,94,0.3)">
                <p style="color:var(--neon-green);font-weight:600;margin-bottom:0.5rem">✅ Correct! +50 XP</p>
                <p style="color:var(--text-secondary);font-size:0.85rem">${question.explanation}</p>
            </div>
        `;
        addXP(50);
        unlockAchievement('quiz-master');
        triggerConfetti();
    } else {
        options[selected].classList.add('wrong');
        options[correct].classList.add('correct');
        feedback.innerHTML = `
            <div style="padding:1rem;background:rgba(239,68,68,0.2);border-radius:12px;border:1px solid rgba(239,68,68,0.3)">
                <p style="color:#ef4444;font-weight:600;margin-bottom:0.5rem">❌ Not quite! +10 XP for trying</p>
                <p style="color:var(--text-secondary);font-size:0.85rem">${question.explanation}</p>
            </div>
        `;
        addXP(10);
    }
}

function openArchitectureBuilder() {
    const content = `
        <div style="margin-bottom:1.5rem">
            <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:0.5rem">🏗️ AI Architecture Builder</h2>
            <p style="color:var(--text-secondary)">Drag and drop components to build your AI system architecture!</p>
        </div>
        <div style="display:grid;grid-template-columns:200px 1fr;gap:1rem;min-height:300px">
            <div style="background:var(--glass-bg);border-radius:12px;padding:1rem;border:1px solid var(--glass-border)">
                <h4 style="font-size:0.85rem;margin-bottom:0.75rem;color:var(--neon-cyan)">Components</h4>
                <div style="display:flex;flex-direction:column;gap:0.5rem">
                    <div draggable="true" style="padding:0.5rem;background:var(--bg-card);border-radius:8px;font-size:0.8rem;cursor:grab;text-align:center">📥 User Input</div>
                    <div draggable="true" style="padding:0.5rem;background:var(--bg-card);border-radius:8px;font-size:0.8rem;cursor:grab;text-align:center">🧠 LLM</div>
                    <div draggable="true" style="padding:0.5rem;background:var(--bg-card);border-radius:8px;font-size:0.8rem;cursor:grab;text-align:center">📚 Vector DB</div>
                    <div draggable="true" style="padding:0.5rem;background:var(--bg-card);border-radius:8px;font-size:0.8rem;cursor:grab;text-align:center">🔧 Tools/APIs</div>
                    <div draggable="true" style="padding:0.5rem;background:var(--bg-card);border-radius:8px;font-size:0.8rem;cursor:grab;text-align:center">💾 Memory</div>
                    <div draggable="true" style="padding:0.5rem;background:var(--bg-card);border-radius:8px;font-size:0.8rem;cursor:grab;text-align:center">📤 Output</div>
                </div>
            </div>
            <div style="background:var(--glass-bg);border-radius:12px;border:2px dashed var(--glass-border);display:flex;align-items:center;justify-content:center;min-height:300px">
                <p style="color:var(--text-muted);font-size:0.9rem">🎯 Drag components here to build your architecture</p>
            </div>
        </div>
        <div style="margin-top:1rem;text-align:center">
            <button onclick="addXP(50);showNotification('🏗️ Architecture Built!','+50 XP','xp');closeModal()" style="padding:0.75rem 2rem;background:var(--gradient-primary);color:white;border-radius:12px;font-weight:600">
                ✅ Deploy Architecture (+50 XP)
            </button>
        </div>
    `;
    openModal(content);
}

function openAIChat() {
    toggleChat();
    if (!state.chatOpen) {
        toggleChat();
    }
}

// ============================================
// STREAK SYSTEM
// ============================================
function startStreakCheck() {
    const lastVisit = localStorage.getItem('ai-pm-last-visit');
    const today = new Date().toDateString();
    
    if (lastVisit !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastVisit === yesterday.toDateString()) {
            state.streak++;
            if (state.streak === 3) unlockAchievement('streak-3');
            if (state.streak === 7) unlockAchievement('streak-7');
        } else if (lastVisit !== today) {
            state.streak = 1;
        }
        
        localStorage.setItem('ai-pm-last-visit', today);
        localStorage.setItem('ai-pm-streak', state.streak);
        
        if (state.streak > 1) {
            showNotification(`🔥 ${state.streak} Day Streak!`, 'Keep the momentum going!', 'achievement');
            addXP(state.streak * 10);
        }
    } else {
        state.streak = parseInt(localStorage.getItem('ai-pm-streak')) || 0;
    }
    
    updateUI();
}

// ============================================
// NEWS TICKER
// ============================================
function startNewsTicker() {
    const newsItems = [
        "GPT-5 just dropped. Your move, PM.",
        "Anthropic releases Claude 4 with 200K context window",
        "OpenAI launches new agent framework",
        "Google Gemini gets real-time capabilities",
        "Meta releases open-source Llama 4",
        "AI PM salaries up 40% YoY",
        "New RAG technique improves accuracy by 60%",
        "Vector databases becoming standard infra",
        "AI agents market projected to reach $50B",
        "Prompt engineering is the new SQL"
    ];
    
    let index = 0;
    setInterval(() => {
        const ticker = document.querySelector('.ticker-text');
        if (ticker) {
            index = (index + 1) % newsItems.length;
            ticker.textContent = newsItems[index];
            ticker.style.animation = 'none';
            setTimeout(() => {
                ticker.style.animation = 'tickerScroll 10s linear infinite';
            }, 10);
        }
    }, 10000);
}

// ============================================
// EASTER EGGS & FUN
// ============================================
function deployChaos() {
    unlockAchievement('chaos-deployed');
    triggerConfetti();
    
    const chaosMessages = [
        "💥 CHAOS DEPLOYED! Stakeholders are now aligned (through fear).",
        "🔥 Your roadmap now has 47 new features. Good luck.",
        "🤖 AI agents have taken over your calendar. Meetings for days.",
        "⚡ CEO changed priorities mid-deploy. Classic.",
        "🎉 All Jira tickets have been resolved by closing as 'won't fix'.",
        "📊 Your burn rate just increased by 300%. Investors are thrilled.",
        "🚀 Deployed to production on Friday at 4:59 PM. You monster.",
        "💀 The AI has learned sarcasm. You've created a monster."
    ];
    
    const message = chaosMessages[Math.floor(Math.random() * chaosMessages.length)];
    showNotification('💥 Chaos Deployed!', message, 'achievement');
    
    // Easter egg animation
    const egg = document.createElement('div');
    egg.className = 'easter-egg';
    egg.textContent = '💥';
    egg.style.left = Math.random() * 80 + 10 + '%';
    egg.style.top = Math.random() * 80 + 10 + '%';
    document.body.appendChild(egg);
    setTimeout(() => egg.remove(), 2000);
}

function startJourney() {
    showNotification('🚀 Journey Started!', 'Welcome to AI PM Odyssey!', 'achievement');
    addXP(100);
    unlockAchievement('first-lesson');
    triggerConfetti();
}

// ============================================
// FILTER SYSTEM
// ============================================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        const cards = document.querySelectorAll('.module-card');
        
        cards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const level = card.querySelector('.module-level');
                if (level && level.textContent.toLowerCase() === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Ctrl+K to toggle chat
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleChat();
    }
    
    // Number keys for navigation
    if (e.key >= '1' && e.key <= '6') {
        const sections = ['home', 'modules', 'skills', 'playground', 'achievements', 'leaderboard'];
        const index = parseInt(e.key) - 1;
        if (sections[index]) {
            switchSection(sections[index]);
        }
    }
});

// ============================================
// MOBILE MENU
// ============================================
// Add mobile menu button
const mobileBtn = document.createElement('button');
mobileBtn.className = 'mobile-menu-btn';
mobileBtn.innerHTML = '☰';
mobileBtn.onclick = () => {
    document.getElementById('sidebar').classList.toggle('open');
};
document.body.appendChild(mobileBtn);

// Close sidebar on mobile when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {
        const sidebar = document.getElementById('sidebar');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        if (!sidebar.contains(e.target) && !mobileBtn.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    }
});

// ============================================
// SAVE STATE
// ============================================
function saveState() {
    const saveData = {
        xp: state.xp,
        level: state.level,
        streak: state.streak,
        lessonsCompleted: state.lessonsCompleted,
        achievements: state.achievements,
        modules: state.modules,
        skills: skillsData.map(s => ({ id: s.id, level: s.level, unlocked: s.unlocked }))
    };
    localStorage.setItem('ai-pm-odyssey-save', JSON.stringify(saveData));
}

// Load saved state
function loadState() {
    const saved = localStorage.getItem('ai-pm-odyssey-save');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            state.xp = data.xp || 0;
            state.level = data.level || 1;
            state.streak = data.streak || 0;
            state.lessonsCompleted = data.lessonsCompleted || 0;
            state.achievements = data.achievements || [];
            state.modules = data.modules || {};
            
            if (data.skills) {
                data.skills.forEach(savedSkill => {
                    const skill = skillsData.find(s => s.id === savedSkill.id);
                    if (skill) {
                        skill.level = savedSkill.level;
                        skill.unlocked = savedSkill.unlocked;
                    }
                });
            }
        } catch (e) {
            console.log('No saved state found');
        }
    }
}

// Auto-save periodically
setInterval(saveState, 30000);

// Save on page unload
window.addEventListener('beforeunload', saveState);

// Load state on init
loadState();

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c🧠 AI PM Odyssey', 'font-size: 24px; font-weight: bold; color: #8b5cf6;');
console.log('%cFrom Spreadsheet PM → AI Product Wizard', 'font-size: 14px; color: #06b6d4;');
console.log('%c🔍 Try these commands:', 'font-size: 12px; color: #a0a0c0;');
console.log('%c  - startJourney() - Begin your AI PM journey', 'font-size: 11px;');
console.log('%c  - deployChaos() - Deploy chaos (you know you want to)', 'font-size: 11px;');
console.log('%c  - addXP(1000) - Cheat code: add XP', 'font-size: 11px;');
console.log('%c  - triggerConfetti() - Party time!', 'font-size: 11px;');
console.log('%c  - state - View your current state', 'font-size: 11px;');


