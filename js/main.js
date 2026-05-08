/* ============================================
   MAIN APPLICATION ENTRY POINT
   ============================================ */

import { state } from './state.js';
import { modulesData, achievementsData, skillsData, leaderboardData, quizData, mentorResponses } from './data.js';
import { initializeAllComponents } from './components/loader.js';
import {
    renderModules,
    renderAchievements,
    renderLeaderboard,
    drawSkillTree,
    openModule,
    renderModulesPreview,
    openPromptPlayground,
    evaluatePrompt,
    openQuiz,
    openArchitectureBuilder,
    openAIChat
} from './modules/ui-functions.js';

// Re-export for global access (for debugging)
window.state = state;
window.modulesData = modulesData;
window.achievementsData = achievementsData;
window.skillsData = skillsData;
window.leaderboardData = leaderboardData;
window.quizData = quizData;
window.mentorResponses = mentorResponses;

// Make UI functions available globally
window.renderModules = renderModules;
window.renderAchievements = renderAchievements;
window.renderLeaderboard = renderLeaderboard;
window.drawSkillTree = drawSkillTree;
window.openModule = openModule;
window.renderModulesPreview = renderModulesPreview;
window.openPromptPlayground = openPromptPlayground;
window.evaluatePrompt = evaluatePrompt;
window.openQuiz = openQuiz;
window.openArchitectureBuilder = openArchitectureBuilder;
window.openAIChat = openAIChat;

// Initialize application
document.addEventListener('DOMContentLoaded', async () => {
    console.log('AI PM Odyssey - Modular Application Initialized');
    
    // Load saved state
    loadState();
    
    // Initialize components (sidebar and default section)
    await initializeAllComponents();
    
    // Start loading screen animation
    startLoadingAnimation();
    
    // Initialize particles
    initParticles();
    
    // Set up global event listeners
    setupEventListeners();
    
    // Update UI with current state
    updateUI();
    
    // Hide loading screen after everything is ready
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const app = document.getElementById('app');
        if (loadingScreen && app) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                app.style.display = 'flex';
            }, 500);
        }
    }, 2000);
});

// Load state from localStorage
function loadState() {
    const saved = localStorage.getItem('ai-pm-odyssey-save');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            Object.assign(state, data);
            console.log('State loaded from localStorage');
        } catch (e) {
            console.log('No saved state found');
        }
    }
}

// Start loading animation
function startLoadingAnimation() {
    const loadingMessages = [
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
    ];
    
    let index = 0;
    const loaderText = document.getElementById('loader-text');
    const loaderProgress = document.querySelector('.loader-progress');
    
    if (loaderText && loaderProgress) {
        const interval = setInterval(() => {
            loaderText.textContent = loadingMessages[index];
            loaderProgress.style.width = `${((index + 1) / loadingMessages.length) * 100}%`;
            index = (index + 1) % loadingMessages.length;
        }, 150);
        
        // Clear interval after app loads
        setTimeout(() => clearInterval(interval), 2000);
    }
}

// Initialize particles
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            color: `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.1})`
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Draw connections
            particles.forEach(other => {
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Set up global event listeners
function setupEventListeners() {
    // Chat toggle
    const chatHeader = document.querySelector('.chat-header');
    if (chatHeader) {
        chatHeader.addEventListener('click', toggleChat);
    }
    
    // Send message button
    const sendButton = document.getElementById('send-button');
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    
    // Chat input enter key
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Module filter buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            const filter = e.target.dataset.filter;
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            // Filter modules would be implemented here
        }
    });
}

// Update UI with current state
function updateUI() {
    // Update XP bar
    const xpBar = document.querySelector('.xp-progress');
    const xpText = document.querySelector('.xp-text');
    const levelText = document.querySelector('.level-text');
    
    if (xpBar && xpText && levelText) {
        const xpPercent = (state.xp % 1000) / 10;
        xpBar.style.width = `${xpPercent}%`;
        xpText.textContent = `${state.xp} XP`;
        levelText.textContent = `Level ${state.level}`;
    }
    
    // Update streak
    const streakElement = document.querySelector('.streak-count');
    if (streakElement) {
        streakElement.textContent = state.streak;
    }
    
    // Update lessons completed
    const lessonsElement = document.querySelector('.lessons-count');
    if (lessonsElement) {
        lessonsElement.textContent = state.lessonsCompleted;
    }
}

// Chat functions
function toggleChat() {
    const chatWidget = document.getElementById('ai-chat');
    if (chatWidget) {
        chatWidget.classList.toggle('collapsed');
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');
    
    if (!input || !chatBody) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = `
        <div class="chat-avatar">👤</div>
        <div class="chat-bubble">${message}</div>
    `;
    chatBody.appendChild(userMsg);
    
    input.value = '';
    
    // Generate AI response
    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'chat-message ai';
        
        const responses = [
            "Great question! As an AI PM, you need to balance technical feasibility with user value.",
            "Remember: AI is a tool, not a solution. Start with the problem, not the technology.",
            "That's a common challenge. Have you considered conducting user research first?",
            "Interesting point! Let me share a framework that might help...",
            "Based on your question, I'd recommend starting with a small pilot to validate assumptions."
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        aiMsg.innerHTML = `
            <div class="chat-avatar">🤖</div>
            <div class="chat-bubble">${response}</div>
        `;
        chatBody.appendChild(aiMsg);
        
        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

// Auto-save periodically
setInterval(() => {
    localStorage.setItem('ai-pm-odyssey-save', JSON.stringify(state));
    console.log('State auto-saved');
}, 30000);

// Save on page unload
window.addEventListener('beforeunload', () => {
    localStorage.setItem('ai-pm-odyssey-save', JSON.stringify(state));
});

// Console easter egg
console.log('%c🧠 AI PM Odyssey', 'font-size: 24px; font-weight: bold; color: #8b5cf6;');
console.log('%cFrom Spreadsheet PM → AI Product Wizard', 'font-size: 14px; color: #06b6d4;');
console.log('%c🔍 Try these commands:', 'font-size: 12px; color: #a0a0c0;');
console.log('%c  - startJourney() - Begin your AI PM journey', 'font-size: 11px;');
console.log('%c  - deployChaos() - Deploy chaos (you know you want to)', 'font-size: 11px;');
console.log('%c  - addXP(1000) - Cheat code: add XP', 'font-size: 11px;');
console.log('%c  - triggerConfetti() - Party time!', 'font-size: 11px;');
console.log('%c  - state - View your current state', 'font-size: 11px;');

// Export functions for global use
window.toggleChat = toggleChat;
window.sendMessage = sendMessage;
window.updateUI = updateUI;