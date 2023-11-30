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
const allCards = document.querySelectorAll('.memory_card');





/*----- event listeners -----*/

paButton.addEventListener('click', playAgain);
allCards.forEach((card) => {
    card.addEventListener('click', handleCardClick);
}
)



/*----- functions -----*/

//need a start game button to initialize 
function startGame() {
    isGameStarted = true;
    isBoardLocked = false;
    winnerMessage.innerHTML = '';
    selectedCard = [];
    shuffleCards();
    renderGame();
}



//used the Fisher-yates shuffle algorithm found on stack overflow
function shuffleCards() {
    for (let i = memoryCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [memoryCards[i], memoryCards[j]] = [memoryCards[j], memoryCards[i]];
    }
}

function renderGame() {
    memoryCards.forEach((card, index) => {
        const cardEl = document.getElementById(card.id);
        if (cardEl) {
            cardEl.style.backgroundImage = `url(${backFace})`
        }
    })
}

//dataset index I found on stack overflow
function handleCardClick(evt) {
    if (!isGameStarted || isBoardLocked) return;
    const clickedCard = evt.target;
    const cardIndex = parseInt(clickedCard.dataset.index);


    if (selectedCard.length < 2 && !selectedCard.includes(cardIndex)) {
        selectedCard.push(cardIndex);
        flipCard(clickedCard);

        if (selectedCard.length === 2) {
            isBoardLocked = true;
            setTimeout(checkMatch, 1000)
        }
    }
}

function flipCard(card) {
    if (card.style.backgroundImage.includes(backFace)) {
        let cardImage = memoryCards[card.dataset.index].img
        card.style.backgroundImage = `url(${cardImage})`;

    } else {
        card.style.backgroundImage = `url(${backFace})`;
    }
}

function checkMatch() {
    const [index1, index2] = selectedCard;
    const card1 = memoryCards[index1];
    const card2 = memoryCards[index2];

    if (card1.value === card2.value) {
        selectedCard = [];
        isBoardLocked = false;
    } else {
        flipBack();
    }
}

function flipBack() {
    setTimeout(() => {
        selectedCard.forEach(cardIndex => {
            const card = allCards[cardIndex];
            card.style.backgroundImage = `url(${backFace})`;
        });
        selectedCard = [];
        isBoardLocked = false;
    }, 1000);
}


//function checkWin(){}

function playAgain() {
    startGame();
}




startGame();


