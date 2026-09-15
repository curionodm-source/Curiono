// Game Configuration
const CONFIG = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    GAME_DURATION: 90, // seconds
    INFECTION_RATE: 0.1, // infection increase per frame in danger zones
    PLAYER_SPEED: 4,
    PLAYER_SIZE: 20,
    FOOD_SIZE: 15,
    NEST_SIZE: 40,
    FUNGUS_COUNT: 5
};

// Game State
const gameState = {
    isRunning: false,
    isPaused: false,
    timeRemaining: CONFIG.GAME_DURATION,
    infection: 0,
    foodCollected: 0,
    totalFood: 3,
    gameOverReason: ''
};

// Canvas and Context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player Object
const player = {
    x: 100,
    y: 300,
    width: CONFIG.PLAYER_SIZE,
    height: CONFIG.PLAYER_SIZE,
    color: '#FFD700',
    velocityX: 0,
    velocityY: 0
};

// Nest Object (Start/End area)
const nest = {
    x: 50,
    y: 250,
    width: CONFIG.NEST_SIZE,
    height: CONFIG.NEST_SIZE,
    color: '#4A90E2'
};

// Food Items
let foodItems = [];

// Fungus Danger Zones
let fungusZones = [];

// Input State
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    ArrowUp: false,
    ArrowLeft: false,
    ArrowDown: false,
    ArrowRight: false
};

// Timer Interval
let gameTimer = null;
let animationFrame = null;

// Sprite Animation
let playerSprites = {
    up: null,
    down: null,
    left: null,
    right: null
};
let currentDirection = 'down'; // Default direction
let currentFrame = 0;
let animationCounter = 0;
const FRAME_COUNT = 4;
const ANIMATION_SPEED = 8; // frames between animation updates
let spritesLoaded = 0;
const TOTAL_SPRITES = 4;

// Initialize Game Elements
function initializeGameElements() {
    // Reset player position
    player.x = nest.x + 10;
    player.y = nest.y + 10;
    player.velocityX = 0;
    player.velocityY = 0;

    // Create food items at random positions
    foodItems = [];
    const foodPositions = [
        { x: 200, y: 100 },
        { x: 400, y: 300 },
        { x: 600, y: 500 }
    ];

    foodPositions.forEach(pos => {
        foodItems.push({
            x: pos.x,
            y: pos.y,
            width: CONFIG.FOOD_SIZE,
            height: CONFIG.FOOD_SIZE,
            color: '#4CAF50',
            collected: false
        });
    });

    // Create fungus danger zones
    fungusZones = [];
    const fungusPositions = [
        { x: 150, y: 200, width: 100, height: 80 },
        { x: 350, y: 150, width: 120, height: 100 },
        { x: 500, y: 250, width: 90, height: 120 },
        { x: 250, y: 400, width: 110, height: 90 },
        { x: 550, y: 450, width: 100, height: 80 }
    ];

    fungusPositions.forEach(pos => {
        fungusZones.push({
            x: pos.x,
            y: pos.y,
            width: pos.width,
            height: pos.height,
            color: 'rgba(255, 82, 82, 0.3)'
        });
    });
}

// Load Player Sprites
function loadPlayerSprite() {
    const spritePaths = {
        up: 'assets/player/ant_walk_up.png',
        down: 'assets/player/ant_walk_down.png',
        left: 'assets/player/ant_walk_left.png',
        right: 'assets/player/ant_walk_right..png'
    };

    Object.keys(spritePaths).forEach(direction => {
        const sprite = new Image();
        sprite.src = spritePaths[direction];
        sprite.onload = () => {
            spritesLoaded++;
            console.log(`Loaded sprite: ${spritePaths[direction]} - dimensions: ${sprite.width}x${sprite.height}`);
            // Set nearest-neighbor scaling for sharp pixel art
            ctx.imageSmoothingEnabled = false;
        };
        sprite.onerror = () => {
            console.error(`Failed to load sprite: ${spritePaths[direction]}`);
        };
        playerSprites[direction] = sprite;
    });
}

// Input Event Listeners
function setupInputListeners() {
    document.addEventListener('keydown', (e) => {
        if (keys.hasOwnProperty(e.key)) {
            keys[e.key] = true;
            e.preventDefault();
        }
    });

    document.addEventListener('keyup', (e) => {
        if (keys.hasOwnProperty(e.key)) {
            keys[e.key] = false;
            e.preventDefault();
        }
    });
}

