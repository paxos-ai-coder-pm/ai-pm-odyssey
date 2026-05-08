/* ============================================
   UI FUNCTIONS MODULE
   Exports essential UI rendering functions from original script.js
   ============================================ */

import { state } from '../state.js';
import { modulesData, achievementsData, skillsData, leaderboardData } from '../data.js';

/**
 * Render all modules in the modules grid
 */
export function renderModules() {
    const container = document.getElementById('modules-full');
    if (!container) return;
    
    container.innerHTML = modulesData.map(module => createModuleCard(module)).join('');
}

/**
 * Render modules preview (first 3 modules)
 */
export function renderModulesPreview() {
    const container = document.getElementById('modules-preview');
    if (!container) return;
    
    container.innerHTML = modulesData.slice(0, 3).map(module => createModuleCard(module)).join('');
}

/**
 * Create HTML for a module card
 */
export function createModuleCard(module) {
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

/**
 * Render achievements in the achievements grid
 */
export function renderAchievements() {
    const container = document.getElementById('achievements-grid');
    if (!container) return;
    
    container.innerHTML = achievementsData.map(ach => {
        const unlocked = state.achievements.includes(ach.id);
        return `
            <div class="achievement-card ${unlocked ? '' : 'locked'}">
                <div class="achievement-icon">${ach.icon}</div>
                <div class="achievement-info">
                    <h4>${ach.title}</h4>
                    <p>${ach.description}</p>
                </div>
                <div class="achievement-xp">+${ach.xp} XP</div>
            </div>
        `;
    }).join('');
}

/**
 * Render leaderboard
 */
export function renderLeaderboard() {
    const container = document.getElementById('leaderboard-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="leaderboard-header">
            <span>Rank</span>
            <span>PM</span>
            <span>XP</span>
            <span>Level</span>
        </div>
        ${leaderboardData.map((user, index) => `
            <div class="leaderboard-row ${index < 3 ? 'top' + (index + 1) : ''}">
                <span class="rank">${index + 1}</span>
                <span class="user">
                    <span class="avatar">${user.avatar}</span>
                    <span class="name">${user.name}</span>
                    <span class="title">${user.title}</span>
                </span>
                <span class="xp">${user.xp.toLocaleString()} XP</span>
                <span class="level">${user.level}</span>
            </div>
        `).join('')}
    `;
}

/**
 * Draw skill tree
 */
export function drawSkillTree() {
    const canvas = document.getElementById('skill-tree-canvas');
    const nodesContainer = document.getElementById('skill-nodes');
    
    if (!canvas || !nodesContainer) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Skill nodes positions
    const nodes = [
        { id: 'prompt-eng', x: canvas.width * 0.2, y: canvas.height * 0.3, unlocked: state.skills['prompt-eng']?.unlocked || false },
        { id: 'rag', x: canvas.width * 0.4, y: canvas.height * 0.2, unlocked: state.skills['rag']?.unlocked || false },
        { id: 'agents', x: canvas.width * 0.6, y: canvas.height * 0.3, unlocked: state.skills['agents']?.unlocked || false },
        { id: 'fine-tuning', x: canvas.width * 0.5, y: canvas.height * 0.5, unlocked: state.skills['fine-tuning']?.unlocked || false },
        { id: 'eval', x: canvas.width * 0.3, y: canvas.height * 0.6, unlocked: state.skills['eval']?.unlocked || false },
        { id: 'deployment', x: canvas.width * 0.7, y: canvas.height * 0.7, unlocked: state.skills['deployment']?.unlocked || false }
    ];
    
    // Draw connections
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
    ctx.lineWidth = 2;
    
    const connections = [
        [0, 1], [1, 2], [1, 3], [3, 4], [3, 5]
    ];
    
    connections.forEach(([from, to]) => {
        ctx.beginPath();
        ctx.moveTo(nodes[from].x, nodes[from].y);
        ctx.lineTo(nodes[to].x, nodes[to].y);
        ctx.stroke();
    });
    
    // Draw nodes on canvas
    nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = node.unlocked ? '#8b5cf6' : 'rgba(139, 92, 246, 0.2)';
        ctx.fill();
        ctx.strokeStyle = node.unlocked ? '#a78bfa' : 'rgba(139, 92, 246, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
    
    // Create skill nodes HTML
    nodesContainer.innerHTML = nodes.map(node => {
        const skill = skillsData.find(s => s.id === node.id);
        if (!skill) return '';
        
        return `
            <div class="skill-node ${node.unlocked ? 'unlocked' : 'locked'}" 
                 style="left:${node.x - 30}px; top:${node.y - 30}px;"
                 onclick="unlockSkill('${node.id}')">
                <div class="skill-icon">${skill.icon}</div>
                <div class="skill-name">${skill.name}</div>
            </div>
        `;
    }).join('');
}

/**
 * Open a module modal
 */
export function openModule(moduleId) {
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
        </div>
        <div style="background:var(--glass-bg);border-radius:1rem;padding:1.5rem;margin-bottom:2rem">
            <h3 style="font-size:1.2rem;font-weight:600;margin-bottom:1rem">Progress</h3>
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
                <div style="flex:1;height:10px;background:var(--border-color);border-radius:5px;overflow:hidden">
                    <div style="width:${progress}%;height:100%;background:${module.color};border-radius:5px"></div>
                </div>
                <span style="font-weight:600">${progress}%</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-secondary)">
                <span>${completed ? '✅ Completed' : 'In progress'}</span>
                <span>${module.lessons} lessons</span>
            </div>
        </div>
        <div style="display:flex;gap:1rem;justify-content:center">
            <button onclick="startLesson('${moduleId}')" style="padding:0.75rem 1.5rem;background:${module.color};color:white;border:none;border-radius:0.5rem;font-weight:600;cursor:pointer">
                ${completed ? 'Review' : 'Start Lesson'}
            </button>
            <button onclick="startBossBattle('${moduleId}')" style="padding:0.75rem 1.5rem;background:var(--danger);color:white;border:none;border-radius:0.5rem;font-weight:600;cursor:pointer">
                🐉 Boss Battle
            </button>
        </div>
    `;
    
    // Show modal (simplified)
    alert(`Opening module: ${module.title}\n\n${module.description}`);
}

/**
 * Open prompt playground modal
 */
export function openPromptPlayground() {
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
    // Simplified for now - just alert
    alert("Opening Prompt Playground - This would show a modal with prompt evaluation tools");
}

/**
 * Evaluate a prompt
 */
export function evaluatePrompt() {
    const input = document.getElementById('prompt-input');
    const output = document.getElementById('prompt-output');
    const score = document.getElementById('prompt-score');
    
    if (!input || !output || !score) {
        alert("Prompt playground not fully loaded. Please try again.");
        return;
    }
    
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
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    output.textContent = response;
    score.textContent = `Prompt Score: ${promptScore}/100 - ${promptScore >= 70 ? 'Great job!' : 'Keep practicing!'}`;
}

/**
 * Open quiz modal
 */
export function openQuiz() {
    const question = quizData[Math.floor(Math.random() * quizData.length)];
    const content = `
        <div style="text-align:center;margin-bottom:1.5rem">
            <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:0.5rem">🧪 AI Quiz</h2>
            <p style="color:var(--text-secondary)">Test your AI PM knowledge!</p>
        </div>
        <div class="quiz-question">
            <h3 style="font-size:1.2rem;font-weight:600;margin-bottom:1rem">${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((opt, i) => `
                    <button onclick="answerQuiz(${i}, ${question.correct})"
                            style="width:100%;padding:1rem;text-align:left;border:1px solid var(--border-color);border-radius:12px;margin-bottom:0.5rem;background:var(--glass-bg);cursor:pointer">
                        ${opt}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    // Simplified for now
    alert(`Quiz: ${question.question}\n\nOptions:\n${question.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}`);
}

/**
 * Open architecture builder
 */
export function openArchitectureBuilder() {
    const content = `
        <div style="margin-bottom:1.5rem">
            <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:0.5rem">🏗️ Architecture Builder</h2>
            <p style="color:var(--text-secondary)">Drag & drop your way to AI system design glory.</p>
        </div>
        <div style="background:var(--glass-bg);border-radius:1rem;padding:1.5rem;text-align:center;min-height:200px;display:flex;align-items:center;justify-content:center">
            <div style="color:var(--text-muted)">
                <div style="font-size:3rem;margin-bottom:1rem">🏗️</div>
                <p>Drag components from the sidebar to build your AI architecture.</p>
            </div>
        </div>
        <div style="display:flex;gap:1rem;margin-top:1.5rem">
            <button style="flex:1;padding:0.75rem;background:var(--gradient-primary);color:white;border-radius:12px;font-weight:600">
                Save Design
            </button>
            <button style="flex:1;padding:0.75rem;background:var(--glass-bg);border:1px solid var(--border-color);border-radius:12px;font-weight:600">
                Reset
            </button>
        </div>
    `;
    alert("Opening Architecture Builder - This would show a drag-and-drop interface for building AI systems");
}

/**
 * Open AI chat (just toggle chat)
 */
export function openAIChat() {
    toggleChat();
}

// Make functions available globally
window.renderModules = renderModules;
window.renderModulesPreview = renderModulesPreview;
window.renderAchievements = renderAchievements;
window.renderLeaderboard = renderLeaderboard;
window.drawSkillTree = drawSkillTree;
window.openModule = openModule;
window.openPromptPlayground = openPromptPlayground;
window.evaluatePrompt = evaluatePrompt;
window.openQuiz = openQuiz;
window.openArchitectureBuilder = openArchitectureBuilder;
window.openAIChat = openAIChat;