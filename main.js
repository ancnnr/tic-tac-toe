//Modules and Template Functions

const game = (() => {

    let playerIndex = 0;
    const players = []

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

    const getActivePlayerName = () => {
        return players[playerIndex].getPlayerName();
    }

    const getActivePlayerChar = () => {
        return players[playerIndex].getPlayerChar();
    }

    const getAllPlayers = () => {
        return players;
    }

    const checkGame = () => {
        //returns -1 for no win or tie, 0 for tie game, 1 for player 1, 2 for player 2
    }

    const playerTurn = (r,c) => {
        //performs player turn logic for playerId. Returns false if unsuccessful, returns true and switches active player if successful
       
       if(gameBoard.isEmpty(r, c))
        {
            //do the turn
        }

        else 
        {
            return false;
        }

    }

    return { toggleActivePlayer, addPlayer, getActivePlayerName, getActivePlayerChar, getAllPlayers, checkGame, playerTurn };

})();;

const gameBoard = (() => {

    const gameArray = [['','',''],['','',''],['','',''],];

    const playX = (r,c) => {
        //places X at [r][c]
    }

    const playO = (r,c) => {
        //places o at [r][c]
    }

    const isEmpty = (r,c) => {
        //checks collision at [r][c] and returns true if empty, false if not
    }

    return { playX, playO, isEmpty };

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
    const gameContainer = document.getElementById('game-container');
    const newGameModal = document.getElementById('new-game-modal');
    const newGameForm = document.getElementById('new-game-form');
    const overlay = document.getElementById('overlay');


    const setEventListeners = () => {

        toggleBtn.onclick = showModal;
        overlay.onclick = hideModal;
        newGameForm.onsubmit = startGame;
    }

    const showModal = () => {
        console.log('this');
        newGameForm.reset();
        newGameModal.classList.add('active');
        overlay.classList.add('active');
    }

    const hideModal = () => {
        newGameModal.classList.remove('active');
        overlay.classList.remove('active');
    }


    const startGame = (e) => {

        e.preventDefault();

        const player1_name = document.getElementById('player1_name').value;
        const player2_name = document.getElementById('player2_name').value;


        game.addPlayer(Player(player1_name, 1));
        game.addPlayer(Player(player2_name, 2));

        hideModal();
    }


    const placeValue = (e) => {
        
    }



    return { setEventListeners, startGame };

})();



//Set up Event Listeners
uiFunctions.setEventListeners();