// Update Player Movement
function updatePlayerMovement() {
    player.velocityX = 0;
    player.velocityY = 0;

    if (keys.w || keys.ArrowUp) {
        player.velocityY = -CONFIG.PLAYER_SPEED;
        currentDirection = 'up';
    }
    if (keys.s || keys.ArrowDown) {
        player.velocityY = CONFIG.PLAYER_SPEED;
        currentDirection = 'down';
    }
    if (keys.a || keys.ArrowLeft) {
        player.velocityX = -CONFIG.PLAYER_SPEED;
        currentDirection = 'left';
    }
    if (keys.d || keys.ArrowRight) {
        player.velocityX = CONFIG.PLAYER_SPEED;
        currentDirection = 'right';
    }

    // Apply movement
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Boundary collision
    player.x = Math.max(0, Math.min(CONFIG.CANVAS_WIDTH - player.width, player.x));
    player.y = Math.max(0, Math.min(CONFIG.CANVAS_HEIGHT - player.height, player.y));

    // Update animation when moving
    if (player.velocityX !== 0 || player.velocityY !== 0) {
        animationCounter++;
        if (animationCounter >= ANIMATION_SPEED) {
            currentFrame = (currentFrame + 1) % FRAME_COUNT;
            animationCounter = 0;
        }
    } else {
        // Stop animation when not moving
        currentFrame = 0;
        animationCounter = 0;
    }
}

// Collision Detection
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Check Food Collection
function checkFoodCollection() {
    foodItems.forEach(food => {
        if (!food.collected && checkCollision(player, food)) {
            food.collected = true;
            gameState.foodCollected++;
            updateUI();
        }
    });
}

// Check Fungus Collision
function checkFungusCollision() {
    let inFungusZone = false;
    
    fungusZones.forEach(zone => {
        if (checkCollision(player, zone)) {
            inFungusZone = true;
        }
    });

    if (inFungusZone) {
        gameState.infection = Math.min(100, gameState.infection + CONFIG.INFECTION_RATE);
        updateUI();
    }
}

// Check Victory Condition
function checkVictory() {
    if (gameState.foodCollected === gameState.totalFood && checkCollision(player, nest)) {
        endGame(true);
    }
}

// Check Game Over Condition
function checkGameOver() {
    if (gameState.infection >= 100) {
        gameState.gameOverReason = 'The fungus has completely infected you!';
        endGame(false);
    } else if (gameState.timeRemaining <= 0) {
        gameState.gameOverReason = 'Time ran out! The fungus has spread.';
        endGame(false);
    }
}

// Update UI
function updateUI() {
    document.getElementById('timer').textContent = Math.ceil(gameState.timeRemaining);
    document.getElementById('foodCollected').textContent = `${gameState.foodCollected}/${gameState.totalFood}`;
    document.getElementById('infectionValue').textContent = `${Math.floor(gameState.infection)}%`;
    document.getElementById('infectionMeter').style.width = `${gameState.infection}%`;
}

