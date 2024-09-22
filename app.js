// Game sequences to track the game's pattern and the player's input
let gameSequence = [];
let playerSequence = [];

// Game state variables
let level = 0;
let gameStarted = false;
let highScore = 0;

// DOM elements for updating the game status
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

// Available button colors
let btns = ["yellow", "red", "green", "purple"];
let sounds = {
    "yellow": new Audio("sounds/yellow.wav"),
    "red": new Audio("sounds/red.wav"),
    "green": new Audio("sounds/green.wav"),
    "purple": new Audio("sounds/purple.wav")
};

// Event listener to start the game on keypress
document.addEventListener("keypress", function () {
    if (!gameStarted) {
        gameStarted = true;
        levelUp();
    }
});

// Function to flash a button when clicked or part of the sequence
function btnFlash(btn, color) {
    btn.classList.add("flash");
    try {
        sounds[color].currentTime = 0;  // Reset sound to start
        sounds[color].play();
    } catch (error) {
        console.error(`Failed to play sound for ${color}:`, error);
    }
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

// Function to progress to the next level
function levelUp() {
    // Clear the player's sequence for the new level
    playerSequence = [];

    // Increment and display the level
    level++;
    h2.innerText = `Level ${level}`;

    // Update and display the high score
    if (level > highScore) {
        highScore = level;
        h3.innerText = `High Score: ${highScore}`;
    }

    // Generate a random button for the game sequence
    let randIdx = Math.floor(Math.random() * 4);
    let randCol = btns[randIdx];
    let randBtn = document.querySelector(`.${randCol}`);

    // Add the random color to the game sequence and flash the button
    gameSequence.push(randCol);
    console.log(gameSequence);
    btnFlash(randBtn, randCol);
}

// Add click event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Function to handle player's button press
function btnPress() {
    let userChoice = this.getAttribute("id");
    btnFlash(this, userChoice);

    if (gameStarted) {
        playerSequence.push(userChoice);

        // Check the player's choice against the game sequence
        checkAns(playerSequence.length - 1);
    }
}

// Function to check if the player's sequence matches the game's sequence
function checkAns(idx) {
    if (gameSequence[idx] === playerSequence[idx]) {
        // If the player has completed the sequence, move to the next level
        if (gameSequence.length === playerSequence.length) {
            setTimeout(levelUp, 750);
        }
    } else {
        // If the player makes a mistake, display Game Over and reset the game
        h2.innerHTML = `GAME OVER! Your score was ${level} <br> Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "#f1f1f1";
        }, 150);
        reset();
    }
}

// Function to reset the game after a game over
function reset() {
    gameSequence = [];
    playerSequence = [];
    level = 0;
    gameStarted = false;
}
