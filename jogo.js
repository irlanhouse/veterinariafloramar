const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchCount = 0;
const totalPairs = 4;
const message = document.getElementById('message');

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
  let isMatch = firstCard.dataset.character === secondCard.dataset.character;

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
  firstCard.removeEventListener('touchstart', flipCard);
  secondCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('touchstart', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

// Inicializa
shuffle();

cards.forEach(card => {
  card.addEventListener('click', flipCard);
  card.addEventListener('touchstart', flipCard, { passive: true });
});

// Botão reiniciar
document.getElementById('restartButton').addEventListener('click', () => {
  matchCount = 0;
  message.textContent = '';

  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flip
