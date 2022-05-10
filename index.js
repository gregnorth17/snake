const grid = document.querySelector(".grid");
const displayScore = document.querySelector(".display-score");
const button = document.querySelector(".btn");
const squares = [];
const width = 10;
const gameOver = document.querySelector(".game-over");
let currentSnake = [2, 1, 0];
let direction = 1;
let appleIndex = 0;
let score = 0;
let speed = 1000;
let timerId = 0;

function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    clearInterval(timerId);
    currentSnake = [2, 1, 0];
    currentSnake.forEach(index => squares[index].classList.add("snake"))
    generateApple();
    direction = 1;
    score = 0;
    speed = 1000;
    timerId = setInterval(move, speed);
    gameOver.style.display = "none";
}


function createGrid() {
    for(let i = 0; i < 100; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        grid.appendChild(square);
        squares.push(square);
    }
}

createGrid();

currentSnake.forEach(index => squares[index].classList.add("snake"))

function move() {

    if(
        (currentSnake[0] + width >= width*width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === - width) ||
        (squares[currentSnake[0] + direction]).classList.contains("snake") 
    )
     {
        gameOver.style.display = "block"
        return clearInterval(timerId);
    }

    let tail = currentSnake.pop(); 
    squares[tail].classList.remove('snake'); 
    currentSnake.unshift(currentSnake[0] + direction);
    squares[currentSnake[0]].classList.add("snake"); 
    
    if(squares[currentSnake[0]] === squares[appleIndex]) {
        squares[appleIndex].classList.remove("apple");
        
        
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        generateApple();
        score++
        displayScore.textContent = score;
        clearInterval(timerId);
        speed = speed * 0.9;
        timerId = setInterval(move, speed);
    }
    
    
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * 100);
    } while(squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
}

generateApple();

button.addEventListener("click", startGame);


document.addEventListener("keydown", event => {

    if(event.key === "ArrowRight") {
        direction = 1;
    }

    if(event.key === "ArrowLeft") {
        direction = - 1;
    }

    if(event.key === "ArrowUp") {
        direction = - 10;
    }

    if(event.key === "ArrowDown") {
        direction = + 10;
    }
})

