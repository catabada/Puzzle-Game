class Bullet {
    constructor(ctx) {
        this.shape = [-3];
        this.ctx = ctx;
        this.y = 6;
        this.x = 0;
        this.startTime = 0;
        this.move = 0;
        this.speed = 50;
    }
    renderBullet() {
        this.ctx.drawImage(BULLET_IMAGE, this.x, this.y, 1, 1);
    }
}