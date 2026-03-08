    // game constants & variable
let inputdirection = {x:0, y:0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('movebtn.mp3');
const musicSound = new Audio('bg2.mp3');
let speed = 30;
let score = 0;
let lastPaintTime = 0;

let snakeArr = [
    {x:37, y:23}
]
food = {x:43, y:37};

    //game functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            gameOverSound.play();
            return true;
        }
        }
        // If you bump into the wall
        if(snake[0].x >= 70 || snake[0].x < 0 || snake[0].y >= 70 || snake[0].y < 0){
            gameOverSound.play();
        return true;
        }
    return false;
}

function gameEngine(){
    // part 1: updating the snake array & food
    if(isCollide(snakeArr)){
  

        musicSound.pause();
        moveSound.pause();
        inputdirection = {x:0, y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x:13, y:15}];
        musicSound.play()
        musicSound.loop=true;
        musicSound.play();;
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x: snakeArr[0].x + inputdirection.x, y: snakeArr[0].y + inputdirection.y});
        foodSound.play();
        score += 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        let a = 1;
        let b = 69;
        food = {x: Math.round(a + (b-a)*Math.random()),
                y: Math.round(a + (b-a)*Math.random())}
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputdirection.x;
    snakeArr[0].y += inputdirection.y;

    // part 2: display the snake & food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputdirection = {x:0, y:1}
     // Start the game
    moveSound.play();
    musicSound.play();
    musicSound.volume = 0.3;
    switch(e.key){
        case "ArrowUp":
            //console.log("ArrowUp");
            inputdirection.x = 0;
            inputdirection.y = -1;
            break;  
        case "ArrowDown":
            //console.log("ArrowDown");
            inputdirection.x = 0;
            inputdirection.y = 1;
            break;
        case "ArrowLeft":
           // console.log("ArrowLeft");
            inputdirection.x = -1;
            inputdirection.y = 0;
            break;
        case "ArrowRight":
            //console.log("ArrowRight");
            inputdirection.x = 1;
            inputdirection.y = 0;
            break;
        default:        break;
    }
})


//main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}





// for mobile touch controls
document.querySelector('#up').addEventListener('touchstart', () => {
    inputdirection.x = 0;
    inputdirection.y = -1;
    moveSound.play();
})
document.querySelector('#down').addEventListener('touchstart', () => {
    inputdirection.x = 0;
    inputdirection.y = 1;
    moveSound.play();
})
document.querySelector('#left').addEventListener('touchstart', () => {
    inputdirection.x = -1;
    inputdirection.y = 0;
    moveSound.play();
})
document.querySelector('#right').addEventListener('touchstart', () => {
    inputdirection.x = 1;
    inputdirection.y = 0;
    moveSound.play();
})

