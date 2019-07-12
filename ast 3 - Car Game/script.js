var canvas = document.getElementById('canvas');
const WIDTH = 500;
const HEIGHT = 600;
const IMG_PLAYER = new Image();
IMG_PLAYER.src = "./images/mycar.png";

const IMG_ENEMY = new Image();
IMG_ENEMY.src = "./images/enemyCar.png";


canvas.width = WIDTH;
canvas.height = HEIGHT;
var score = 0;
var bestScore = 0;


function lane(num) {
    if(num == 1) {
        return 58.33 ;
    } else if (num == 2) {
        return 225;
    } else if (num == 3) {
        return 391.67;
    }
}

var enemyCar_Array = [];

var motion;

var myCar = new Car(true);


var ctx = canvas.getContext('2d');

// start screen
ctx.beginPath();
ctx.fillStyle = "black";
ctx.fillRect(0,0, WIDTH, HEIGHT);
ctx.fill();
ctx.closePath();
ctx.fillStyle = "red";
ctx.font = "20px Arial";
ctx.fillText("WANNA PLAY? PRESS SPACE!",110,50);
document.addEventListener('keydown', spaceKey);

function spaceKey(e) {          //starts the game
    if(e.keyCode == "32") {
        score = 0;

        motion = setInterval(function() {
            var enemyCar = new Car(false);
            enemyCar_Array.push(enemyCar);
        }, 2000);

        draw();
    }
}



function draw() {
    document.removeEventListener('keydown', spaceKey);

    //drawing lane divider
    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.fillRect(0,0, WIDTH, HEIGHT);
    ctx.fill();
    ctx.closePath();

    //drawing lane
    ctx.beginPath();
    ctx.strokeStyle = "lightblue";
    ctx.setLineDash([30, 30]);
    ctx.lineWidth = 2;
    ctx.moveTo(WIDTH/3, 0);
    ctx.lineTo(WIDTH/3, HEIGHT);
    ctx.moveTo(WIDTH*2/3, 0);
    ctx.lineTo(WIDTH*2/3, HEIGHT);
    ctx.lineDashOffset -= 5;
    ctx.stroke();
    ctx.closePath();

    //drawing player car
    ctx.beginPath();
    myCar.drawCar();
    ctx.closePath();

	//draw and move the enemy car
    for(var i=0; i<enemyCar_Array.length; i++) {
        ctx.beginPath();
        enemyCar_Array[i].drawCar();
        enemyCar_Array[i].move();
        ctx.closePath();
    }


    
    //removing object and updating score
    enemyCar_Array.forEach(function(item, index) {
        if(item.y > HEIGHT) {
            score += 1;
            bestScore = Math.max(score, bestScore);
            localStorage.setItem("best", bestScore);
            enemyCar_Array.splice(index,1);
        }
    });

    var animate = requestAnimationFrame(draw);

    
    // stopping game after collision
    enemyCar_Array.forEach(function(value) {
        if((value.carLane == myCar.carLane) && (value.y+value.height >= HEIGHT - myCar.height)) {
            clearInterval(motion);
            enemyCar_Array = [];
            speed = 3;
            gameOver();
            
            window.cancelAnimationFrame(animate);

        }
    })

    ctx.fillStyle = "white";
    ctx.font = "15px Arial";
    ctx.fillText("Score: " + score, 10,30);
    // ctx.fillText("High Score: " + bestScore, 10,50);

}


function keypress() {
    document.addEventListener("keydown", e => {
        if(e.keyCode == 37 && myCar.carLane != 1) {
            myCar.carLane--;
        } else if(e.keyCode == 39 && myCar.carLane != 3) {
            myCar.carLane++;
        }
    });
}

keypress();


//gameOver screen
function gameOver() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, WIDTH, HEIGHT);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.font = "20px Arial";
    ctx.fillText("Your score: " + score, 110, 250);
    ctx.fillText("High score: " + bestScore, 110, 270);
    ctx.fillText("WANNA PLAY AGAIN? PRESS SPACE!", 110, 300);
    document.addEventListener('keydown', spaceKey);
}
