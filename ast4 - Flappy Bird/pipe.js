//creating pipes 
class Pipe {
    constructor() {
        this.top = {sX : 553, sY : 0};
        this.bottom = {sX : 502, sY : 0};
        this.w = 53;
        this.h = 400;
        this.gap = 85;
        this.maxYPos = -150;
        this.dx = 2; 
        this.position = [];
    }

    drawPipe(){
        // ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, 100, -200, this.w, this.h);
        for(let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            let topYPos = p.y;
            
            let bottomYPos = p.y + this.h + this.gap;

            //top pipe
            ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);
            // ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, 100, -200, this.w, this.h);
            // console.log(p.x, topYPos);

            ///bottom pipe
            ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);
        }
    }

    update() {
        if(state.current !== state.game) return;

        if(frames%100 == 0) {
            this.position.push( {
                x : canv.width,
                y : this.maxYPos * (Math.random() + 1)
            });
            // console.log(this.position);
        }

        for(let i=0; i< this.position.length; i++) {
            let p = this.position[i];

            let bottomPipeYPos = p.y + this.h + this.gap;

            //collision detection for top pipe
            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h) {
                state.current = state.over;
                console.log(state.current);
            }

            //collsion detection for bottom pipe
            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h) {
                state.current = state.over;
            }

            // moving the pipe to the left
            p.x -= this.dx;

            // if the pipes go beyond canvas, we delete them
            if(p.x + this.w <= 0) {
                this.position.shift();
                score.value += 1;
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
                
                
            }
        }

    }

    resetPipe() {
        this.position = [];
    }

}
