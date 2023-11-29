/*----- constants -----*/

const backFace = 'images/back.png';
const memoryCards = [
    { id: 'freddy', value: 'Freddy', img: 'images/freddy.png' },
    { id: 'ghost', value: 'Ghost', img: 'images/ghost.png' },
    { id: 'hannibal', value: 'Hannibal', img: 'images/hannibal.png' },
    { id: 'norman', value: 'Norman', img: 'images/norman.png' },
    { id: 'patrick', value: 'Patrick', img: 'images/patrick.png' },
    { id: 'vestat', value: 'Vestat', img: 'images/Vestat.png' },
    { id: 'freddy2', value: 'Freddy', img: 'images/freddy.png' },
    { id: 'ghost2', value: 'Ghost', img: 'images/ghost.png' },
    { id: 'hannibal2', value: 'Hannible', img: 'images/hannibal.png' },
    { id: 'norman2', value: 'Norman', img: 'images/norman.png' },
    { id: 'patrick2', value: 'Patrick', img: 'images/patrick.png' },
    { id: 'vestat2', value: 'Vestat', img: 'images/Vestat.png' },
];


/*----- state variables -----*/

let isGameStarted = false;
let isBoardLocked = false;
let selectedCard = [];


/*----- cached elements -----*/

const gameBoard = document.querySelector('.gameboard');
const playButton = document.getElementById('play');
const backhomeButton = document.getElementById('backhome');
const paButton = document.getElementById('PA_button');
const winnerMessage = document.getElementById('winner');
const cardEl = document.querySelectorAll('.memory_card');


/*----- event listeners -----*/

//playButton.addEventListener('click', startGame);
//backhomeButton.addEventListener('click', playAgain);
//paButton.addEventListener('click', playAgain);
//gameBoard.addEventListener('click', handleCardClick);



/*----- functions -----*/

function startGame () {
    isGameStarted = true;
    isBoardLocked = false;
    winnerMessage.innerHTML = '';
    selectedCard = [];
    shuffleCards();
    renderBoard();
}


//used the Fisher-yates shuffle algorithm found on fullstack
function shuffleCards (memoryCards) {
    for (let i = memoryCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [memoryCards[i], memoryCards[j]] = [memoryCards[j], memoryCards[i]];
    }
}


