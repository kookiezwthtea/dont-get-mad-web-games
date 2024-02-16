document.addEventListener('DOMContentLoaded', function () {
    const sequenceContainer = document.getElementById('sequence-container');
    const playerContainer = document.getElementById('player-container');
    const scoreValue = document.getElementById('score-value');

    let sequence = [];
    let playerSequence = [];
    let score = 0;
    let sequenceLength = 1;
    
    function generateSequence() {
        const sequence = [];
        for (let i = 0; i < sequenceLength; i++) {
            sequence.push({ row: 0, color: Math.floor(Math.random() * 4) });
            sequence.push({ row: 1, color: Math.floor(Math.random() * 4) });
        }
        return sequence;
    }

    function playSequence() {
        sequence.forEach(({ row, color }, index) => {
            setTimeout(() => {
                lightUpBlock(color, row);
            }, index * 1000);
        });
    }

    function lightUpBlock(color, row) {
        console.log(`Block ${color} in row ${row} lit up!`);

        const block = document.getElementById(`block-${row}-${color}`);
        if (block) {
            block.style.backgroundColor = '#f00';
            setTimeout(() => {
                block.style.backgroundColor = '';
            }, 500);
        } else {
            console.log(`Block ${color} in row ${row} not found.`);
        }
    }

    function handleClick(color, row) {
        playerSequence.push(color);
        lightUpBlock(color, row);

        if (playerSequence.length === sequence.length) {
            const sequencesMatch = playerSequence.every((value, index) => value === sequence[index].color);
            if (sequencesMatch) {
                score += 100;
                sequenceLength+=1;
                scoreValue.textContent = `Score: ${score}`;
                playerSequence = [];
                sequence = generateSequence();
                setTimeout(function () {
                    playSequence();
                }, 2000);
            } else {
            
                alert('Game Over! You made a mistake.');
                showTotalScore();
                resetGame3();
            }
        }
    }

    function resetGame3() {
        sequence = generateSequence();
        playerSequence = [];
        score = 0;
        sequenceLength=1;
        scoreValue.textContent = 'Score: 0';
        setTimeout(function () {
            playSequence();
        }, 1000);
    }

    document.getElementById('restart-btn').addEventListener('click', function () {
        resetGame3();
    });

    function createBlock(color, row) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.id = `block-${row}-${color}`;
        block.setAttribute('data-row', row);
        block.setAttribute('data-color', color);
        block.addEventListener('click', () => handleClick(color, row));
        return block;
    }

    function renderBlocks() {
        sequenceContainer.innerHTML = '';
        playerContainer.innerHTML = '';

        for (let row = 0; row < 2; row++) {
            for (let i = 0; i < 4; i++) {
                const block = createBlock(i, row);
                if (row === 0) {
                    sequenceContainer.appendChild(block);
                } else {
                    playerContainer.appendChild(block);
                }
            }
        }
    }
    function startGame3() {
        renderBlocks();
        resetGame3();
    }
    startGame3();
});


function showTotalScore() {
    const totalScoreElement = document.getElementById('total-score');
    const scoreElement = document.getElementById('score-value');
    totalScoreElement.style.display = 'block';
    totalScoreElement.textContent = 'Previous '+ scoreElement.textContent ;
}

document.getElementById('restart-btn').addEventListener('click', function () {
    resetGame3();
    const totalScoreElement = document.getElementById('total-score');
    totalScoreElement.style.display = 'none';
});
