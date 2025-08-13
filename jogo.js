const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchCount = 0;
const totalPairs = 4;
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.character === secondCard.dataset.character;

  if (isMatch) {
    message.textContent = "✅ Acertou!";
    disableCards();
    matchCount++;
    if (matchCount === totalPairs) {
      setTimeout(() => {
        message.textContent = "🎉 Você venceu!";
      }, 500);
    }
  } else {
    message.textContent = "";
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 800);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

(function init() {
  shuffle();
  cards.forEach(card => card.addEventListener('click', flipCard));
})();

restartButton.addEventListener('click', () => {
  matchCount = 0;
  message.textContent = '';
  
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  setTimeout(shuffle, 400);
});
