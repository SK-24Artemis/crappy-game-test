class Bullet extends Thing {
    constructor(x, y, r, speed, barrelLength, scol, fcol) {
        super(x, y, r, 1, scol, fcol);
        this.speed = speed;
        this.pos.set(player.pos.x, player.pos.y);
        this.vel.set(x - player.pos.x, y - player.pos.y).normalize();
        //this.pos.add(p5.Vector.mult(this.vel, barrelLength)); //bullet starts from barrel tip but aim goes fubar
        this.vel.mult(this.speed).div(timeStep);
        this.barrelLength = barrelLength;
    }

    update() {
        super.move();
        if (this.pos.x < -w || this.pos.x > w ||
            this.pos.y < -h || this.pos.y > h)
            this.alive = false;
    }

    collide(otherVector) {
        return this.pos.dist(otherVector.pos) < this.r + otherVector.r;
    }
}