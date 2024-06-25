// Define cheersSound globally
const cheersSound = document.getElementById('cheers-sound');
const coinSound = document.getElementById('coin-sound');
let correctMatches = 0;
let timer;
let timeLeft = 60; // Time limit in seconds
let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
let currentLevelScore = 0;
let draggedElement = null; // To hold the element being dragged

// Function to initialize the game
function initGame() {
    // Load the last level from localStorage or start from level 1
    const lastLevel = localStorage.getItem('lastLevel') ? parseInt(localStorage.getItem('lastLevel')) : 1;
    loadLevel(lastLevel);

    // Set up settings menu toggle
    document.getElementById('settings-icon').addEventListener('click', () => {
        document.getElementById('settings-menu').style.display = 'block';
    });

    document.getElementById('close-settings').addEventListener('click', () => {
        document.getElementById('settings-menu').style.display = 'none';
    });

    // Set up music toggle
    document.getElementById('toggle-music').addEventListener('change', (event) => {
        const backgroundMusic = document.getElementById('background-music');
        if (event.target.checked) {
            backgroundMusic.volume = 0.2;
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
    });

    // Set up SFX toggle
    document.getElementById('toggle-sfx').addEventListener('change', (event) => {
        const correctSound = document.getElementById('correct-sound');
        const incorrectSound = document.getElementById('incorrect-sound');
        correctSound.muted = !event.target.checked;
        incorrectSound.muted = !event.target.checked;
        coinSound.muted = !event.target.checked;
    });

    // Start the game with the first level or the last saved level
    document.getElementById('start-button').addEventListener('click', () => {
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
        startTimer();
    });

    // Set up try again button
    document.getElementById('try-again-button').addEventListener('click', () => {
        document.getElementById('game-over-popup').classList.add('hidden');
        resetGame();
    });

    // Responsive design adjustment for drag and drop
    adjustDragDropForMobile();
}

// Function to load a specific level
function loadLevel(level) {
    // Save the current level to localStorage
    localStorage.setItem('lastLevel', level);

    // Load the specified level data
    const levelData = getLevelData(level);
    renderGameArea(levelData);

    // Update level number display
    const levelNumber = document.getElementById('level-number');
    levelNumber.textContent = `Level ${level}`;

    // Update score display
    const scoreValue = document.getElementById('score');
    scoreValue.textContent = `${score}`;

    // Reset correctMatches for the new level
    correctMatches = 0;
    currentLevelScore = 0;
    resetTimer();
}

// Function to render the game area
function renderGameArea(levelData) {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = ''; // Clear previous content

    // Shuffle names once for all rows
    const shuffledNames = shuffleArray([...levelData.names]); // Clone and shuffle names array

    levelData.animals.forEach((animal, index) => {
        const row = document.createElement('div');
        row.classList.add('game-row');

        // Animal image
        const animalImage = document.createElement('img');
        animalImage.src = `assets/animals/${animal.image}`;
        animalImage.classList.add('animal-image');
        animalImage.id = animal.name; // Set animal name as ID for identification
        animalImage.draggable = true; // Enable draggable attribute
        row.appendChild(animalImage);

        // Randomly assigned name block from the shuffled names array
        const nameBlock = document.createElement('div');
        nameBlock.classList.add('animal-block');
        nameBlock.textContent = shuffledNames[index]; // Use the shuffled name
        nameBlock.dataset.name = shuffledNames[index]; // Set dataset for matching identification
        row.appendChild(nameBlock);

        gameArea.appendChild(row);
    });

    // Set up drag and drop events for dynamically created elements
    const blocks = document.querySelectorAll('.animal-block');
    const animals = document.querySelectorAll('.animal-image');

    blocks.forEach(block => {
        block.addEventListener('dragover', allowDrop);
        block.addEventListener('drop', drop);
    });

    animals.forEach(animal => {
        animal.addEventListener('dragstart', drag);
    });

    // Update correctMatches based on matches already made
    correctMatches = 0; // Reset correctMatches for the new level
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    draggedElement = event.target;
}

function speakText(text) {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
}

function drop(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
    const data = draggedElement ? draggedElement.id : event.dataTransfer.getData("text");
    const animalId = document.getElementById(data);

    const correctSound = document.getElementById('correct-sound');
    const incorrectSound = document.getElementById('incorrect-sound');

    if (event.target.dataset.name === animalId.id) {
        event.target.textContent = ''; // Clear text content
        event.target.appendChild(animalId);
        correctSound.volume = 0.2;
        correctSound.play();
        event.target.classList.add('correct');
        updateScore(2); // Increase score by 2
        playCoinAnimation(event.target);
        setTimeout(() => {
            event.target.classList.remove('correct');
        }, 500);

        // Speak the name of the correctly matched animal
        speakText(animalId.id);

        // Increment correctMatches
        correctMatches++;

        // Check if all animals are matched
        if (correctMatches === document.querySelectorAll('.animal-image').length) {
            showCongratulation();
            setTimeout(() => {
                const currentLevel = parseInt(localStorage.getItem('lastLevel'));
                const nextLevel = currentLevel + 1;
                loadLevel(nextLevel);
            }, 500);
        }
    } else {
        incorrectSound.volume = 0.2;
        incorrectSound.play();
        event.target.classList.add('incorrect');
        setTimeout(() => {
            event.target.classList.remove('incorrect');
        }, 500);
        updateScore(-1); // Deduct 1 points from total score
    }
}

function showCongratulation() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // Create modal content
    const modal = document.createElement('div');
    modal.classList.add('congratulation-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span id="close-modal" class="close">&times;</span>
            <p>Congratulations! Level Completed!</p>
        </div>
    `;
    overlay.appendChild(modal);

    // Play cheers sound
    cheersSound.volume = 0.2;
    cheersSound.play();

    // Close modal event listener
    const closeModal = () => {
        document.body.removeChild(overlay);
    };
    document.getElementById('close-modal').addEventListener('click', closeModal);

    // Remove modal after 0.5 seconds
    setTimeout(() => {
        document.body.removeChild(overlay);
    }, 500);
}

// Function to update score and save to localStorage
function updateScore(points) {
    score += points;
    currentLevelScore += points;
    document.getElementById('score').textContent = score;
    localStorage.setItem('score', score);
}

function pauseGame() {
    // Logic to pause the game, such as stopping the timer and muting audio
    document.getElementById('background-music').pause();
}

function resumeGame() {
    // Logic to resume the game, such as restarting the timer and unmuting audio
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.volume = 0.2;
    backgroundMusic.play();
}

function playCoinAnimation(element) {
    coinSound.volume = 0.2;
    coinSound.play();
    const coinIcon = document.getElementById('coin-icon');
    const coinAnimation = document.createElement('i');
    coinAnimation.classList.add('fas', 'fa-coins', 'coin-animation');
    element.appendChild(coinAnimation);

    // Calculate target position of the coin icon
    const coinRect = coinIcon.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const offsetX = coinRect.left - elementRect.left + coinRect.width / 2 - 25; // 25px offset for centering

    // Animate the coin towards the coin icon
    coinAnimation.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${offsetX}px, ${-coinRect.top + coinRect.height / 2}px)` }
    ], {
        duration: 1000,
        easing: 'ease-out',
        fill: 'forwards'
    });

    setTimeout(() => {
        element.removeChild(coinAnimation);
    }, 1000);
}

