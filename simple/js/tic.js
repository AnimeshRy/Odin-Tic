const game = () => {
    // getting all elements
    const boxes = [...document.getElementsByClassName("box")];
    const resBtn = document.getElementById("restartBtn");
    const playText = document.getElementById("playText");

    // storing values
    const spaces = [];
    const O_text = "O";
    const X_text = "X";
    let currentPlayer;

    const drawBoard = () => {
        // add border on every side needed
        boxes.forEach((box, index) => {
            let styleString = "";
            if (index < 3) {
                styleString += `border-bottom: 3px solid var(--purple);`;
            }
            if (index % 3 === 0) {
                styleString += `border-right: 3px solid var(--purple);`;
            }
            if (index % 3 === 2) {
                styleString += `border-left: 3px solid var(--purple);`;
            }
            if (index > 5) {
                styleString += `border-top: 3px solid var(--purple);`;
            }
            box.style = styleString;
            box.addEventListener("click", boxClicked);
        });
    };

    // add text on divs
    const boxClicked = (e) => {
        const id = e.target.id;
        if (!spaces[id]) {
            spaces[id] = currentPlayer;
            e.target.innerText = currentPlayer;

            if (playerHasWon()) {
                playText.innerText = `${currentPlayer} has won!`;
                return;
            }
            if (checkTie()) {
                playText.innerText = `It's Tie`;
                return;
            }
            currentPlayer = currentPlayer === O_text ? X_text : O_text;
        }
    };

    const checkTie = () => {
        let count = 0;
        spaces.forEach((space) => {
            if (["X", "O"].includes(space)) {
                count++;
            }
        });
        if (count >= 9) return true;
    };

    // check all cases of win
    const playerHasWon = () => {
        if (
            (spaces[6] === currentPlayer &&
                spaces[7] === currentPlayer &&
                spaces[8] === currentPlayer) ||
            (spaces[3] === currentPlayer &&
                spaces[4] === currentPlayer &&
                spaces[5] === currentPlayer) ||
            (spaces[0] === currentPlayer &&
                spaces[1] === currentPlayer &&
                spaces[2] === currentPlayer) ||
            (spaces[0] === currentPlayer &&
                spaces[4] === currentPlayer &&
                spaces[8] === currentPlayer) ||
            (spaces[2] === currentPlayer &&
                spaces[4] === currentPlayer &&
                spaces[6] === currentPlayer) ||
            (spaces[0] === currentPlayer &&
                spaces[3] === currentPlayer &&
                spaces[6] === currentPlayer) ||
            (spaces[1] === currentPlayer &&
                spaces[4] === currentPlayer &&
                spaces[7] === currentPlayer) ||
            (spaces[2] === currentPlayer &&
                spaces[5] === currentPlayer &&
                spaces[8] === currentPlayer)
        )
            return true;
    };

    // initilize spaces with null 
    const restart = () => {
        spaces.forEach((space, index) => {
            spaces[index] = null;
        });
        boxes.forEach((box) => {
            box.innerText = "";
        });
        playText.innerText = `Let's Play!'`;
        currentPlayer = O_text;
    };
    resBtn.addEventListener("click", restart);

    // startup
    restart();
    drawBoard();
}

game()