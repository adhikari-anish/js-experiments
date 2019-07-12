//creating bird class
class Bird {
    constructor() {
        this.x = 50;
        this.y = 150;
        this.w = 34;
        this.h = 26;
        this.radius = 12;
        this.frame = 0;
        this.animation = bird_animation;
        this.gravity = 0.25;
        this.jump = 4.6;
        this.speed = 0;
        this.rotation = 0;
    }

    drawBird() {
        let bird = bird_animation[this.frame];

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
        ctx.restore();
    }

    flap() {
        this.speed = - this.jump;
    }

    update() {
        // in ready state, the bird will flap slowly
        this.period = state.current == state.getReady ? 10 : 5;
        // incrementing frame by 1 in each period
        this.frame += frames%this.period == 0 ? 1 : 0;
        // updating frame from 0 to 4 since bird frame has only four states in bird_pos array
        this.frame = this.frame % bird_animation.length;

        if(state.current == state.getReady) {
            this.y = 150; // resetting position of the bird after game over
            this.rotation = 0 * DEGREE;
        } else {
            this.speed += this.gravity;
            this.y += this.speed;

            if(this.y + this.h/2 >= canv.height - fg.h) {
                this.y = canv.height - fg.h - this.h/2;
                if(state.current == state.game) {
                    state.current = state.over;
                    // this.speed = 0;
                }
            }

            //if the speed is greater than the jump it means the bird is falling down
            if(this.speed >= this.jump) {
                this.rotation = 90 * DEGREE;
                this.frame = 1;
            } else {
                this.rotation = -25 * DEGREE;
            }
        }
    }

    speedReset() {
        this.speed = 0;
    }


}