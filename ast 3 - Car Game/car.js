function getRandNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min)) + min;
}

var speed = 3;

class Car {

    constructor(player) {
        this.y = 0;

        this.width = 50;
        this.height = 80;

        this.carLane;
        this.isPlayer= player || false;

        if(!this.isPlayer) {
            this.carLane = getRandNum(1,4);
            this.y = this.y - 5;
        } else {
            this.carLane = 2;
            this.y = HEIGHT - this.height - 5;
        }


    }

    move() {
        this.y += speed; 

        if(score >= 10) {
            speed = 5;
            this.y += speed; 

        }
    }

    drawCar() {
        if(this.isPlayer) {
        // ctx.fillRect(lane(this.carLane) , this.y, this.width, this.height);  

            ctx.drawImage(IMG_PLAYER, lane(this.carLane) , this.y);
        }else if(!this.isPlayer) {
            ctx.drawImage(IMG_ENEMY, lane(this.carLane) , this.y);
        }
    }     

}
