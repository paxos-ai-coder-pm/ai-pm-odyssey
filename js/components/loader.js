/* ============================================
   COMPONENT LOADER MODULE
   ============================================ */

// Component paths mapping
const componentPaths = {
    'home': 'components/home-section.html',
    'modules': 'components/modules-section.html',
    'skills': 'components/skills-section.html',
    'playground': 'components/playground-section.html',
    'achievements': 'components/achievements-section.html',
    'leaderboard': 'components/leaderboard-section.html'
};

// Global state for tracking loaded components
let loadedComponents = new Set();

/**
 * Load a component into a container
 * @param {string} containerId - ID of the container element
 * @param {string} componentPath - Path to the component HTML file
 * @returns {Promise<void>}
 */
async function loadComponent(containerId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const html = await response.text();
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`Container #${containerId} not found`);
            return;
        }
        
        container.innerHTML = html;
        console.log(`Loaded component: ${componentPath}`);
        
        // Mark as loaded
        loadedComponents.add(componentPath);
        
        // Initialize any component-specific JavaScript
        initializeComponent(containerId, componentPath);
        
    } catch (error) {
        console.error(`Failed to load component ${componentPath}:`, error);
        // Fallback to error message
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ Component Failed to Load</h3>
                    <p>Could not load ${componentPath}. Please check your connection.</p>
                    <button onclick="location.reload()">Retry</button>
                </div>
            `;
        }
    }
}

/**
 * Load a section by ID
 * @param {string} sectionId - Section ID (home, modules, skills, etc.)
 * @returns {Promise<void>}
 */
async function loadSection(sectionId) {
    const componentPath = componentPaths[sectionId];
    if (!componentPath) {
        console.error(`No component path found for section: ${sectionId}`);
        return;
    }
    
    // Update navigation
    updateNavigation(sectionId);
    
    // Load the component
    await loadComponent('sections-container', componentPath);
    
    // Update state
    if (window.state) {
        window.state.currentSection = sectionId;
    }
    
    // Initialize section-specific functionality
    initializeSection(sectionId);
}

/**
 * Update navigation active state
 * @param {string} sectionId - Active section ID
 */
function updateNavigation(sectionId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.section === sectionId);
    });
}

/**
 * Initialize a component after loading
 * @param {string} containerId - Container ID
 * @param {string} componentPath - Component path
 */
function initializeComponent(containerId, componentPath) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Initialize event listeners for the loaded component
    const sectionId = Object.keys(componentPaths).find(
        key => componentPaths[key] === componentPath
    );
    
    if (sectionId) {
        initializeSection(sectionId);
    }
}

/**
 * Initialize section-specific functionality
 * @param {string} sectionId - Section ID
 */
function initializeSection(sectionId) {
    switch (sectionId) {
        case 'skills':
            // Initialize skill tree
            if (typeof window.drawSkillTree === 'function') {
                setTimeout(window.drawSkillTree, 100);
            }
            break;
        case 'modules':
            // Render modules
            if (typeof window.renderModules === 'function') {
                window.renderModules();
            }
            break;
        case 'achievements':
            // Render achievements
            if (typeof window.renderAchievements === 'function') {
                window.renderAchievements();
            }
            break;
        case 'leaderboard':
            // Render leaderboard
            if (typeof window.renderLeaderboard === 'function') {
                window.renderLeaderboard();
            }
            break;
        case 'playground':
            // Initialize playground event listeners
            initializePlaygroundEvents();
            break;
    }
}

/**
 * Initialize playground event listeners
 */
function initializePlaygroundEvents() {
    // Re-attach event listeners for playground cards
    document.querySelectorAll('.playground-card').forEach(card => {
        const onclick = card.getAttribute('onclick');
        if (onclick) {
            // Remove and re-add onclick to ensure it works
            card.removeAttribute('onclick');
            card.addEventListener('click', () => {
                eval(onclick);
            });
        }
    });
}

/**
 * Initialize navigation event listeners
 */
function initializeNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        // Remove existing listeners to prevent duplicates
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
        
        newItem.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = newItem.dataset.section;
            if (sectionId) {
                loadSection(sectionId);
            }
        });
    });
}

/**
 * Initialize all components
 */
async function initializeAllComponents() {
    console.log('Initializing AI PM Odyssey Components...');
    
    // Load sidebar
    await loadComponent('sidebar-container', 'components/sidebar.html');
    
    // Load default section (home)
    await loadSection('home');
    
    // Initialize navigation
    initializeNavigation();
    
    console.log('All components initialized');
}

// Export for module usage
export {
    loadComponent,
    loadSection,
    initializeNavigation,
    initializeAllComponents
};

// Make functions available globally for onclick handlers
window.loadComponent = loadComponent;
window.loadSection = loadSection;