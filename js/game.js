// Define cheersSound globally
const cheersSound = document.getElementById('cheers-sound');
const coinSound = document.getElementById('coin-sound');
let correctMatches = 0;
let score = 0;
let timer;
let timeLeft = 60; // Time limit in seconds

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

    // Reset correctMatches for the new level
    correctMatches = 0;
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
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const animalId = document.getElementById(data);

    const correctSound = document.getElementById('correct-sound');
    const incorrectSound = document.getElementById('incorrect-sound');

    if (event.target.dataset.name === animalId.id) {
        event.target.textContent = ''; // Clear text content
        event.target.appendChild(animalId);
        correctSound.play();
        event.target.classList.add('correct');
        updateScore(10); // Increase score by 10
        playCoinAnimation(event.target);
        setTimeout(() => {
            event.target.classList.remove('correct');
        }, 500);

        // Increment correctMatches
        correctMatches++;

        // Check if all animals are matched
        if (correctMatches === getLevelData(parseInt(localStorage.getItem('lastLevel'))).animals.length) {
            setTimeout(() => {
                const currentLevel = parseInt(localStorage.getItem('lastLevel'));
                const nextLevel = currentLevel + 1;

                if (nextLevel > 10) {
                    // Display congratulatory message if all levels are completed
                    showCongratulation();
                } else {
                    loadLevel(nextLevel);
                }
            }, 500);
        }
    } else {
        incorrectSound.play();
        event.target.classList.add('incorrect');
        setTimeout(() => {
            event.target.classList.remove('incorrect');
        }, 500);
    }
}

function showCongratulation() {
    cheersSound.play();
}

function updateScore(points) {
    score += points;
    document.getElementById('score').textContent = score;
}

function playCoinAnimation(element) {
    coinSound.play();
    const coinIcon = document.createElement('i');
    coinIcon.classList.add('fas', 'fa-coins', 'coin-animation');
    element.appendChild(coinIcon);

    setTimeout(() => {
        element.removeChild(coinIcon);
    }, 1000);
}

function startTimer() {
    const timerElement = document.getElementById('time-left');
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showGameOverPopup(); // Show game over popup instead of alert
        }
    }, 1000); // Update every second
}

function showGameOverPopup() {
    document.getElementById('game-over-popup').classList.remove('hidden');
}

function resetGame() {
    score = 0;
    document.getElementById('score').textContent = score;
    timeLeft = 60;
    resetTimer();
    const currentLevel = 1; // Restart from level 1
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

// Call initGame when the window loads
window.onload = initGame;
