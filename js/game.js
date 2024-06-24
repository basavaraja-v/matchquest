// Define cheersSound globally
const cheersSound = document.getElementById('cheers-sound');
let correctMatches = 0;

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
        setTimeout(() => {
            event.target.classList.remove('correct');
        }, 500);

        // Increment correctMatches
        correctMatches++;

        // Check if all animals are matched
        if (correctMatches === document.querySelectorAll('.animal-image').length) {
            // Show congratulation message
            showCongratulation();

            // Move to the next level after a delay
            setTimeout(() => {
                const currentLevel = parseInt(localStorage.getItem('lastLevel'));
                const nextLevel = currentLevel + 1;
                loadLevel(nextLevel);
            }, 3000); // Delay of 3 seconds before moving to the next level
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
    cheersSound.play();

    // Close modal event listener
    const closeModal = () => {
        document.body.removeChild(overlay);
    };
    document.getElementById('close-modal').addEventListener('click', closeModal);

    // Remove modal after 3 seconds
    setTimeout(() => {
        document.body.removeChild(overlay);
    }, 3000);
}


document.addEventListener('DOMContentLoaded', () => {
    initGame();
});
