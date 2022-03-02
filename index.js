// VARIABLER
// X = VÅGRÄT, Y = LODRÄT
let direction = { x: 0, y: 0 }
let snakeSpeed = 19;
let score = 0;
let lastUpdated = 0;
let highScoreListSize = 5;
let snakeArray = [
    { x: 13, y: 15 }
];
let foodArray = { x: 6, y: 7 };

// Metoder
function main(time) {
    window.requestAnimationFrame(main);
    if ((time - lastUpdated) / 1000 < 1 / snakeSpeed) {
        return;
    }
    lastUpdated = time;
    game();
}

function isGameOver(snake) {
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }

}

function game() {
    // Uppdatera ormens längd
    if (isGameOver(snakeArray)) {
        direction = { x: 0, y: 0 };
        alert("GAME OVER, Tryck på valfri knapp för att börja om!");
        snakeArray = [{x: 13, y: 15}];
        score = 0;
    }

    // Öka längd på orm
    if (snakeArray[0].y === foodArray.y && snakeArray[0].x === foodArray.x) {
        // Öka score
        score += 1;
        if(score>leadingScore){
            leadingScore = score;
            localStorage.setItem("highscore", JSON.stringify(leadingScore));
            showHighScore.innerHTML = "Highscore: " + leadingScore;
        }
        showScore.innerHTML = "Score: " + score;
       
        // Fyll på i array längst fram
        snakeArray.unshift({ x: snakeArray[0].x + direction.x, y: snakeArray[0].y + direction.y });
        let a = 2;
        let b = 16;
        foodArray = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Loop för att flytta orm
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = {...snakeArray[i] };
    }
    
    snakeArray[0].x += direction.x;
    snakeArray[0].y += direction.y;

    // Grafik för orm och mat
    // Orm
    playArea.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeIndex = document.createElement('div');
        snakeIndex.style.gridRowStart = e.y;
        snakeIndex.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeIndex.classList.add('snakehead')
        }
        else {
            snakeIndex.classList.add('snaketail')
        }
        playArea.appendChild(snakeIndex);
    });

    //Mat
    foodIndex = document.createElement('div');
    foodIndex.style.gridRowStart = foodArray.y;
    foodIndex.style.gridColumnStart = foodArray.x;
    foodIndex.classList.add('snakefood')
    playArea.appendChild(foodIndex);

}


let oldHighScore = localStorage.getItem("highscore");
if(oldHighScore === null){
    leadingScore = 0;
    localStorage.setItem("highscore", JSON.stringify(leadingScore))
}
else{
    leadingScore = JSON.parse(oldHighScore);
    showHighScore.innerHTML = "Highscore: " + oldHighScore;
}

// Knapptryck
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    direction = { x: 0, y: 1 }
    switch (e.key) {
        case "ArrowUp":
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            console.log("Down")
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            console.log("Left")
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            console.log("Right")
            direction.x = 1;
            direction.y = 0;
            break;
        default:
            break;
    }
});