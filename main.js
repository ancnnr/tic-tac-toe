//Modules and Template Functions

const game = (() => {

    let playerIndex = 0;
    let players = []

    const toggleActivePlayer = () => {
        if(playerIndex==0)
        {
            playerIndex = 1;
        }
        else {
            playerIndex = 0;
        }
    }

    const addPlayer = (player) => {
        players.push(player);
    }

    const getActivePlayerChar = () => {
        return players[playerIndex].getPlayerChar();
    }

    const gameOverTie = () => {
        uiFunctions.showGameOverModal(0);
    }

    const gameOverWin = (winner) => {
        uiFunctions.showGameOverModal(1, winner);
    }

    const resetCurrentGame = () => {
        gameBoard.resetGameBoard();
        playerIndex = 0;
    }

    const newGame = () => {
        resetCurrentGame();
        players = [];
    }

    const playerTurn = (e) => {
        //performs player turn logic for playerId. Returns false if unsuccessful, returns true and switches active player if successful
        const r = e.target.getAttribute('data-row');
        const c = e.target.getAttribute('data-col');

       if(gameBoard.isEmpty(r, c))
        {
            gameBoard.playToken(r, c, getActivePlayerChar());
            uiFunctions.placeValue(e, getActivePlayerChar());
            const gameState = gameBoard.checkWin();

            if(gameState==-1)
            {
                toggleActivePlayer();
            }

            else if(gameState==0)
            {
                //tie game
                gameOverTie();
            }

            else if(gameState == 1 || gameState ==2)
            {
                //player 1 wins
                gameOverWin(players[playerIndex].getPlayerName());
            }
            
        }

        else 
        {
            return false;
        }

    }

    return { addPlayer, getActivePlayerChar, playerTurn, resetCurrentGame, newGame };

})();;

const gameBoard = (() => {

    let gameArray = [['','',''],['','',''],['','',''],];

    const resetGameBoard = () => {
        gameArray = [['','',''],['','',''],['','',''],];
    }

    const playToken = (r,c, token) => {
        //places active token at [r][c]
        gameArray[r][c] = token;
    }

    const isEmpty = (r,c) => {
        //checks collision at [r][c] and returns true if empty, false if not
        if(gameArray[r][c] == '')
        {
            return true;
        }
        else 
        {
            return false;
        }
    }

    const checkWin = () => {
        //return -1 for no win or tie
        //return 0 for tie
        //return 1 or 2 for a winner
        let emptyCount = 9;

        gameArray.forEach((r) => {
            r.forEach((c) => {
                if(c!='')
                {
                    emptyCount--;
                }
            })
        })

        if(emptyCount == 0)
        {
            return 0;
        }


        if(gameArray[0][0] != '' && gameArray[0][0] == gameArray[0][1] && gameArray[0][1] == gameArray[0][2])
        {
            if(gameArray[0][0]=='X')
            {
                return 1;
            }

            else 
            {
                return 2;
            }
        }

        else if(gameArray[1][0] != '' && gameArray[1][0] == gameArray[1][1] && gameArray[1][1] == gameArray[1][2])
        {
            if(gameArray[1][0]=='X')
            {
                return 1;
            }

            else 
            {
                return 2;
            }
        }

        else if(gameArray[2][0] != '' && gameArray[2][0] == gameArray[2][1] && gameArray[2][1] == gameArray[2][2])
        {
            if(gameArray[2][0]=='X')
            {
                return 1;
            }

            else 
            {
                return 2;
            }
        }

        else if(gameArray[0][0] != '' && gameArray[0][0] == gameArray[1][0] && gameArray[1][0] == gameArray[2][0])
        {
            if(gameArray[0][0]=='X')
            {
                return 1;
            }

            else 
            {
                return 2;
            }
        }

        else if(gameArray[0][1] != '' && gameArray[0][1] == gameArray[1][1] && gameArray[1][1] == gameArray[2][1])
        {
            if(gameArray[1][0]=='X')
            {
                return 1;
            }

            else 
            {
                return 2;
            }
        }

        else if(gameArray[2][0] != '' && gameArray[2][0] == gameArray[2][1] && gameArray[2][1] == gameArray[2][2])
        {
            if(gameArray[2][0]=='X')
            {
                return 1;
            }

            else 
            {
                return 2;
            }
        }
        
        else if(gameArray[0][0] != '' && gameArray[0][0] == gameArray[1][1] && gameArray[1][1] == gameArray[2][2])
        {
            if(gameArray[0][0]=='X')
            {
                return 1;
            }

            else 
            {
                return 2;
            }
        }
        
        else if(gameArray[0][2] != '' && gameArray[0][2] == gameArray[1][1] && gameArray[1][1] == gameArray[2][0])
        {
            if(gameArray[0][2]=='X')
            {
                return 1;
            }

            else 
            {
                return 2;
            }
        }
        
        else {
            return -1
        }
    }


    return { playToken, isEmpty, resetGameBoard, checkWin };

})();


