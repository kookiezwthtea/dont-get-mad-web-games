document.addEventListener('DOMContentLoaded', function () {
    const gameContainer = document.getElementById('game-container');
    const playerSquare = document.getElementById('player-square');

    const colorOptions = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];

    let playerColor;
    let score = 0;

    function handleKeyDown(event) {
        if (event.key.includes("Arrow")) {
          event.preventDefault();
        }
      }
      document.addEventListener("keydown", handleKeyDown);

    function getRandomColor() {
        return colorOptions[Math.floor(Math.random() * colorOptions.length)];
    }

    function setRandomColor(element) {
        element.style.backgroundColor = getRandomColor();
    }

    function initializeGame() {
        setRandomColor(playerSquare);
        playerColor = playerSquare.style.backgroundColor;
        playerSquare.style.position = 'absolute';
        playerSquare.style.top = '90%';
        playerSquare.style.left = '50%';
    }

    function createObstacle() {
        const obstacle = document.createElement('div');
        obstacle.className = 'obstacle';
        gameContainer.appendChild(obstacle);
        setRandomColor(obstacle);

        obstacle.style.top = '0';
        obstacle.style.left = Math.random() * (gameContainer.clientWidth - obstacle.clientWidth) + 'px';
        return obstacle;
    }

    function moveObstacles() {
        const obstacles = document.querySelectorAll('.obstacle');
        obstacles.forEach(function (obstacle) {
            const topPosition = parseFloat(obstacle.style.top) || 0;
            obstacle.style.top = topPosition + 2 + 'px';
            if (topPosition > gameContainer.clientHeight) {
                gameContainer.removeChild(obstacle);
                score++;
                document.querySelector('.score').innerText = `Score: ${score}`;
            }
            if (
                playerSquare.getBoundingClientRect().top < obstacle.getBoundingClientRect().bottom &&
                playerSquare.getBoundingClientRect().bottom > obstacle.getBoundingClientRect().top &&
                playerSquare.getBoundingClientRect().left < obstacle.getBoundingClientRect().right &&
                playerSquare.getBoundingClientRect().right > obstacle.getBoundingClientRect().left &&
                playerColor !== obstacle.style.backgroundColor
            ) {
                alert('Game Over! Your final score is: ' + score);
                gameOver();
                
            }
        });
    }

    function gameOver() {
        document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());
        initializeGame();
        score = 0;
        document.querySelector('.score').innerText = `Score: 0`;
    }

    document.addEventListener('keydown', function (event) {
        movePlayer(event.key);
    });

    function movePlayer(direction) {
        const topPosition = parseFloat(playerSquare.style.top) || 0;
        const leftPosition = parseFloat(playerSquare.style.left) || 0;

        switch (direction) {
            case 'ArrowUp':
                if (topPosition > 0) {
                    playerSquare.style.top = topPosition - 10 + 'px';
                }
                break;
            case 'ArrowDown':
                if (topPosition < gameContainer.clientHeight - playerSquare.clientHeight) {
                    playerSquare.style.top = topPosition + 10 + 'px';
                }
                break;
            case 'ArrowLeft':
                if (leftPosition > 0) {
                    playerSquare.style.left = leftPosition - 10 + 'px';
                }
                break;
            case 'ArrowRight':
                if (leftPosition < gameContainer.clientWidth - playerSquare.clientWidth) {
                    playerSquare.style.left = leftPosition + 10 + 'px';
                }
                break;
        }

        checkCollision();
    }

    function checkCollision() {
        const obstacles = document.querySelectorAll('.obstacle');

        obstacles.forEach(function (obstacle) {
            if (
                playerSquare.getBoundingClientRect().top < obstacle.getBoundingClientRect().bottom &&
                playerSquare.getBoundingClientRect().bottom > obstacle.getBoundingClientRect().top &&
                playerSquare.getBoundingClientRect().left < obstacle.getBoundingClientRect().right &&
                playerSquare.getBoundingClientRect().right > obstacle.getBoundingClientRect().left
            ) {
                setRandomColor(playerSquare);
                playerColor = playerSquare.style.backgroundColor;
            }
        });
    }

    gameContainer.addEventListener('click', function () {
        setRandomColor(playerSquare);
        playerColor = playerSquare.style.backgroundColor;
        checkCollision();
    });

    initializeGame();
    setInterval(() => {
        createObstacle();
    }, 5000);
    setInterval(() => {
        moveObstacles();
    }, 20);
    
      const button = document.getElementById('restart-btn');
      button.addEventListener('click', function () {
        gameOver();
      })
});
