kaboom();

scene("main_menu", () => {
    add([text("Press Enter to Start"), pos(100, 100)]);
    keyPress("enter", () => {
        go("game");
    });
});


scene("game", () => {
    layers(["bg", "obj", "ui"], "obj");

const mario = add([
    sprite("mario"),
    pos(100, 100),
    body(),
]);

keyDown("left", () => {
    mario.move(-120, 0);
});

keyDown("right", () => {
    mario.move(120, 0);
});

keyPress("space", () => {
    if(mario.grounded()) {
        mario.jump(400);
    }
});

const enemy = add([
    sprite("enemy"),
    pos(300,100),
    body(),
    { dir: -1 }
]);

enemy.action(() => {
    enemy.move(enemy.dir *50, 0);
    if(enemy.pos.x <= 0 || enemy.pos.x >= width()) {
        enemy.dir *= -1;
    }
});

mario.collides("enemy", () => {
    go("gameover");
});

const coin = add([
    sprite("coin"),
    pos(150, 120),
    area(),
    "coin"
]);

mario.collides("coin", (c) => {
    destroy(c);
    score += 1;
});

const level = [
    "====================",
    "=                  =",
    "=     ==   ==      =",
    "=       ==         =",
    "=     ==   ==      =",
    "=                  =",
    "===================="
];

const map = addLevel(level, {
    width : 32,
    height: 32,
    pos: vec2(0,0),
    "=" : () => [
        sprite("block"),
        solid(),
        { is_block:true}
    ],
});

let score = 0;

const scoreLabel = add([
    text(score),
    pos(12, 12),
    layer("ui"),
    { value: score }
]);

action("coin", (c) => {
    scoreLabel.text = score;
});

mario.action(() => {
    if(mario.grounded()) {
        mario.jump(400);
    }
});


mario.play("run");
sound("jump", { volume : 0.5 });

const bat = add([
    sprite("bat"),
    pos(200,100),
    body(),
    { dir: 1 }
]);

bat.action(() => {
    bat.move(bat.dir * 40, 0);
    if(bat.pos.x <= 0 || bat.pos.x >= width()) {
        bat.dir *= -1;
    }
});

const portal = add([
    sprite("portal"),
    pos(350, 200),
    area(),
    "portal"
]);

mario.collides("portal", () => {
    go("next_level");
});

const mushroom = add([
    sprite("mushroom"),
    pos(250,150),
    area(),
    "mushroom"
]);

mario.collides("mushroom", (m) => {
    destroy(m);
    mario.bigger();
});

let timeLeft = 30;
const timerLabel = add([
    text(timeLeft),
    pos(400, 12),
    layer("ui"),
]);

loop(1, () => {
    timeLeft -= 1;
    timerLabel.text = timeLeft;
    if(timeLeft <= 0) {
        go("gameover");
    }
});

const background = add([
    sprite("background"),
    layer("bg"),
    pos(0, 0),
]);

const boss = add([
    sprite("boss"),
    pos(400, 50),
    health(10),
]);

boss.action(() => {

});
});

scene("gameover", ({}) => {
    add([text("Game Over"), pos(120,120)]);
    keyPress("space", () => {
        go("game");
    });
});


scene("next_level", ({}) => {
    go("game", { level: 2 })
});

localStorage.setItem("score", score);
start("main_menu");
debug.log("Game started!");