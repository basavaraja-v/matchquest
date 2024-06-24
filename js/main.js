document.addEventListener('DOMContentLoaded', () => {
    // Initialize game
    initGame();

    // Set up Start Game button
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {
        // Hide the start screen
        const startScreen = document.getElementById('start-screen');
        startScreen.style.display = 'none';

        // Display the game container
        const gameContainer = document.getElementById('game-container');
        gameContainer.style.display = 'block';

        // Start background music if enabled in settings
        const backgroundMusic = document.getElementById('background-music');
        if (document.getElementById('toggle-music').checked) {
            backgroundMusic.volume = 0.2; 
            backgroundMusic.play();
        }
    });
});
