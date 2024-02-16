const player = document.getElementById('player');
const scoreSpan = document.getElementById('score');
const gameContainer = document.getElementById('game-container');
let score = 0;

function createBomb() {

    const bomb = document.createElement('img');
    bomb.src = 'bomb.png';
    bomb.classList.add('bomb');
    const playerRect = player.getBoundingClientRect();
    bomb.style.left = Math.random() * (gameContainer.offsetWidth - 20) + 'px';
    bomb.style.top = '90px';
    gameContainer.appendChild(bomb);
    setTimeout(() => {
        bomb.remove();
        updateScore();
    }, 1800);
}

function checkCollision() {
    const bombs = document.querySelectorAll('.bomb');

    bombs.forEach(bomb => {
        const bombRect = bomb.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if (
            playerRect.left < bombRect.right &&
            playerRect.right > bombRect.left &&
            playerRect.top < bombRect.bottom &&
            playerRect.bottom > bombRect.top
        ) {
            alert('Game Over! Your final score is: ' + score);
            resetGame();
        }
    });
}

function resetGame() {
    score = 0;
    scoreSpan.textContent = score;
    document.querySelectorAll('.bomb').forEach(bomb => bomb.remove());
}

function moveBombs() {
    const bombs = document.querySelectorAll('.bomb');
    bombs.forEach(bomb => {
        bomb.style.top = bomb.offsetTop + 10 + 'px';

        const bombRect = bomb.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if (
            playerRect.left < bombRect.right &&
            playerRect.right > bombRect.left &&
            playerRect.top < bombRect.bottom &&
            playerRect.bottom > bombRect.top
        ) {
            alert('Game Over! Your final score is: ' + score);
            resetGame();
        }
    });
}


setInterval(() => {
    createBomb();
}, 50);

setInterval(() => {
    checkCollision();
    moveBombs();
}, 30);

document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const containerRect = document.getElementById('player-container').getBoundingClientRect();
    const containerLeft = containerRect.left;
    const containerWidth = containerRect.width;
    const playerWidth = player.offsetWidth;
    const playerX = Math.min(containerWidth - playerWidth, Math.max(0, mouseX - containerLeft - playerWidth / 2));

    player.style.left = playerX + 'px';
});


function updateScore() {
    score++;
    document.getElementById('score').innerText = 'Score: ' + score;
    if (score === 1000) {
        document.getElementById('game').style.display = 'none';
        document.getElementById('win-tab').style.display = 'block';
    }
}

const restartBtnWin = document.getElementById('restart-btn-win');
restartBtnWin.addEventListener('click', function () {
    resetGame();
    document.getElementById('win-tab').style.display = 'none';
    document.getElementById('game').style.display = 'block';
});