function startTimer() {
    const timerElement = document.getElementById('time-left');
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            // showGameOverPopup(); // Show game over popup instead of alert
            timeLeft = 0;
        }
        // timerElement.textContent = timeLeft.toString();
    }, 1000); // Update every second
}

function showGameOverPopup() {
    document.getElementById('game-over-popup').classList.remove('hidden');
}

function resetGame() {
    score -= currentLevelScore; // Deduct current level score from the total score
    currentLevelScore = 0; // Reset current level score
    document.getElementById('score').textContent = score;
    localStorage.setItem('score', score);
    const currentLevel = parseInt(localStorage.getItem('lastLevel')); // Get current level from localStorage
    loadLevel(currentLevel);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 60; // Reset to initial time limit
    startTimer(); // Restart the timer
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to adjust drag and drop for mobile devices
function adjustDragDropForMobile() {
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
}

function handleTouchStart(event) {
    const touch = event.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);

    if (target && target.classList.contains('animal-image')) {
        event.preventDefault();
        draggedElement = target;
        target.dispatchEvent(new MouseEvent('dragstart', {
            bubbles: true,
            cancelable: true,
            clientX: touch.clientX,
            clientY: touch.clientY,
        }));
    }
}

function handleTouchMove(event) {
    const touch = event.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);

    if (target && target.classList.contains('animal-block')) {
        event.preventDefault();
        target.dispatchEvent(new MouseEvent('dragover', {
            bubbles: true,
            cancelable: true,
            clientX: touch.clientX,
            clientY: touch.clientY,
        }));
    }
}

function handleTouchEnd(event) {
    const touch = event.changedTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);

    if (target && target.classList.contains('animal-block')) {
        event.preventDefault();
        target.dispatchEvent(new MouseEvent('drop', {
            bubbles: true,
            cancelable: true,
            clientX: touch.clientX,
            clientY: touch.clientY,
        }));
    }
}

// Call initGame when the window loads
window.onload = initGame;
