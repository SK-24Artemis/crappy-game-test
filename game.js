const w = 1200, h = 800,
    timeStep = 10, //calculations per frame
    fps = 60,
    debug = false;
let player,
    enemies = [],
    bullets = [],
    gameSpeed = 1;//wip

function setup() {
    frameRate(fps);
    player = new Player(0, 0, 80, 300, color(158, 180, 120), color(10, 50, 80));
    player.guns.push(new Gun());
    createCanvas(w, h);
    const a = PI / 4;
    enemies.push(new Enemy(cos(a) * 300, sin(a) * 300, 15, 1, color(255, 0, 255), color(255, 0, 155)));
}

function draw() { //Main loop
    spawnShit();
    for (let i = 0; i < timeStep; i++)
        updateThings();
    showThings();
    cleanup();
}


function spawnShit() {
    if (random() > .99) {
        const etype = [Enemy, SquareEnemy][Math.floor(random(2))];
        const a = random(TWO_PI);
        enemies.push(new etype(cos(a) * 300, sin(a) * 300,
            random(10, 30), 1, color(255, 0, 255), color(random(255))));
    }
}

function updateThings() {
    player.update();
    enemies.forEach(e => e.update());
    bullets.forEach(b => b.update());
    enemies.forEach(e => bullets.forEach(b => { if (b.collide(e)) { e.hp--; b.alive = false; } }));
}

function showThings() {
    background(0);
    push();
    translate(w / 2, h / 2);
    player.show();
    bullets.forEach(a => a.show());
    player.guns.forEach(g => g.show());

    enemies.forEach(e => e.show());
    pop();
}

function cleanup() {
    bullets = bullets.filter(a => a.alive);
    enemies = enemies.filter(e => e.alive);
}