// [1] main variables and set values
const countOfSquares = 9;
const playerX = document.querySelector(".x-player");
const playerO = document.querySelector(".o-player");
let gameBord = document.querySelector("div.game");
let player = "x"; // by default
let winnerMes = document.querySelector(".game-info .show-winner");
let scoreX = document.querySelector(".x-score");
let scoreO = document.querySelector(".o-score");

// [2] create xo squares
for (let i = 1; i <= countOfSquares; i++) {
  let div = document.createElement("div");
  div.className = "square";
  div.setAttribute("id", `item${i}`);
  gameBord.appendChild(div);
}

// set squares after the loop
let squares = Array.from(document.querySelectorAll("div.square"));

// [3] excute game function on each square
squares.forEach((square) =>
  square.addEventListener("click", () => game(square))
);

let choosenSquares = [];

// [4] getWinner after game funciton
function checkWinner() {
  for (let i = 1; i <= countOfSquares; i++)
    choosenSquares[i - 1] = document.getElementById("item" + i).textContent;

  if (
    choosenSquares[0] === choosenSquares[1] &&
    choosenSquares[1] === choosenSquares[2] &&
    choosenSquares[0] !== ""
  )
    finishGame(1, 2, 3);
  else if (
    choosenSquares[3] === choosenSquares[4] &&
    choosenSquares[4] === choosenSquares[5] &&
    choosenSquares[3] !== ""
  )
    finishGame(4, 5, 6);
  else if (
    choosenSquares[6] === choosenSquares[7] &&
    choosenSquares[7] === choosenSquares[8] &&
    choosenSquares[6] !== ""
  )
    finishGame(7, 8, 9);
  else if (
    choosenSquares[0] === choosenSquares[3] &&
    choosenSquares[3] === choosenSquares[6] &&
    choosenSquares[0] !== ""
  )
    finishGame(1, 4, 7);
  else if (
    choosenSquares[1] === choosenSquares[4] &&
    choosenSquares[4] === choosenSquares[7] &&
    choosenSquares[1] !== ""
  )
    finishGame(2, 5, 8);
  else if (
    choosenSquares[2] === choosenSquares[5] &&
    choosenSquares[5] === choosenSquares[8] &&
    choosenSquares[2] !== ""
  )
    finishGame(3, 6, 9);
  else if (
    choosenSquares[0] === choosenSquares[4] &&
    choosenSquares[4] === choosenSquares[8] &&
    choosenSquares[0] !== ""
  )
    finishGame(1, 5, 9);
  else if (
    choosenSquares[2] === choosenSquares[4] &&
    choosenSquares[4] === choosenSquares[6] &&
    choosenSquares[2] !== ""
  )
    finishGame(3, 5, 7);
  else if (squares.every((square) => square.textContent !== "")) {
    winnerMes.textContent = "No Winners !";
    let addDots = setInterval(() => {
      winnerMes.textContent += ".";
    }, 1000);
    player = "";
    setTimeout(() => {
      clearInterval(addDots);
      resetGame();
    }, 3000);
    squares.forEach((square) => (square.style.pointerEvents = "none"));
  }
}

// [3] game function
function game(square) {
  if (player === "x" && square.textContent === "") {
    square.textContent = "X";
    player = "o";
    playerX.classList.add("disabled");
    playerO.classList.remove("disabled");
  } else if (player === "o" && square.textContent === "") {
    square.textContent = "O";
    player = "x";
    playerO.classList.add("disabled");
    playerX.classList.remove("disabled");
  }
  checkWinner();
}

// [5] if the condition true, finishGame function will call
function finishGame(num1, num2, num3) {
  playerX.classList.add("disabled");
  playerO.classList.add("disabled");
  winnerMes.textContent = `${player === "x" ? "O" : "X"}'s Wins`;

  document.getElementById("item" + num1).classList.add("win");
  document.getElementById("item" + num2).classList.add("win");
  document.getElementById("item" + num3).classList.add("win");

  let addDots = setInterval(() => {
    winnerMes.textContent += ".";
  }, 1000);
  setTimeout(() => {
    clearInterval(addDots);
    resetGame();
  }, 3000);
  squares.forEach((square) => (square.style.pointerEvents = "none"));
}

// [6]
function resetGame() {
  winnerMes.textContent = "";
  squares.forEach((square) => {
    square.textContent = "";
    square.classList.remove("win");
    square.style.pointerEvents = "initial";
  });

  if (player === "x") {
    +scoreO.textContent++;
  } else if (player === "o") {
    +scoreX.textContent++;
  }

  player = "x";
  playerX.classList.remove("disabled");
  playerO.classList.add("disabled");
}

// [7] Enhancment and DRY

function getWinner(num1, num2, num3) {
  if (
    choosenSquares[num1 - 1] === choosenSquares[num2 - 1] &&
    choosenSquares[num2 - 1] === choosenSquares[num3 - 1] &&
    choosenSquares[num1 - 1] !== ""
  )
    finishGame(num1, num2, num3);
}

function robotTinking(choosen, target) {
  if (choosenSquares[choosen] === "X" && choosenSquares[target] === "")
    setTimeout(() => {
      game(squares[target]);
    }, 400);
}
