const headingText = document.querySelector(".heading");
const board = document.querySelector(".board");
const boxes = Array.from(document.querySelectorAll(".box"));
const restartBtn = document.querySelector(".restart");

/////////////////////////////////////////

const moveTracker = ["", "", "", "", "", "", "", "", ""];
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = O_TEXT;

//WINNINT COMBINATIONS

const winningCombinations = [
  { combo: [0, 1, 2] },
  { combo: [3, 4, 5] },
  { combo: [6, 7, 8] },

  { combo: [0, 3, 6] },
  { combo: [1, 4, 7] },
  { combo: [2, 5, 8] },

  { combo: [0, 4, 8] },
  { combo: [2, 4, 6] },
];

// WHEN BOX IS 'CLICKED'

const boxClicked = (e) => {
  const id = e.target.id;

  if (!moveTracker[id]) {
    moveTracker[id] = currentPlayer;

    e.target.innerText = currentPlayer;

    if (playerHasWon()) {
      headingText.innerText = `${currentPlayer} has won!!`;
      headingText.style.color = "blue";

      return;
    }
    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", boxClicked);
});

// CHANKING WINNING

const playerHasWon = () => {
  for (const winCombination of winningCombinations) {
    const combo = winCombination.combo;

    const boxValue1 = moveTracker[combo[0]];
    const boxValue2 = moveTracker[combo[1]];
    const boxValue3 = moveTracker[combo[2]];

    if (boxValue1 != "" && boxValue1 === boxValue2 && boxValue2 === boxValue3) {
      return true;
    }
  }
};

// RESTART GAME

restartBtn.addEventListener("click", function () {
  moveTracker.fill("");
  /////// OR ///////
  //   moveTracker.forEach((move, index) => {
  //     moveTracker[index] = "";
  //   });
  boxes.forEach((box) => {
    box.innerText = " ";
  });
  headingText.innerText = "Tic Tac Toe";
  headingText.style.color = "black";
});
