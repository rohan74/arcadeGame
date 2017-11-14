var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;


// using character as a superclass function to create the player and enemy

var Character = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the enemy's position, required method for game
var Enemy = function(x, y) {
    Character.call(this, x, y, 'images/enemy-bug.png');
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;


// Now write your player class
var Player = function() {
    Character.call(this, 200, 320, 'images/char-boy.png');
};


Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;


// a handleInput() method.
Player.prototype.handleInput = function(dir) {
    if (dir == 'left' && this.x > 0)
        this.x -= TILE_WIDTH / 2;
    if (dir == 'right' && this.x < 400)
        this.x += TILE_WIDTH / 2;
    if (dir == 'up' && this.y > 0)
        this.y -= TILE_HEIGHT / 2;
    if (dir == 'down' && this.y < 400)
        this.y += TILE_HEIGHT / 2;
};

// This class requires an update(), render()
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 320;
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //moving the enemy
    //collision
    //reset on collison
    if (this.x < 505)
        this.x += (125 * dt);
    else
        this.x = 90;
    //when collsion oocurs player moves to starting postion
    if (this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y)
        player.reset();
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.update = function(dt) {
    if (this.y < 20) {
        this.reset();
    }
};

var enemy1 = new Enemy(-50, 60);
var enemy2 = new Enemy(-150, 140);
var enemy3 = new Enemy(-250, 230);
var enemy4 = new Enemy(-300, 140);
var enemy5 = new Enemy(-370, 60);
var enemy6 = new Enemy(-500, 230);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
