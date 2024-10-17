document.addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector(".grid");
    const scoreDisplay = document.querySelector("#score");
    const resultDisplay = document.querySelector("#result");
    const width = 4;
    let squares = [];
    let score = 0;
    let hasWon = false;

    // Create the playing board

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement("div");
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }
    createBoard();

    //generate a new random number
    function generate() {
        let zeros = squares.filter((square) => square.innerHTML == 0);
        if (zeros.length === 0) {
            return;
        }

        const randomNumber = Math.floor(Math.random() * zeros.length);
        if (zeros[randomNumber]) {
            zeros[randomNumber].innerHTML = 2;
        }
        checkForGameOver();
    }

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [
                    parseInt(totalOne),
                    parseInt(totalTwo),
                    parseInt(totalThree),
                    parseInt(totalFour),
                ];

                let filteredRow = row.filter((num) => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [
                    parseInt(totalOne),
                    parseInt(totalTwo),
                    parseInt(totalThree),
                    parseInt(totalFour),
                ];

                let filteredRow = row.filter((num) => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width * 2].innerHTML;
            let totalFour = squares[i + width * 3].innerHTML;
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour),
            ];

            let filteredColumn = column.filter((num) => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + width * 2].innerHTML = newColumn[2];
            squares[i + width * 3].innerHTML = newColumn[3];
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width * 2].innerHTML;
            let totalFour = squares[i + width * 3].innerHTML;
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour),
            ];

            let filteredColumn = column.filter((num) => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + width * 2].innerHTML = newColumn[2];
            squares[i + width * 3].innerHTML = newColumn[3];
        }
    }

    function combineRow() {
        if (hasWon) return;

        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedTotal =
                    parseInt(squares[i].innerHTML) +
                    parseInt(squares[i + 1].innerHTML);

                if (combinedTotal === 2048) {
                    // Endret fra >= til ===
                    resultDisplay.innerHTML = "You Win!";
                    hasWon = true;
                    document.removeEventListener("keydown", control);
                    return true;
                }

                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
        return false;
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedTotal =
                    parseInt(squares[i].innerHTML) +
                    parseInt(squares[i + width].innerHTML);

                if (combinedTotal === 2048) {
                    // Endret fra >= til ===
                    resultDisplay.innerHTML = "You Win!";
                    hasWon = true;
                    document.removeEventListener("keydown", control);
                    return true;
                }

                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
        return false;
    }

    //asign functions to keys

    function control(e) {
        if (e.key === "ArrowLeft") {
            keyLeft();
        } else if (e.key === "ArrowRight") {
            keyRight();
        } else if (e.key === "ArrowUp") {
            keyUp();
        } else if (e.key === "ArrowDown") {
            keyDown();
        }
    }

    document.addEventListener("keydown", control);

    function keyLeft() {
        if (hasWon) return;
        moveLeft();
        let wonGame = combineRow(); // Endret variabelnavn fra hasWon til wonGame
        moveLeft();
        generate();
        if (!wonGame) {
            checkForWin();
        }
    }

    function keyRight() {
        if (hasWon) return;
        moveRight();
        let wonGame = combineRow(); // Endret variabelnavn fra hasWon til wonGame
        moveRight();
        generate();
        if (!wonGame) {
            checkForWin();
        }
    }

    function keyUp() {
        if (hasWon) return;
        moveUp();
        let wonGame = combineColumn(); // Endret variabelnavn fra hasWon til wonGame
        moveUp();
        generate();
        if (!wonGame) {
            checkForWin();
        }
    }

    function keyDown() {
        if (hasWon) return;
        moveDown();
        let wonGame = combineColumn(); // Endret variabelnavn fra hasWon til wonGame
        moveDown();
        generate();
        if (!wonGame) {
            checkForWin();
        }
    }

    //check for the nr 2048 in the squares to win the game
    function checkForWin() {
        if (hasWon) return;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == "2048") {
                resultDisplay.innerHTML = "You Win!";
                hasWon = true;
                document.removeEventListener("keydown", control);
                setTimeout(clear, 3000);
            }
        }
    }

    //check if there are no zero left
    function checkForGameOver() {
        if (hasWon) return;
        let zeros = squares.filter((square) => square.innerHTML == 0);
        if (zeros.length === 0) {
            let gameOver = true;
            for (let i = 0; i < squares.length; i++) {
                if (
                    (i % 4 !== 3 &&
                        squares[i].innerHTML === squares[i + 1]?.innerHTML) ||
                    (i < 12 &&
                        squares[i].innerHTML === squares[i + 4]?.innerHTML)
                ) {
                    gameOver = false;
                    break;
                }
            }
            if (gameOver) {
                resultDisplay.innerHTML = "You Lose!";
                document.removeEventListener("keydown", control);
            }
        }
    }

    function clear() {
        clearInterval(myTimer);
    }

    //add colours
    function addColours() {
        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) {
                console.error(`Square ${i} is not defined!`);
                continue;
            }
            if (squares[i].innerHTML == 0)
                squares[i].style.backgroundColor = "#00ffaa";
            else if (squares[i].innerHTML == 2)
                squares[i].style.backgroundColor = "#ff007f";
            else if (squares[i].innerHTML == 4)
                squares[i].style.backgroundColor = "#ffcc00";
            else if (squares[i].innerHTML == 8)
                squares[i].style.backgroundColor = "#ff5733";
            else if (squares[i].innerHTML == 16)
                squares[i].style.backgroundColor = "#ff33ff";
            else if (squares[i].innerHTML == 32)
                squares[i].style.backgroundColor = "#33ffcc";
            else if (squares[i].innerHTML == 64)
                squares[i].style.backgroundColor = "#ff5050";
            else if (squares[i].innerHTML == 128)
                squares[i].style.backgroundColor = "#ffcc33";
            else if (squares[i].innerHTML == 256)
                squares[i].style.backgroundColor = "#aaff00";
            else if (squares[i].innerHTML == 512)
                squares[i].style.backgroundColor = "#66ff66";
            else if (squares[i].innerHTML == 1024)
                squares[i].style.backgroundColor = "#33ccff";
            else if (squares[i].innerHTML == 2048)
                squares[i].style.backgroundColor = "#9933ff";
        }
    }

    //  addColours();

    let myTimer = setInterval(addColours, 50);
    console.log("Current squares:", squares);
    console.log("Result display:", resultDisplay);
});
