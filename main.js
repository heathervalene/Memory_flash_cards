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
    { id: 'hannibal2', value: 'Hannibal', img: 'images/hannibal.png' },
    { id: 'norman2', value: 'Norman', img: 'images/norman.png' },
    { id: 'patrick2', value: 'Patrick', img: 'images/patrick.png' },
    { id: 'vestat2', value: 'Vestat', img: 'images/Vestat.png' },
];


/*----- state variables -----*/

let isGameStarted = false;
let isBoardLocked = false;
let selectedCard = [];
let interval;
let seconds = 0;
let minutes = 0;



/*----- cached elements -----*/

const gameBoard = document.querySelector('.gameboard');
const playButton = document.getElementById('play');
const paButton = document.getElementById('PA_button');
const winnerMessage = document.getElementById('winner');
const allCards = document.querySelectorAll('.memory_card');
const timeValue = document.getElementById('time');
const flipSound = document.getElementById('flipSound');
const winSound = document.getElementById('winSound');
const timerSound = document.getElementById('timeClock');


/*----- event listeners -----*/

paButton.addEventListener('click', playAgain);
allCards.forEach((card) => {
    card.addEventListener('click', handleCardClick);
})




/*----- functions -----*/


function startGame() {
    isBoardLocked = false;
    winnerMessage.innerHTML = '';
    selectedCard = [];
    paButton.style.display = 'none';
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

function timeGenerator() {
    seconds += 1;
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<div>Time:</div>${minutesValue}:${secondsValue}`;
};


//dataset index I found on stack overflow
function handleCardClick(evt) {
    if (!isGameStarted) {
        seconds = 0;
        minutes = 0;
        timeValue.style.display = "block";
        timeGenerator()
        interval = setInterval(timeGenerator, 1000);
        isGameStarted = true;
        timerSound.play();
    }
    if (!isGameStarted || isBoardLocked) return;
    const clickedCard = evt.target;
    const cardIndex = parseInt(clickedCard.dataset.index);

    const isAlreadyMatched = !clickedCard.style.backgroundImage.includes(backFace);
    if (isAlreadyMatched) {
        return;
    }
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

        setTimeout(() => {
            card.style.backgroundImage = `url(${cardImage})`;
        }, 100);
        card.classList.toggle('flipped');

    } else {
        card.style.backgroundImage = `url(${backFace})`;
        card.classList.toggle('flipped');
    }
}

function playFlipSound() {
    flipSound.volume = 0.5;
    flipSound.play();
}


function checkMatch() {
    const [index1, index2] = selectedCard;
    const card1 = memoryCards[index1];
    const card2 = memoryCards[index2];
    if (card1.value === card2.value) {
        selectedCard = [];
        isBoardLocked = false;
        playFlipSound();
        checkWin();
    } else {
        flipBack();
    }
}


function flipBack() {
    setTimeout(() => {
        selectedCard.forEach(cardIndex => {
            const card = allCards[cardIndex];
            card.classList.toggle('flipped');
            setTimeout(() => {
                card.style.backgroundImage = `url(${backFace})`;
            }, 100);
        });
        selectedCard = [];
        isBoardLocked = false;
    }, 500);
}


//used chatGPT for the 'Array.from' method to help troubleshoot
function checkWin() {
    const allMatched = Array.from(allCards).every(card => {
        return !card.style.backgroundImage.includes(backFace);
    });
    if (allMatched) {
        isGameStarted = false;
        clearInterval(interval);

        let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
        let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
        let formattedTime = `${minutesValue}:${secondsValue}`;
        timeValue.style.display = 'none';
        winnerMessage.innerHTML = `You finished in ${formattedTime}. Try again for a faster time!`;
        paButton.style.display = 'block';
        flipSound.pause();
        timerSound.pause();
        winSound.play();
    }
}

function playAgain() {
    startGame();
}


startGame();


