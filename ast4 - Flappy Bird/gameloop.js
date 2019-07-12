//loop
function loop() {

    update();
    frames++;
    draw();
    requestAnimationFrame(loop);
}

loop();