<!DOCTYPE html>
<html>
<head>
    <title>Ping-Pong Game</title>
    <style>
        #gameCanvas {
            background-color:black;
            margin: auto;
            display: block;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="400"></canvas>

    <script>
        // Set up the game canvas
        var canvas = document.getElementById("gameCanvas");
        var context = canvas.getContext("2d");

        // Set up the paddles and ball
        var paddleWidth = 10;
        var paddleHeight = 60;
        var paddleSpeed = 5;
        var ballRadius = 10;
        var ballXSpeed = 3;
        var ballYSpeed = 3;

        var paddle1X = 0;
        var paddle1Y = canvas.height / 2 - paddleHeight / 2;
        var paddle2X = canvas.width - paddleWidth;
        var paddle2Y = canvas.height / 2 - paddleHeight / 2;

        var ballX = canvas.width / 2;
        var ballY = canvas.height / 2;

        // Move the paddles
        function movePaddle(event) {
            var rect = canvas.getBoundingClientRect();
            var mouseY = event.clientY - rect.top - paddleHeight / 2;

            paddle1Y = mouseY;
        }

        // Update game logic
        function update() {
            // Move the ball
            ballX += ballXSpeed;
            ballY += ballYSpeed;

            // Check collision with paddles
            if (
                ballY + ballRadius > paddle1Y &&
                ballY - ballRadius < paddle1Y + paddleHeight &&
                ballX - ballRadius < paddle1X + paddleWidth
            ) {
                ballXSpeed = -ballXSpeed;
            }

            if (
                ballY + ballRadius > paddle2Y &&
                ballY - ballRadius < paddle2Y + paddleHeight &&
                ballX + ballRadius > paddle2X
            ) {
                ballXSpeed = -ballXSpeed;
            }

            // Check collision with walls
            if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
                ballYSpeed = -ballYSpeed;
            }

            // Draw game elements
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "white";
            context.fillRect(paddle1X, paddle1Y, paddleWidth, paddleHeight);
            context.fillRect(paddle2X, paddle2Y, paddleWidth, paddleHeight);
            context.fillStyle = "green";
            context.beginPath();
            context.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI, false);
            context.closePath();
            context.fill();

            // Request next frame
            requestAnimationFrame(update);
        }

        // Start the game
        function startGame() {
            canvas.addEventListener("mousemove", movePaddle);
            update();
        }

        // Run the game
        startGame();
    </script>
</body>
</html>
