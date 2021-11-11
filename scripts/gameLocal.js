const xClass = "X";
const oClass = "Circle";

const selectPlayerX = document.querySelector("#playerX");
const selectPlayerO = document.querySelector("#playerO");

const board = document.querySelector(".board");
const cellElements = document.querySelectorAll(".cell");

const navigation = document.querySelector(".navigation");
const reset = document.querySelector("#restartButton");
const reset2 = document.querySelector("#restart2");

const winningMessage = document.querySelector(".winning-message");
const winInnerText = document.querySelector("[data-winning-message-text]");

const checkMoves = document.querySelector("#checkMoves");
const previousMove = document.querySelector("#previousMove");
const nextMove = document.querySelector("#nextMove");

const xScore = document.querySelector("#xScore");
const oScore = document.querySelector("#oScore");

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let scoreX = 0;
let scoreO = 0;
let move = "";
let currentClass = "";
let history = [];


// Choose Symbol
selectPlayerX.addEventListener("click", () => {
    currentClass = xClass;
    board.classList.add(currentClass);
    options.classList.add('hide');
    board.classList.remove('hide');
    canvasCS.classList.add('hide');
    selectFirstPlayer.classList.remove("show");
})

selectPlayerO.addEventListener("click", () => {
    currentClass = oClass;
    board.classList.add(currentClass);
    options.classList.add('hide');
    board.classList.remove('hide');
    canvasCS.classList.add('hide');
    selectFirstPlayer.classList.remove("show");
})

/* --PLAYER ACTION ON CLICK-- */
const handleClick = (e) => {
    const cell = e.target;
    placeMark(cell, currentClass);
    if (checkwin(currentClass)) {
      winInnerText.innerHTML = `${currentClass} Wins!`;
      winningMessage.classList.add("show");
      updatedBoardStatus();
      updateMoves();
    } 
    else if (isDraw()) {
      winInnerText.innerHTML = `DRAW!`;
      winningMessage.classList.add("show");
    } 
    else {
      updatedBoardStatus();
      updateMoves();
      swapTurns();
    }
};
  
  /* --PLACE PLAYER MARK ON CELL-- */
const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
};
  
/*--SWAP TURNS, CHANGES BOARD CLASS-- */
const swapTurns = () => {
    if (currentClass === "X") {
      board.classList.remove("X");
      board.classList.add("Circle");
      currentClass = "Circle";
    } 
    else {
      board.classList.remove("Circle");
      board.classList.add("X");
      currentClass = "X";
    }
};
  
/* --ADD EVENTLISTENERS ON EVERY CELLS-- */
for (cell of cellElements) {
    cell.addEventListener("click", handleClick, { once: true });
}
  
/* --UPDATE BOARDSTATUS-- */
const updatedBoardStatus = () => {
    let row1 = [];
    let row2 = [];
    let row3 = [];
    let mark = "";
  
    for (let i = 0; i < cellElements.length; i++) {
      if (cellElements[i].classList.contains("X")) {
        mark = "x";
      } else if (cellElements[i].classList.contains("Circle")) {
        mark = "o";
      } else {
        mark = "";
      }
  
      if (i <= 2) {
        row1.push(mark);
      } else if (i > 2 && i < 6) {
        row2.push(mark);
      } else {
        row3.push(mark);
      }
    }
  
    history.push([row1, row2, row3]);
    console.log(history);
};
  
/* --UPDATE NUMBER OF MOVE-- */
const updateMoves = () => {
    move = history.length - 1;
    console.log(`number of move: ${move}`);
};
  
/* --CHECK FOR WINNER-- */
const checkwin = (currentClass) => {
    let x = document.querySelectorAll(".cell");
    return winningCombinations.some((combination) => {
      return combination.every((index) => {
        return x[index].classList.contains(currentClass);
      });
    });
};
  
/* --CHECK FOR DRAW START-- */
const isDraw = () => {
    return [...cellElements].every((cell) => {
      return cell.classList.contains("X") || cell.classList.contains("Circle");
    });
};
/* --CHECK FOR DRAW END-- */
  
/* --RESTART BUTTON START-- */
const restartFunction = () => {
    location.reload();
};
reset.addEventListener("click", restartFunction);
reset2.addEventListener("click", restartFunction);
/* --RESTART BUTTON END-- */
  
/* --CHECK MOVES BUTTON START-- */
checkMoves.addEventListener("click", () => {
    winningMessage.classList.remove("show");
    navigation.classList.add("show");
    nextMove.disabled = true;
    previousMove.disabled = false;
    for (cell of cellElements) {
      cell.removeEventListener("click", handleClick);
    }
  
    if (nextMove.disabled === true) {
      nextMove.style.cursor = "not-allowed";
    }
});
/* --CHECK MOVES BUTTON END-- */
  
/* --PREVIOUS MOVE-- */
previousMove.addEventListener("click", () => {
    nextMove.disabled = false;
    nextMove.style.cursor = "pointer";
    move = move - 1;
    updateBoardOnClick();
    console.log(history[move]);
    console.log(`number of move: ${move + 1}`);
    if (move < 1) {
      previousMove.disabled = true;
      previousMove.style.cursor = "not-allowed";
    }
});
/* --PREVIOUS MOVE END-- */
  
/* --NEXT MOVE-- */
nextMove.addEventListener("click", () => {
    previousMove.disabled = false;
    previousMove.style.cursor = "pointer";
    move = move + 1;
    updateBoardOnClick();
    console.log(history[move]);
    console.log(`number of move: ${move + 1}`);
    if (move === history.length - 1) {
      nextMove.disabled = true;
      nextMove.style.cursor = "not-allowed";
    }
});
/* --NEXT MOVE END-- */
  
/* --updateBoard function for previous & next move buttons-- */
const updateBoardOnClick = () => {
    board.innerHTML = "";
    console.log(history[move]);
    for (let i = 0; i < history[move].length; i++) {
      for (let j = 0; j < history[move][i].length; j++) {
        console.log(history[move][i][j]);
        let div = document.createElement("div");
        div.classList.add("cell");
  
        if (history[move][i][j] === "x") {
          div.classList.add("X");
        } else if (history[move][i][j] === "o") {
          div.classList.add("Circle");
        }
        board.append(div);
      }
    }
};