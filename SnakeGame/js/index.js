// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

let speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

// 🧱 DOM References (ye add karna zaruri tha)
const board = document.getElementById('board');
const scoreBox = document.getElementById('scoreBox');
const hiscoreBox = document.getElementById('hiscoreBox');

// 🧠 Safe Music Play Function (browser autoplay policy fix)
function playMusicSafe() {
    if (musicSound.paused) {
        musicSound.play().catch(err => {
            console.warn("Autoplay blocked — waiting for user click:", err);
            document.addEventListener('click', () => {
                musicSound.play().catch(e => console.error(e));
            }, { once: true });
        });
    }
}

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
   /* if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }*/
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
   if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir =  {x: 0, y: 0}; 
    alert("Game Over. Press any key to play again!");
    snakeArr = [{x: 13, y: 15}];
    score = 0; 
    scoreBox.innerHTML = "Score: " + score; // Fix: Update the score on screen and the next game will start from start
    playMusicSafe(); // safe way to restart background music
}


    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2, b = 16;
        food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())};
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) { 
        snakeArr[i + 1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

//  Wrap around screen edges
if (snakeArr[0].x >= 18) snakeArr[0].x = 1;
if (snakeArr[0].x <= 0) snakeArr[0].x = 17;
if (snakeArr[0].y >= 18) snakeArr[0].y = 1;
if (snakeArr[0].y <= 0) snakeArr[0].y = 17;

    // Part 2: Display the snake and Food
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add(index === 0 ? 'head' : 'snake');
        board.appendChild(snakeElement);
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
}

window.requestAnimationFrame(main);

// 🎮 Keyboard Controls + Safe Music Trigger
window.addEventListener('keydown', e => {
    playMusicSafe(); // Start background music only after first key press
    inputDir = {x: 0, y: 1}; 
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
});
