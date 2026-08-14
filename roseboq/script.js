// State Machine Variables
const globalBody = document.getElementById('globalBody');
const particleCanvas = document.getElementById('particleCanvas');

// Scene Nodes
const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');
const scene3 = document.getElementById('scene3');
const scene4 = document.getElementById('scene4');

// Triggers
const roseTrigger = document.getElementById('roseTrigger');
const toStage3Btn = document.getElementById('toStage3Btn');
const toStage4Btn = document.getElementById('toStage4Btn');

// Active Particle Loop ID Tracker
let currentParticleInterval = null;

/**
 * Transition Controller
 */
function switchScene(currentScene, nextScene, targetBodyClass) {
    currentScene.classList.add('hidden');
    
    setTimeout(() => {
        // Clear old loops to prevent memory bloating
        clearInterval(currentParticleInterval);
        particleCanvas.innerHTML = '';
        
        // Advance physical classes
        globalBody.className = targetBodyClass;
        nextScene.classList.remove('hidden');
        
        // Fire up next customized environmental effects
        initiateSceneFX(targetBodyClass);
    }, 1000);
}

/**
 * FX Director Engine
 */
function initiateSceneFX(stageClass) {
    if (stageClass === 'stage-2') {
        // Generate continuous Purple Cosmic Petals
        currentParticleInterval = setInterval(spawnPurplePetal, 180);
    } else if (stageClass === 'stage-3' || stageClass === 'stage-4') {
        // Draw Massive Floating Deep Galaxy Space Starfield Matrix
        drawGalaxyStarfield(stageClass === 'stage-4' ? 180 : 100);
    }
}

/**
 * FX: Purple Cosmic Floating Petals Generator
 */
function spawnPurplePetal() {
    const petal = document.createElement('div');
    petal.classList.add('purple-petal');
    
    const scaleFactor = Math.random() * 16 + 10;
    petal.style.width = `${scaleFactor}px`;
    petal.style.height = `${scaleFactor * 0.85}px`;
    petal.style.left = `${Math.random() * 100}vw`;
    
    const lifespan = Math.random() * 3 + 4;
    petal.style.animationDuration = `${lifespan}s`;
    
    particleCanvas.appendChild(petal);
    setTimeout(() => petal.remove(), lifespan * 1000);
}

/**
 * FX: Massive Vector Space Matrix System
 */
function drawGalaxyStarfield(count) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('galaxy-star');
        
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        
        const twinkleTime = Math.random() * 2 + 1;
        star.style.animationDuration = `${twinkleTime}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        
        // Give a subset of stars an ethereal blue/purple tint
        if (Math.random() > 0.7) {
            star.style.backgroundColor = Math.random() > 0.5 ? '#a855f7' : '#06b6d4';
            star.style.boxShadow = `0 0 8px ${star.style.backgroundColor}`;
        }
        
        particleCanvas.appendChild(star);
    }
}

/**
 * Interactive Action Event Maps
 */
roseTrigger.addEventListener('click', () => {
    // Add rapid programmatic shockwave pulse before transforming
    roseTrigger.style.transform = 'scale(0.9)';
    roseTrigger.style.filter = 'brightness(2) drop-shadow(0 0 30px #e63946)';
    
    setTimeout(() => {
        switchScene(scene1, scene2, 'stage-2');
    }, 400);
});

toStage3Btn.addEventListener('click', () => {
    switchScene(scene2, scene3, 'stage-3');
});

toStage4Btn.addEventListener('click', () => {
    switchScene(scene3, scene4, 'stage-4');
});
