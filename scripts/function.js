const init = (player, Opponent) => {
    // Board Class names
    const canvas = document.getElementById("boardCVS");
    const context = canvas.getContext("2d");

    // Board 2D Array Initialization
    let ticTacToeBoard = [];
    const row = 3;
    const col = 3;
    const space = 150;

    // Player's Moves Array
    let gameData = new Array(9);

    let curPlayer = player.man;

    const xImage = new Image();
    xImage.src = 'assets/X.png';
    
    const oImage = new Image();
    oImage.src = 'assets/O.png';

    // Winning Combinations Array
    const WinCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Is Game Over?
    let game_over = false;

    // Board 2D Array Looping/Generating/Drawing
    let printBoard = () => {
        let id = 0;
        for (let i = 0; i < row; i++) {
            ticTacToeBoard[i] = [];
            for (let j = 0; j < col; j++) {
                ticTacToeBoard[i][j] = id;
                id++;
                context.strokeRect(j * space, i * space,  space, space);
            }
        }
    }
    printBoard();

    // Player Moves when clicked
    canvas.addEventListener('click', (event) => {
        // if game is over, then return to exit
        if(game_over) return;

        let X = event.clientX - canvas.getBoundingClientRect().x;
        let Y = event.clientY - canvas.getBoundingClientRect().y;

        let i = Math.floor(Y/space);
        let j = Math.floor(X/space);

        let id = ticTacToeBoard[i][j];

        if(gameData[id]) return;

        gameData[id] = curPlayer;

        // Draw the player's move on the board
        printOnBoard(curPlayer, i, j);

        // Player won?
        if(isWinner(gameData, curPlayer)) {
            showGameOver(curPlayer);
            game_over = true;
            return;
        }

        // Tie?
        if(isTie(gameData)) {
            showGameOver("TIE!");
            game_over = true;
            return;
        }

        // When PC is clicked
        if(Opponent === 'PC') {
            let id = minimax(gameData, player.pc).id;

            // Store Player's Move
            gameData[id] = player.pc;

            let spaceCVS = getIJ(id);

            // Draw the move on the boardCVS
            printOnBoard(player.pc, spaceCVS.i, spaceCVS.j);

            // Player won?
            if(isWinner(gameData, player.pc)) {
                showGameOver(player.pc);
                game_over = true;
                return;
            }

            // Tie?
            if(isTie(gameData)) {
                showGameOver("TIE!");
                game_over = true;
                return;
            }
        }
        else {
            // Next Player's Turn
            curPlayer = curPlayer === player.man ? player.local : player.man;
        }

    });

    // Minimax AI

    const minimax = (gameData, PLAYER) => {
        // Base
        if(isWinner(gameData, player.pc)) return {evaluation : +10};
        if(isWinner(gameData, player.man)) return {evaluation : -10};
        if(isTie(gameData)) return {evaluation : 0};

        // Looking for Empty Spaces
        let empy_space = getEmptySpaces(gameData);

        // Save all moves and evaluation values
        let moves = [];

        // Loop over the empty spaces to evaluate 
        for(let i = 0; i < empy_space.length; i++) {
            let id = empy_space[i];
            let backUp = gameData[id];
            // Move the player
            gameData[id] = PLAYER;
            // Save the move's id and evaluation
            let move = {};
            move.id = id;
            // Moving the evaluation
            if(PLAYER === player.pc) {
                move.evaluation = minimax(gameData, player.man).evaluation;
            }
            else {
                move.evaluation = minimax(gameData, player.pc).evaluation;
            }

            // Restoring space
            gameData[id] = backUp;
            moves.push(move);
        }

        // Minimax Algorithm
        let bestMove;

        if(PLAYER === player.pc) {
            // maximizer
            let bestEval = -Infinity;
            for(let i = 0; i < moves.length; i++) {
                if(moves[i].evaluation > bestEval) {
                    bestEval = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }
        else {
            // minimizer
            let bestEval = +Infinity;
            for (let i = 0; i < moves.length; i++) {
                if(moves[i].evaluation < bestEval) {
                    bestEval = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }

        return bestMove;
    }

    // Getting Empty Spaces
    const getEmptySpaces = (gameData) => {
        let empty = [];

        for(let id = 0; id < gameData.length; id++) {
            if(!gameData[id]) empty.push(id);
        }

        return empty;
    }

        // Getting i and j a Space
    const getIJ = (id) => {
        for(let i = 0; i < ticTacToeBoard.length; i++) {
            for(let j = 0; j < ticTacToeBoard[i].length; j++) {
                if(ticTacToeBoard[i][j] === id) return {i:i,j:j}
            }
        }
    }

    // Checking for Winner
    const isWinner = (gameData, player) => {
        for(let i = 0; i < WinCombos.length; i++) {
            let won = true;

            for(let j = 0; j < WinCombos[i].length; j++) {
                let id = WinCombos[i][j];
                won = gameData[id] === player && won;
            }

            if(won) {
                return true;
            }
        }
        return false;
    }

    // Tie?
    const isTie = (gameData) => {
        let isBoardFill = true;
        for(let i = 0; i < gameData.length; i++) {
            isBoardFill = gameData[i] && isBoardFill;
        }
        if(isBoardFill) {
            return true;
        }
        return false;
    }

    // Show Game Over
    const showGameOver = (player) => {
        let message = player === "TIE!" ? "Tie!" : "The Winner is: ";
        let imgSrc = `assets/${player}win.png`;

        gameOver.innerHTML = 
        `
            <h1>${message}</h1>
            <img class = "winner-img" src = ${imgSrc} </img>
            <div class = "play" onclick = "location.reload()">Play Again?</div>
        `;
        gameOver.classList.remove('hide');
        whoseTurn.classList.add('hide');
    }

    // Draw the board Again
    const printOnBoard = (player, i, j) => {
        let turnMove = player === 'X' ? nextTurn.textContent = "O's Turn" : nextTurn.textContent = "X's Turn";
        let symImg = player === 'X' ? xImage : oImage;
        context.drawImage(symImg, j * space, i * space);
    }
}