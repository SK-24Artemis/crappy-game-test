class Player extends Thing {
    constructor(x, y, r, hp, scol, fcol) {
        super(x, y, r, hp, scol, fcol);
        this.guns = [];
    }

    update() {
        const targetVector = enemies[0] ?
            enemies[0].futurePosition(1, 10, 1000, this.guns[0].bulletSpeed) :
            createVector(mouseX - w / 2, mouseY - h / 2);
        this.guns.forEach(g => {
            g.pointAt(targetVector);
            if (mouseIsPressed) this.shoot(targetVector);//change shoot dir to barrel dir
        });
    }

    shoot(targetVector) {
        this.guns.forEach(g => g.shoot(targetVector));
    }
}

