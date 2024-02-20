const canvas = document.getElementById("flappyBirdCanvas");
const ctx = canvas.getContext("2d");
const gameOverScreen = document.getElementById("gameOverScreen");
const restartButton = document.getElementById("restartButton");
const finalScore = document.getElementById("finalScore");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

// Load images
const birdImage = new Image();
birdImage.src = 'flappy.png';

const pipeImage = new Image();
pipeImage.src = 'pipe.png';

const backgroundImage = new Image();
backgroundImage.src = 'flappy-bg.png';

// Bird properties
const bird = {
  x: 50,
  y: canvas.height / 2 ,
  width: 50,
  height: 50,
  color: "#FFD700",
  gravity: 0.5,
  velocity: 0,
  jump: -20,
  isJumping: false,
  hasMoved: false,
};

// Pipe properties
const pipe = {
  width: 50,
  minHeight: 50,
  gap: 200,
  pipes: [],
  spawnRate: 180,
};

// Score
let score = 0;

let gameRunning = true;

function drawBird() {
  ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
}

function drawPipe(pipeX, pipeHeight) {
  ctx.drawImage(pipeImage, pipeX, 0, pipe.width, pipeHeight);
  ctx.drawImage(pipeImage, pipeX, pipeHeight + pipe.gap, pipe.width, canvas.height - (pipeHeight + pipe.gap));
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

function update() {
  if (!bird.hasMoved || !gameRunning) {
    return;
  }

  bird.velocity += bird.gravity;
  bird.y += bird.velocity * 0.1;
  bird.y = Math.min(bird.y, canvas.height - bird.height);

  // Spawn pipes
  if (frameCount % pipe.spawnRate === 0) {
    const pipeHeight = Math.floor(Math.random() * (canvas.height - pipe.minHeight - pipe.gap) + pipe.minHeight);
    pipe.pipes.push({ x: canvas.width, height: pipeHeight });
  }

  // Update pipe positions
  for (let i = pipe.pipes.length - 1; i >= 0; i--) {
    pipe.pipes[i].x -= 2;

    // Check for collision
    if (
      bird.x < pipe.pipes[i].x + pipe.width &&
      bird.x + bird.width > pipe.pipes[i].x &&
      (bird.y < pipe.pipes[i].height || bird.y + bird.height > pipe.pipes[i].height + pipe.gap)
    ) {
      // Game over
      showGameOverScreen();
      gameRunning = false;
      return;
    }

    // Remove off-screen pipes
    if (pipe.pipes[i].x + pipe.width <= 0) {
      pipe.pipes.splice(i, 1);
      score++;
    }
  }

  // Check for collision with the top and bottom of the canvas
  if (bird.y < 0 || bird.y + bird.height > canvas.height) {
    showGameOverScreen();
    gameRunning = false;
    return;
  }
}

function showGameOverScreen() {
  gameOverScreen.style.display = "block";
  finalScore.textContent = "Your score is: " + score;
}

function resetGame() {
  bird.y = canvas.height / 2 - 15;
  bird.velocity = 0;
  bird.hasMoved = false;
  pipe.pipes = [];
  score = 0;
  gameOverScreen.style.display = "none";
  gameRunning = true;
}


document.addEventListener("mousedown", () => {
  bird.isJumping = true;
  bird.hasMoved = true;
  bird.velocity = bird.jump;
});


document.addEventListener("mouseup", () => {
  bird.isJumping = false;
});


restartButton.addEventListener("click", () => {
  resetGame();
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  drawBird();


  pipe.pipes.forEach((p) => drawPipe(p.x, p.height));

  drawScore();
}

function gameLoop() {
  update();
  draw();
  frameCount++;

  requestAnimationFrame(gameLoop);
}

let frameCount = 0;
gameLoop();
