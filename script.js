const Gameboard = (function (){
    box = ["","","","","","","","",""];

    function inputMark (mark,index) {
        if(box[index] === "") {
            box[index] = mark;
        }
    }

    function checkWin(mark) {
        pattern = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for(i = 0; i < pattern.length; i++) {
           if(box[pattern[i][0]] == mark &&
              box[pattern[i][1]] == mark &&
              box[pattern[i][2]] == mark )  {
                return true;

            }

        }
        return false;
    }

    function checkTie () {
        if(box.every(cell => cell !== "")) {
            return true;
        }
        return false;
    }

    function grid() {
        return box;
    }
    function resetBox() {
        for(i = 0; i < 9; i++) {
            box[i] = "";
            
        }
    }
    return {
        inputMark,
        checkWin,
        checkTie,
        grid,
        resetBox
    }
})()

const GameControll= (function () {
    const result = document.querySelector(".result");
    let currentPlayer;
    let gameOver = false;
   

    function startGame(playerX) {
        currentPlayer = playerX;
        Gameboard.resetBox();
        result.textContent = ""
        gameOver = false
        displayBox();
    }


    function switchPlayer(playerX,playerO) {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    }


    function playGame(index,playerX,playerO) {
        if(gameOver) {
            return;
        }
        Gameboard.inputMark(currentPlayer.mark, index);
        displayBox();

        if(Gameboard.checkWin(currentPlayer.mark)) {
            
            result.textContent = `${currentPlayer.name} Won`;
            gameOver = true

        }

        if(Gameboard.checkTie()) {
            result.textContent = `Its a tie`;
            gameOver = true
        }

        switchPlayer(playerX,playerO);
    }

    function displayBox() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell,index) => {
            cell.textContent = Gameboard.grid()[index];
        })
    }
    return {
        startGame,
        playGame,
    }

})();

const cells = document.querySelectorAll(".cell");
function Player(name, mark) {
    return {
        name,
        mark
    };
}
const playerX = Player("Player1" , "X");
const playerO = Player("Player2", "O")

cells.forEach((cell,index) => {
    cell.addEventListener("click", () => {
        GameControll.playGame(index,playerX,playerO);
    })
})


GameControll.startGame(playerX);

const reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
    GameControll.startGame(playerX);
})