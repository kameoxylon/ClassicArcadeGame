var Enemy = function () {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = randPosition(1, 300);
    this.speed = speed(100, 400);
};

/*
In the update function we have the enemy-bug movement across the screen. It checks the 
x and y coordinate and moves them appropriately. If the enemy reaches the end of 
the screen it resets it back to the beginning. In here we also have a collision check
with the player. If the player comes in contact with the enemy bug it sends the
player back to the beginning.
*/
Enemy.prototype.update = function (dt) {
    if (this.x === -100)
        this.y = randPosition();
    if (this.x < 405)
        this.x += this.speed * dt;
    else {
        resetSpeed();
        this.x = -100;
    }

    if ((this.x >= player.x - 75) && (this.x <= (player.x + 50)) && this.y === player.y) {
        player.x = 200;
        player.y = 380;
    }
};

/*
In our randPosition function we simply use an array to calculate a position
for the enemy-bug to spawn in after it has reached the end of our level. 
The use of an array for this is to simply make sure that there is at least one
enemy in each row and to give it an element of randomness.
*/
var equalizer = [0, 0, 0];
var randPosition = function () {
    var position = 0;
    if ((equalizer[0] < equalizer[1]) && (equalizer[0] < equalizer[2])) {
        position = 48;
        equalizer[0]++;
    } else if (equalizer[1] < equalizer[2]) {
        position = 131;
        equalizer[1]++;
    } else {
        position = 214;
        equalizer[2]++;
    }
    return position;
};

/*
Speed function takes in a min and max to calculate a random integer for 
our speed.
*/
var speed = function (min, max) {
    return Math.floor(Math.random() * max + min);
};

/*
Draw the enemy on the screen, required method for game
*/
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
In our resetSpeed function we change the speed of each bug every time it 
reaches the end of our level. This helps give it a randomness effect to keep
the player guessing every time.
*/
var i;
var resetSpeed = function () {
    var xArray = allEnemies.map(function (a) {
        return a.x;
    });

    for (i = 0; i < xArray.length; i++) {
        if (xArray[i] > 405) {
            allEnemies[i].speed = speed(100, 400);
        }
    }
};

var Hero = function () {
    this.x = 200;
    this.y = 380;

    this.sprite = 'images/char-boy.png';
};

/*
On the handleInput method is where the player movement is mapped to the
arrow keys keystrokes. If the player tries to move outside of the game 
map the move function is not performed. If the player reaches the end
of the level (water blocks) his position gets reset.
*/
Hero.prototype.handleInput = function (movement) {
    if (movement === 'left' && (this.x - 100) > -100)
        this.x -= 100;
    else if (movement === 'right' && (this.x + 100) < 500)
        this.x += 100;
    else if (movement === 'up' && (this.y - 100) > -100)
        this.y -= 83;
    else if (movement === 'down' && (this.y + 100) < 400)
        this.y += 83;

    if (this.y < -34) {
        this.x = 200;
        this.y = 380;
    }
};

Hero.prototype.update = function () {

};

Hero.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];

var player = new Hero();

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});