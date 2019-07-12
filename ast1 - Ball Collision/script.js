function Box(width, parentElem, posX, posY) {
    this.element = null;
    this.parentElement = parentElem;
    this.x = posX;
    this.y = posY;
    this.radius = width / 2;

    this.init = function() {
        this.element = document.createElement('div');
        this.element.className = 'box';
        this.element.style.width = this.element.style.height = width + "px";
        this.element.style.borderRadius = "50%";
        this.element.style.backgroundColor = getRanColor();
        this.element.style.position = "absolute";
        // this.element.innerHTML = "A";
        this.element.addEventListener('click',(e)=>
        e.target.style.display="none");
        this.parentElement.appendChild(this.element);
        this.speed = {
            x: Math.random() > 0.5 ? -0.5 : 0.5,
            y: Math.random() > 0.5 ? -0.5 : 0.5
        }
        return this; 
    }

    this.move = function() {                        //moves the box
        this.x += this.speed.x;
        if(this.x > 700 - width) {
            this.speed.x *= -1;
			this.x = 700-width;
        } else if(this.x <= 0) {
            this.speed.x *= -1;
			this.x = 0;
        }

        this.y += this.speed.y;

        if(this.y > (600 - width)) {
            this.speed.y *= -1;
			this.y = 600 - width;
        } else if(this.y <= 0) {
            this.speed.y *= -1;
			this.y = 0;
        }
    }

    this.draw = function() {                        //draws the box for every x and y values
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
    }

    this.setPosition = function(x, y) {             //sets initial position of box
        this.x = x;
        this.y = y;
    }
    this.isColliding = function(that) {
        let x1 = this.x, y1 = this.y, x2 = that.x, y2 = that.y;
        var dx = x1 - x2;
        var dy = y1 - y2;
        var distance = parseInt(Math.sqrt(dx * dx + dy * dy));

        if(distance <= (Math.floor( this.radius + that.radius ))) {
            return true;
        } 
    }
}

function isCollided(newBall, oldBall) {
    var dx = newBall.x - oldBall.x;
    var dy = newBall.y - oldBall.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < ((newBall.radius + oldBall.radius ))) {
        return true
    }else {
        return false;
    }
}

var GAME_FRAME_RATE = 16.67;
var BALL_COUNNT = 40;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRanColor() {
    var r = getRandomInt(0,256);
    var g = getRandomInt(0,256);
    var b = getRandomInt(0,256);
    return 'rgb(' +r+','+g+","+b+")";
}

function GameAnimation(parentElement) {
    var boxes = [];
    this.parentElement = parentElement;

    this.init = function() {
        for(var i = 0; i < BALL_COUNNT; i++) {
            var radius = getRandomInt(20,40);
            var posX = getRandomInt(0,700 - radius);
            var posY = getRandomInt(0, 600 - radius);
            var box = new Box(radius, this.parentElement, posX, posY);
            if(boxes.length != 0) {
                for(var j = 0; j < boxes.length; j++) {
                    oldBall = boxes[j];
                    if(isCollided(box, oldBall)){
                        //colliding case
//                        console.log("colliding");
                         radius = getRandomInt(25,50);
                         posX = getRandomInt(0,700 - radius);
                         posY = getRandomInt(0, 600 - radius);
                         box = new Box(radius, this.parentElement, posX, posY);
                        j = -1;
                    }
                }
                box.init();
                // box.setPosition(posX, posY);
                // box.draw();
                boxes.push(box);
            }else {
                box.init();
                // box.setPosition(posX, posY);
                box.draw();
                boxes.push(box);
            }

            // console.log(box.x, box.y);
        }
        setInterval(this.start.bind(this), GAME_FRAME_RATE);
    }


    this.start = function() {
        boxes.forEach(function(box, index) {
            box.move();
            // console.log(box);
            boxes.forEach(function(oldBox, oldIndex) {
                if(index != oldIndex) {
                    if(box.isColliding(oldBox)) {
                        let tempX = box.speed.x;
                        let tempY = box.speed.y;
                        box.speed.x = oldBox.speed.x;
                        box.speed.y= oldBox.speed.y;
                        oldBox.speed.x = tempX;
                        oldBox.speed.y = tempY;
                    }
                }
            })  
            box.draw();
            
        })
    }

}

var appContainer = document.getElementById('app');

new GameAnimation(appContainer).init();