const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const resetButton = document.getElementById("resetButton");

let board = [];
let selected = null;
let currentPlayer = "red";

function startGame() {
  board = Array.from({ length: 8 }, () => Array(8).fill(null));

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) board[row][col] = "black";
    }
  }

  for (let row = 5; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 1) board[row][col] = "red";
    }
  }

  selected = null;
  currentPlayer = "red";
  updateStatus();
  drawBoard();
}

function drawBoard() {
  boardElement.innerHTML = "";

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("button");
      const isDark = (row + col) % 2 === 1;
      square.type = "button";
      square.className = `square ${isDark ? "dark" : "light"}`;
      square.setAttribute("aria-label", `Row ${row + 1}, column ${col + 1}`);

      if (selected && isValidMove(selected.row, selected.col, row, col)) {
        square.classList.add("valid-move");
      }

      const color = board[row][col];
      if (color) {
        const piece = document.createElement("div");
        piece.className = `piece ${color}`;
        if (selected && selected.row === row && selected.col === col) {
          piece.classList.add("selected");
        }
        square.appendChild(piece);
      }

      square.addEventListener("click", () => handleSquareClick(row, col));
      boardElement.appendChild(square);
    }
  }
}

function handleSquareClick(row, col) {
  const clickedPiece = board[row][col];

  if (clickedPiece === currentPlayer) {
    selected = { row, col };
    statusElement.textContent = `${capitalize(currentPlayer)} piece selected`;
    drawBoard();
    return;
  }

  if (selected && isValidMove(selected.row, selected.col, row, col)) {
    board[row][col] = board[selected.row][selected.col];
    board[selected.row][selected.col] = null;
    selected = null;
    currentPlayer = currentPlayer === "red" ? "black" : "red";
    updateStatus();
    drawBoard();
    return;
  }

  statusElement.textContent = `Choose one of ${capitalize(currentPlayer)}'s pieces`;
}

function isValidMove(fromRow, fromCol, toRow, toCol) {
  if (board[toRow][toCol] !== null) return false;

  const rowChange = toRow - fromRow;
  const colChange = Math.abs(toCol - fromCol);
  const direction = currentPlayer === "red" ? -1 : 1;

  return rowChange === direction && colChange === 1;
}

function updateStatus() {
  statusElement.textContent = `${capitalize(currentPlayer)}'s turn`;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

resetButton.addEventListener("click", startGame);
startGame();
