document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.start-button');
    const dino = document.querySelector('.dino');
    const cactus = document.querySelector('.cactus');
    const scoreDisplay = document.querySelector('.score');
    const highScoreDisplay = document.querySelector('.high-score');
    const restartButton = document.querySelector('.restart-button');

    let isJumping = false;
    let gravity = 0.9;
    let position = 0;
    let score = 0;
    let highScore = 0;
    let isGameOver = false;
    let scoreInterval;

    function control(e) {
        if (e.keyCode === 32) {
            if (!isJumping) {
                isJumping = true;
                jump();
            }
        }
    }

    function jump() {
        let count = 0;
        let timerId = setInterval(function() {
            // Move up
            if (count === 15) {
                clearInterval(timerId);
                let downTimerId = setInterval(function() {
                    // Move down
                    if (count === 0) {
                        clearInterval(downTimerId);
                        isJumping = false;
                    }
                    position -= 3;
                    count--;
                    position = position * gravity;
                    dino.style.bottom = position + 'px';
                }, 20);
            }

            position += 20;
            count++;
            position = position * gravity;
            dino.style.bottom = position + 'px';
        }, 20);
    }

    function checkCollision() {
        const dinoRect = dino.getBoundingClientRect();
        const cactusRect = cactus.getBoundingClientRect();

        if (
            dinoRect.x < cactusRect.x + cactusRect.width &&
            dinoRect.x + dinoRect.width > cactusRect.x &&
            dinoRect.y < cactusRect.y + cactusRect.height &&
            dinoRect.y + dinoRect.height > cactusRect.y
        ) {
            gameOver();
        }
    }

    function updateScore() {
        if (!isGameOver) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    }

    function startScore() {
        scoreInterval = setInterval(updateScore, 100);
    }

    function stopScore() {
        clearInterval(scoreInterval);
    }

    function gameOver() {
        isGameOver = true;
        stopScore();
        cactus.style.animation = 'none';
        restartButton.style.display = 'block';
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = `High Score: ${highScore}`;
        }
    }

    function restartGame() {
        isGameOver = false;
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        cactus.style.animation = 'moveCactus 2s linear infinite';
        restartButton.style.display = 'none';
        startScore();
    }

    function startGame() {
        startButton.style.display = 'none';
        isGameOver = false;
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        highScoreDisplay.textContent = `High Score: ${highScore}`;
        cactus.style.animation = 'moveCactus 2s linear infinite';
        document.addEventListener('keydown', control);
        setInterval(checkCollision, 10);
        startScore();
    }

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
});

