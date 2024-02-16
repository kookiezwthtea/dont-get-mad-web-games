document.addEventListener("DOMContentLoaded", function () {
  let score = 0;
  const colorArray = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"];
  let gamePaused = false;
  let container;
  let movingObject;

  function moveObject() {
    container = document.getElementById("game-container");
    movingObject = document.getElementById("moving-object");
    if (!gamePaused) {

      movingObject.style.position = "absolute";

      movingObject.addEventListener("click", function () {
        if (isMatchingColors()) {
          score++;
          updateScore();
          resetTargetColor();
        } else {
          endGame();
        }
      }
      )
    };

    function updatePosition() {
      if (!gamePaused) {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const randomX = Math.floor(Math.random() * (containerWidth - movingObject.clientWidth));
      const randomY = Math.floor(Math.random() * (containerHeight - movingObject.clientHeight));

      movingObject.style.left = randomX + "px";
      movingObject.style.top = randomY + "px";
      movingObject.style.backgroundColor = getRandomColor();
    }
  }
  setInterval(updatePosition, 1200);
  updatePosition();
}
  

  function updateScore() {
    document.getElementById("score").innerText = "Score: " + score;
  }

  function isMatchingColors() {
    const targetColor = document.getElementById("target").style.backgroundColor;
    const movingObjectColor = document.getElementById("moving-object").style.backgroundColor;

    return targetColor === movingObjectColor;
  }

  function resetTargetColor() {
    const target = document.getElementById("target");
    target.style.backgroundColor = getRandomColor();
  }

  function getRandomColor() {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  function endGame() {
    clearInterval(timerInterval);
    document.getElementById("final-score").innerText = score;
    openGameOverModal();
    score = 0;
    updateScore();
    resetTargetColor();
    resetTimer();
  }

  function openGameOverModal() {
    document.getElementById("game-over-modal").style.display = "block";
    gamePaused = true;
  }

  window.closeGameOverModal = function () {
    document.getElementById("game-over-modal").style.display = "none";
    gamePaused = false;
    startTimer();
  };

  document.getElementById("try-again-button").addEventListener("click", function () {
    closeGameOverModal();
  });
  
  moveObject();

  let timerSeconds = 60;
  let timerInterval;

  function startTimer() {
    if (!gamePaused) {
      timerInterval = setInterval(function () {
        if (timerSeconds > 0) {
          timerSeconds--;
          document.getElementById("timer").innerText = "Time: " + timerSeconds + "s";
        } else {
          clearInterval(timerInterval);
          resetTimer();
          openGameOverModal();
        }
      }, 1000);
    }
  }

  function resetTimer() {
    timerSeconds = 60;
    document.getElementById("timer").innerText = "Time: " + timerSeconds + "s";
  }

  startTimer();

  function resetGame() {
    endGame();
  }

  const button = document.getElementById('restart-btn');
  button.addEventListener('click', function () {
    resetGame();
  })



});
