document.addEventListener('DOMContentLoaded', function () {
    const mazeContainer = document.getElementById('maze-container');
    const gridSize = 8;
    const maze = createMaze();
    let playerPosition = { row: 0, col: 0 };
    let goalPosition = { row: gridSize - 1, col: gridSize - 1 };

    function createMaze() {
      const maze = [
      [0, 1, 0, 0, 0, 0, 0, 1],
      [0, 1, 0, 1, 1, 1, 0, 1],
      [0, 1, 0, 1, 1, 1, 0, 1],
      [0, 1, 0, 0, 0, 0, 0, 1],
      [0, 1, 0, 1, 1, 1, 0, 1],
      [0, 1, 0, 1, 1, 1, 0, 1],
      [0, 1, 0, 1, 1, 1, 0, 1],
      [0, 0, 0, 1, 1, 1, 0, 0],
    
    
    ];
      return maze;
    }

    function renderMaze() {
      mazeContainer.innerHTML = '';
      maze.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const mazeCell = document.createElement('div');
          mazeCell.classList.add('maze-cell');
          mazeCell.dataset.row = rowIndex;
          mazeCell.dataset.col = colIndex;

          if (cell === 1) {
            mazeCell.classList.add('wall');
          }

          if (playerPosition.row === rowIndex && playerPosition.col === colIndex) {
            mazeCell.classList.add('player');
          }

          if (goalPosition.row === rowIndex && goalPosition.col === colIndex) {
            mazeCell.classList.add('goal');
          }

   
          if (cell === 'teleporter') {
            mazeCell.classList.add('teleporter');
          }

          mazeContainer.appendChild(mazeCell);
        });
      });
    }

    function generateTeleporters() {
      for (let i = 0; i < 5; i++) { 
        const randomRow = Math.floor(Math.random() * gridSize);
        const randomCol = Math.floor(Math.random() * gridSize);
        if (randomRow !== goalPosition.row && randomCol !== goalPosition.col) {
        maze[randomRow][randomCol] = 'teleporter'; 
        }
      }
    }


    function handleKeyPress(event) {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
          event.preventDefault();
      }

      switch (event.key) {
          case 'ArrowUp':
              movePlayer(-1, 0);
              break;
          case 'ArrowDown':
              movePlayer(1, 0);
              break;
          case 'ArrowLeft':
              movePlayer(0, -1);
              break;
          case 'ArrowRight':
              movePlayer(0, 1);
              break;
      }

      renderMaze();
  }
  document.addEventListener('keydown', handleKeyPress);
  
    function movePlayer(rowOffset, colOffset) {
      const newRow = playerPosition.row + rowOffset;
      const newCol = playerPosition.col + colOffset;

    
      if (
        newRow >= 0 &&
        newRow < gridSize &&
        newCol >= 0 &&
        newCol < gridSize &&
        maze[newRow][newCol] !== 1
      ) {
       
        if (maze[newRow][newCol] !== 'teleporter') {
          playerPosition.row = newRow;
          playerPosition.col = newCol;
     
          if (newRow === goalPosition.row && newCol === goalPosition.col) {
            document.getElementById('info').innerHTML='You got lucky 🫥';
            resetGame();
            nextLevel('game2');
            
          }
        } else {
          teleportPlayer();
        }
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

    function teleportPlayer() {
      let randomRow, randomCol;
      do {
        randomRow = Math.floor(Math.random() * gridSize);
        randomCol = Math.floor(Math.random() * gridSize);
      } while (maze[randomRow][randomCol] !== 0);

     
      playerPosition.row = randomRow;
      playerPosition.col = randomCol;
    }

    function resetGame() {
      playerPosition = { row: 0, col: 0 };
      renderMaze();
    }

    function startGame() {
      generateTeleporters();
      renderMaze();
      document.addEventListener('keydown', handleKeyPress);
    }

const button=document.getElementById('restart-btn');
 button.addEventListener('click', function(){
    resetGame();
 })

    startGame();
  });

