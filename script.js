const cards = document.querySelectorAll('.card');
const timeTag = document.querySelector('.time b');
const flipsTag = document.querySelector('.flips b');
const refreshBtn = document.querySelector('.details button');

let maxTime = 60;
let timeLeft = maxTime;
let flips = 0;
let matchedCards = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        return;
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({ target: clickedCard }) {
    if (!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }

    if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add('flip');

        if (!cardOne) {
            return cardOne = clickedCard;
        }

        cardTwo = clickedCard;
        disableDeck = true;

        let cardOneIcon = cardOne.querySelector('.back-view i').classList.value;
        let cardTwoIcon = cardTwo.querySelector('.back-view i').classList.value;

        matchCards(cardOneIcon, cardTwoIcon);
    }
}

function matchCards(icon1, icon2) {
    if (icon1 === icon2) {
        matchedCards++;
        if (matchedCards == 6 && timeLeft > 0) {
            clearInterval(timer);
        }
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = '';
        disableDeck = false;
        return;
    }

    setTimeout(() => {
        cardOne.classList.add('shake');
        cardTwo.classList.add('shake');
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove('shake', 'flip');
        cardTwo.classList.remove('shake', 'flip');
        cardOne = cardTwo = '';
        disableDeck = false;
    }, 1200);
}

function shuffleCards() {
    timeLeft = maxTime;
    flips = matchedCards = 0;
    cardOne = cardTwo = '';
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = ['bxl-tiktok', 'bxl-instagram-alt', 'bxl-facebook-circle', 'bxl-twitter', 'bxl-whatsapp', 'bxl-youtube'];
    arr = [...arr, ...arr]; // Duplicate the array for pairs
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove('flip');
        let iconTag = card.querySelector('.back-view i');
        setTimeout(() => {
            iconTag.classList.value = `bx ${arr[index]}`;
        }, 500);
        card.addEventListener('click', flipCard);
    });
}

shuffleCards();

refreshBtn.addEventListener('click', shuffleCards);

cards.forEach(card => {
    card.addEventListener('click', flipCard);
});