// Draw Game Elements
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);

    // Draw background (forest floor)
    ctx.fillStyle = '#1a3a1a';
    ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);

    // Draw some decorative elements (simple grass patches)
    ctx.fillStyle = '#2d5a2d';
    for (let i = 0; i < 20; i++) {
        const x = (i * 45) % CONFIG.CANVAS_WIDTH;
        const y = (i * 37) % CONFIG.CANVAS_HEIGHT;
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw fungus danger zones
    fungusZones.forEach(zone => {
        ctx.fillStyle = zone.color;
        ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
        
        // Add fungus texture (simple dots)
        ctx.fillStyle = 'rgba(255, 82, 82, 0.5)';
        for (let i = 0; i < 5; i++) {
            const dotX = zone.x + Math.random() * zone.width;
            const dotY = zone.y + Math.random() * zone.height;
            ctx.beginPath();
            ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    // Draw nest
    ctx.fillStyle = nest.color;
    ctx.fillRect(nest.x, nest.y, nest.width, nest.height);
    ctx.strokeStyle = '#2E7BA6';
    ctx.lineWidth = 2;
    ctx.strokeRect(nest.x, nest.y, nest.width, nest.height);
    
    // Draw nest label
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('NEST', nest.x + nest.width/2, nest.y - 5);

    // Draw food items
    foodItems.forEach(food => {
        if (!food.collected) {
            ctx.fillStyle = food.color;
            ctx.beginPath();
            ctx.arc(food.x + food.width/2, food.y + food.height/2, food.width/2, 0, Math.PI * 2);
            ctx.fill();
            
            // Add shine effect
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(food.x + food.width/2 - 3, food.y + food.height/2 - 3, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    // Draw player with sprite animation
    const currentSprite = playerSprites[currentDirection];
    if (currentSprite && currentSprite.complete) {
        // Calculate frame dimensions from the actual sprite sheet
        const frameWidth = currentSprite.width / FRAME_COUNT;
        const frameHeight = currentSprite.height;

        // Calculate source position for current frame
        const sourceX = currentFrame * frameWidth;
        const sourceY = 0;

        // Calculate scale to fit within 80x80 while preserving aspect ratio
        const maxDestSize = 80;
        const scaleX = maxDestSize / frameWidth;
        const scaleY = maxDestSize / frameHeight;
        const scale = Math.min(scaleX, scaleY);

        // Calculate destination dimensions preserving aspect ratio
        const destWidth = frameWidth * scale;
        const destHeight = frameHeight * scale;

        // Center the sprite in the 80x80 bounding box
        const destX = player.x + player.width / 2 - destWidth / 2;
        const destY = player.y + player.height / 2 - destHeight / 2;

        // Draw current frame with nearest-neighbor scaling
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
            currentSprite,
            sourceX, sourceY, frameWidth, frameHeight,
            destX, destY, destWidth, destHeight
        );
    } else {
        // Fallback to placeholder if sprite not loaded
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
        
        ctx.strokeStyle = '#DAA520';
        ctx.lineWidth = 2;
        ctx.strokeRect(player.x, player.y, player.width, player.height);
        
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(player.x + 5, player.y + 7, 2, 0, Math.PI * 2);
        ctx.arc(player.x + player.width - 5, player.y + 7, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Game Loop
function gameLoop() {
    if (!gameState.isRunning || gameState.isPaused) return;

    updatePlayerMovement();
    checkFoodCollection();
    checkFungusCollision();
    checkVictory();
    checkGameOver();
    draw();

    animationFrame = requestAnimationFrame(gameLoop);
}

// Start Timer
function startTimer() {
    gameTimer = setInterval(() => {
        if (!gameState.isPaused) {
            gameState.timeRemaining -= 0.1;
            updateUI();
            
            if (gameState.timeRemaining <= 0) {
                checkGameOver();
            }
        }
    }, 100);
}

// Start Game
function startGame() {
    // Reset game state
    gameState.isRunning = true;
    gameState.isPaused = false;
    gameState.timeRemaining = CONFIG.GAME_DURATION;
    gameState.infection = 0;
    gameState.foodCollected = 0;
    gameState.gameOverReason = '';

    // Initialize game elements
    initializeGameElements();
    updateUI();

    // Hide all screens
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('victoryScreen').style.display = 'none';
    document.getElementById('gameOverScreen').style.display = 'none';

    // Start game loop and timer
    gameLoop();
    startTimer();
}

// End Game
function endGame(victory) {
    gameState.isRunning = false;
    
    // Clear timer and animation frame
    clearInterval(gameTimer);
    cancelAnimationFrame(animationFrame);

    if (victory) {
        // Show victory screen
        document.getElementById('finalTime').textContent = Math.ceil(gameState.timeRemaining);
        document.getElementById('finalInfection').textContent = Math.floor(gameState.infection);
        document.getElementById('victoryScreen').style.display = 'flex';
    } else {
        // Show game over screen
        document.getElementById('gameOverReason').textContent = gameState.gameOverReason;
        document.getElementById('gameOverFood').textContent = gameState.foodCollected;
        document.getElementById('gameOverInfection').textContent = Math.floor(gameState.infection);
        document.getElementById('gameOverScreen').style.display = 'flex';
    }
}

// Setup Button Event Listeners
function setupButtonListeners() {
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('playAgainBtn').addEventListener('click', startGame);
    document.getElementById('retryBtn').addEventListener('click', startGame);
}

// Initialize Game
function initializeGame() {
    loadPlayerSprite();
    setupInputListeners();
    setupButtonListeners();
    initializeGameElements();
    draw(); // Draw initial state
    updateUI();
}

// Start the game when the page loads
window.addEventListener('load', initializeGame);