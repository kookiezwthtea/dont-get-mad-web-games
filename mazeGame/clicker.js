document.addEventListener('DOMContentLoaded', function () {
    
    
    function moveButton() {
        const button = document.getElementById('click-btn');

        const maxX = window.innerWidth - button.clientWidth;
        const maxY = window.innerHeight - button.clientHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;
    }

    let score = 0;
    let timeLeft = 10;
    let isGameRunning = false;
    let countdownInterval;

    function startGame() {
        isGameRunning = true;
        score = 0;
        timeLeft = 10;
        updateScore();
        updateTimer();

        countdownInterval = setInterval(function () {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimer();
            } else {
                endGame();
            }
        }, 1000);
    }
    const info=document.getElementById('info');
    function endGame() {
        isGameRunning = false;
        clearInterval(countdownInterval);
        if (score >= 13) {
            levelUp();
        } else {
            info.innerHTML='Try again! You need to be faster to be able to finish the challenge!';
            startGame();
        }
    }
    function nextLevel(sectionId) {
        const sectionsHide = document.querySelectorAll('.game-section');
          sectionsHide.forEach(section => {
              section.style.display = 'none';
          });
  
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'flex';
        }
    }
    function levelUp() {
        document.getElementById('game-container').style.display='none';
        info.innerHTML=`Good job! Now you got your pre-workout! Are you ready to start the challenge?
        <button id='start'>Let's Go!</button>
        `;
        document.getElementById('start').addEventListener('click', function (){
            nextLevel('game1');
            info.style.display='none';
        });
      
    }   

    window.handleClick = function () {
        if (!isGameRunning) {
            startGame();
        } else {
            score++;
            updateScore();
            moveButton();
        }
    };

    function updateScore() {
        document.getElementById('score').innerText = `Score: ${score}`;
    }


    function updateTimer() {
        document.getElementById('timer').innerText = `Time: ${timeLeft}s`;
    }

    // Initialize the game
    startGame();
});
