//creating canvas
const canv = document.getElementById('bird');
canv.height = 480;
canv.width = 320; 
const ctx = canv.getContext('2d');



// loading sprite image
const sprite = new Image();
sprite.src = "images/sprite.png";



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
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }

    drawGameOver() {
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }

    update() {
        this.x = (this.x - this.dx) % (this.w / 2);
    }
}

var bg = new RenImage(0, 0, 275, 226, 0, canv.height - 226);
var fg = new RenImage(276, 0, 224, 112, 0, canv.height - 112);
var getReady = new RenImage(0, 228, 173, 152, (canv.width/2 - 173/2), 80);
var gameOver = new RenImage(175, 228, 225, 202, (canv.width/2 - 225/2), 90);


//creating bird class
class Bird {
    constructor() {
        this.x = 50;
        this.y = 150;
        this.w = 34;
        this.h = 26;
        this.radius = 12;
        this.frame = 0;
        this.gravity = 0.25;
        this.jump = 4.6;
        this.speed = 0;
        this.rotation = 0;
    }

    drawBird() {
        
    }

}

// bird object
var bird = new Bird();

//creating pipes 
class Pipe {
    constructor() {
        this.top = {sX : 553, sY : 0};
        this.bottom = {sX : 502, sY : 0};
        this.w = 53;
        this.y = 400;
        this.gap = 85;
        this.maxYPos = -150;
        dx = 2; 
        this.position = [];
    }

    
}





//draw 
function draw() {
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canv.width, canv.height);

    //for bgimage
    bg.draw();
    fg.draw();
    getReady.drawReadyMsg();
    gameOver.drawGameOver();
    bird.drawBird();


}

//update
function update() {
    fg.update();
}


//loop
function loop() {

    update();
    frames++;
    // console.log(frames);
    draw();
    requestAnimationFrame(loop);
}

loop();