const Player = (name, id) => {

    
    const playerChar = id==1 ? 'X' : 'O';
    const playerName = name;

    const getPlayerChar = () => { return playerChar };

    const getPlayerName = () => { return playerName };

    return { getPlayerChar, getPlayerName };

}


const uiFunctions = (() => {

    // DOM and UI Elements

    const toggleBtn = document.getElementById('toggle-form');
    const newGameModal = document.getElementById('new-game-modal');
    const newGameForm = document.getElementById('new-game-form');
    const overlay = document.getElementById('overlay');
    const gameBoxes = document.querySelectorAll('.game-box');
    const gameOverModal = document.getElementById('game-over-modal');
    const gameResults = document.getElementById('game-results');
    const replayButton = document.getElementById('replay-btn');
    const newGameButton = document.getElementById('new-game-btn');
    const player1Name = document.getElementById('player-info-p1-name');
    const player1Header = document.getElementById('player-info-p1-header');
    const player2Name = document.getElementById('player-info-p2-name');
    const player2Header = document.getElementById('player-info-p2-header');


    const setEventListeners = () => {

        toggleBtn.onclick = showNewGameModal;
        overlay.onclick = hideNewGameModal;
        newGameForm.onsubmit = startGame;
        replayButton.onclick = replayGame;
        newGameButton.onclick = startNewGame;

        setNoGameListeners();
    }

    const setActiveGameListeners = () => {
        gameBoxes.forEach((gb) => {
            gb.onclick = game.playerTurn;
            gb.classList.remove('inactive');
        })
    }

    const setNoGameListeners = () => {
        gameBoxes.forEach((gb) => {
            gb.onclick = '';
            gb.classList.add('inactive');
        })
    }

    const showNewGameModal = () => {
        newGameForm.reset();
        newGameModal.classList.add('active');
        overlay.classList.add('active');
    }

    const hideNewGameModal = () => {
        newGameModal.classList.remove('active');
        overlay.classList.remove('active');
    }

    const showGameOverModal = (winState, name='') => {

        
        const gameWinnerContainer = document.createElement('div');

        if(winState==0)
        {
            //tie game
            const gameTieHeader = document.createElement('h1');
            gameTieHeader.textContent = "Tie Game";
            gameWinnerContainer.append(gameTieHeader);
        }

        else {
            //name is the winner
            const gameWinHeader = document.createElement('h1');
            gameWinHeader.textContent = `Winner: ${name}`;
            gameWinnerContainer.append(gameWinHeader);
        }

        gameResults.append(gameWinnerContainer);
        gameOverModal.classList.add('active');
        overlay.classList.add('active');
        overlay.onclick = '';
    }

    const hideGameOverModal = () => {
        gameOverModal.classList.remove('active');
        overlay.onclick = hideNewGameModal;
        overlay.classList.remove('active');
    }


    const startGame = (e) => {

        e.preventDefault();
        game.newGame();
        clearGameDOM();

        //grab player names from form
        const player1_name = document.getElementById('player1_name').value;
        const player2_name = document.getElementById('player2_name').value;

        //add player names to the dom
        player1Name.textContent = player1_name;
        player1Header.textContent = 'X: '
        player2Name.textContent = player2_name;
        player2Header.textContent = 'O: '

        //create player objects
        game.addPlayer(Player(player1_name, 1));
        game.addPlayer(Player(player2_name, 2));

        //set up listeners and start game
        setActiveGameListeners();
        hideNewGameModal();
    }

    const startNewGame = () => {
        game.newGame();
        clearGameDOM();
        
        player1Name.textContent = '';
        player1Header.textContent = '';
        player2Name.textContent = '';
        player2Header.textContent = '';

        hideGameOverModal();
        setNoGameListeners();
        showNewGameModal();
    }

    const clearGameDOM = () => {
        gameBoxes.forEach((gb) => {
            gb.textContent = '';
        })

        removeAllChildNodes(gameResults);

    }

    const replayGame = () => {
        game.resetCurrentGame();
        clearGameDOM();
        hideGameOverModal();
    }

    const placeValue = (e, token) => {
        e.target.textContent = token;
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }



    return { setEventListeners, placeValue, showGameOverModal };

})();



//Set up Event Listeners
uiFunctions.setEventListeners();


