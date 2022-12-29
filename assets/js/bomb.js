class Bomb {
    constructor(x, ctx) {
        this.shape = [
            [-2, -2],
            [-2, -2]
        ]
        this.ctx = ctx;
        this.y = 0;
        this.x = x;
        this.move = 0;
        this.speed = 50;
        this.startTime = 0;
    }
    renderBomb() {
        this.ctx.drawImage(BOMB_IMAGE, this.x, this.y, 4, 4)
    }

}