// Constants for the X and Circle classes
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";

// Winning combinations for Tic Tac Toe
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Select all the cells and other relevant elements from the HTML
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');
let circleTurn;

// Add a click event listener to the restart button to start a new game
restartButton.addEventListener('click', startGame);

// Initialize the game
startGame();

function startGame() {
  circleTurn = false;

  // Loop through all the cells and set up event listeners for each cell
  cellElements.forEach((cell) => {
    // Clear any X or Circle class from previous games
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    // Remove previous click event listeners and add a new one for the current game
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });

  // Clear the winning message and set the hover class for the current player
  winningMessageElement.classList.remove('winning-message');
  setBoardHoverClass();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  // Place the X or Circle mark in the clicked cell
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    // If there's a win, end the game
    endGame(false);
  } else if (isDraw()) {
    // If it's a draw, end the game
    endGame(true);
  } else {
    // If the game is ongoing, swap turns and update the hover class
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    // Display "Draw!" message if it's a draw
    winningMessageTextElement.innerText = '👉👈 Draw!';
  } else {
    // Display the winner if there's a winner
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }

  // Show the winning message element
  winningMessageElement.classList.add('winning-message');
}

function isDraw() {
  // Check if all cells are filled
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  // Add the X or Circle class to the clicked cell
  cell.classList.add(currentClass);
}

function swapTurns() {
  // Switch between X and Circle turns
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  // Set the hover class to indicate the current player's turn
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  // Check if any of the winning combinations are achieved by the current player
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
