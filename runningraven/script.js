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
    let cactusSpeed = 2; // initial cactus speed in seconds
    let speedDecrement = 0.0002; // small decrement to gradually increase speed

    function control(e) {
        if (e.keyCode === 32 || e.type === 'touchstart') {
            if (!isJumping) {
                isJumping = true;
                jump();
            }
        }
    }

    function jump() {
        let count = 0;
        let timerId = setInterval(function () {
            if (count === 15) {
                clearInterval(timerId);
                let downTimerId = setInterval(function () {
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
        cactusSpeed = 2; // reset speed
        cactus.style.animationDuration = `${cactusSpeed}s`; // reset animation speed
        cactus.style.animation = 'moveCactus 2s linear infinite';
        restartButton.style.display = 'none';
        startGameLoop();
        startScore();
    }

    function startGameLoop() {
        function gameLoop() {
            if (!isGameOver) {
                // Gradually increase the difficulty by reducing the animation duration
                if (cactusSpeed > 0.8) { // set a lower limit to avoid becoming impossible
                    cactusSpeed -= speedDecrement;
                    cactus.style.animationDuration = `${cactusSpeed}s`;
                }
                checkCollision();
                requestAnimationFrame(gameLoop);
            }
        }
        gameLoop();
    }

    function startGame() {
        startButton.style.display = 'none';
        isGameOver = false;
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        highScoreDisplay.textContent = `High Score: ${highScore}`;
        cactus.style.animation = `moveCactus ${cactusSpeed}s linear infinite`;
        document.addEventListener('keydown', control);
        document.addEventListener('touchstart', control);
        startGameLoop();
        startScore();
        pollGamepad(); // Start polling for gamepad input
    }
    let gamepadIndex = null;
    
    // Gamepad detection and polling functions
    function detectGamepad() {
        window.addEventListener("gamepadconnected", function(e) {
            gamepadIndex = e.gamepad.index;
            console.log("Gamepad connected:", e.gamepad);
        });

        window.addEventListener("gamepaddisconnected", function(e) {
            gamepadIndex = null;
            console.log("Gamepad disconnected:", e.gamepad);
        });
    }

    function pollGamepad() {
        if (gamepadIndex !== null) {
            const gamepad = navigator.getGamepads()[gamepadIndex];
            if (gamepad) {
                // Checking if the A button (button 0) is pressed
                if (gamepad.buttons[0].pressed && !isJumping) {
                    isJumping = true;
                    jump();
                }
            }
        }
        requestAnimationFrame(pollGamepad);
    }

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);

    detectGamepad(); // Start detecting gamepad
});

