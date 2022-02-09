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