const gameContainer = document.getElementById('gameContainer');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');

let score = 0;
let basketPosition = window.innerWidth / 2 - 50;

// Move the basket with arrow keys
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && basketPosition > 0) {
    basketPosition -= 20;
  } else if (e.key === 'ArrowRight' && basketPosition < window.innerWidth - 100) {
    basketPosition += 20;
  }
  basket.style.left = `${basketPosition}px`;
});

// Create falling stars
function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.left = `${Math.random() * window.innerWidth}px`;
  gameContainer.appendChild(star);

  let starPosition = 0;
  const starFall = setInterval(() => {
    if (starPosition > window.innerHeight - 70 && 
        star.offsetLeft > basket.offsetLeft && 
        star.offsetLeft < basket.offsetLeft + 100) {
      // Catching the star
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      gameContainer.removeChild(star);
      clearInterval(starFall);
    } else if (starPosition > window.innerHeight) {
      // Missed the star
      gameContainer.removeChild(star);
      clearInterval(starFall);
    } else {
      starPosition += 5;
      star.style.top = `${starPosition}px`;
    }
  }, 50);
}

// Generate stars at intervals
setInterval(createStar, 1000);
