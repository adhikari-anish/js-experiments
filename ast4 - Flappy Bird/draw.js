//creating canvas
const canv = document.getElementById('bird');
canv.height = 480;
canv.width = 320; 
const ctx = canv.getContext('2d');

// game variables and constants
var frames = 0;
const DEGREE = Math.PI / 180;

//bird states for animation
var bird_animation = [
    {sX: 276, sY : 112},
    {sX: 276, sY : 139},
    {sX: 276, sY : 164},
    {sX: 276, sY : 139}
];

// loading sprite image
const sprite = new Image();
sprite.src = "images/sprite.png";

//game states 
const state = {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2
}

//start button
const startBtn = {
    x : 120,
    y : 263,
    w : 83,
    h : 29
}

//controlling the game
canv.addEventListener("click", function(e) {
    switch(state.current) {
        case state.getReady:
            state.current = state.game;
            break;
        case state.game:
                // if(bird.y - bird.radius <= 0) return;
            bird.flap();
            break;
        case state.over:
            let rect = canv.getBoundingClientRect();
            let clickX = e.clientX - rect.left;
            let clickY = e.clientY - rect.top;

            if(clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h) {
                PIPES.resetPipe();
                bird.speedReset();
                score.resetScore();
                state.current = state.getReady;
            }

            break;
        
    }
})


//rendering bckground and foreground images
class RenImage {
    constructor(sX, sY, w, h, x, y) {
        this.sX = sX;
        this.sY = sY,
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.dx = 2;
    }

    draw() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }

    drawReadyMsg() {
        if(state.current == state.getReady) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }

    drawGameOver() {
        if(state.current == state.over) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }

    update() {
        if(state.current == state.game) {
            this.x = (this.x - this.dx) % (this.w / 2);
        }
    }
}

var bg = new RenImage(0, 0, 275, 226, 0, canv.height - 226);
var fg = new RenImage(276, 0, 224, 112, 0, canv.height - 112);
var getReady = new RenImage(0, 228, 173, 152, (canv.width/2 - 173/2), 80);
var gameOver = new RenImage(175, 228, 225, 202, (canv.width/2 - 225/2), 90);




// bird object
var bird = new Bird();

// pipe object
const PIPES = new Pipe();

// Score
class Score {

    constructor() {
        this.value = 0;
        this.best = 0;
    }

    drawScore() {
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";

        if(state.current == state.game) {
            // ctx.lineWidth = 2;
            ctx.font = "35px Arial";
            ctx.fillText(this.value, canv.width/2, 50);
            ctx.strokeText(this.value, canv.width/2, 50);
        } else if(state.current == state.over) {
            //score value
            ctx.font = "25px Arial";
            ctx.fillText(this.value, 225, 186);
            ctx.strokeText(this.value, 225, 186);
            // best score
            ctx.strokeText(this.best, 225, 228);
            ctx.strokeText(this.best, 225, 228);
        }
    }

    resetScore() {
        this.value = 0;
    }
}

// score object
var score = new Score();


//draw 
function draw() {
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canv.width, canv.height);

    //for bgimage
    
    bg.draw();
    PIPES.drawPipe();
    fg.draw();
    getReady.drawReadyMsg();
    gameOver.drawGameOver();
    bird.drawBird();
    score.drawScore();
    


}



