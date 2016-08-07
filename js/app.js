// Enemies our player must avoid
var totalEnemies = 0;
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = randPosition(1, 300);
    this.speed = speed(100, 400);
    ++totalEnemies;
    console.log(totalEnemies);

    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
var randPosition = function (min, max) {
    var _rand = Math.floor(Math.random() * max) + min;
    var position = 0;
    console.log(_rand);
    if ( _rand < 130 )
        position = 48;
    else if ( _rand < 213 )
        position = 131;
    else 
        position = 214;

    return position;
};
var speed = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1));
};
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 405) {
        this.x += this.speed * dt;
    } else {
        this.x = -100;
    }
    reset();
    
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method
var Hero = function () {
    this.x = 200;
    this.y = 380;
    
    this.sprite = 'images/char-boy.png';
}

Hero.prototype.handleInput = function(movement){
    if (movement === 'left' && (this.x - 100) > -100 )
        this.x -= 100;
    else if (movement === 'right' && (this.x + 100) < 500 )
        this.x += 100;
    else if (movement === 'up' && (this.y - 100) > -100)
        this.y -= 83;
    else if (movement === 'down' && (this.y + 100) < 400 )
        this.y += 83;
    console.log(this.x, this.y);
};

Hero.prototype.update = function () {

};

Hero.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];


/*
Here we reset the y position of our enemies once they reach the end.
*/
var reset = function () {
    var xArray = allEnemies.map(function (a) { return a.x; });
    
    for (i = 0; i < xArray.length; i++) {
        if (xArray[i] > 405) {
            console.log("hello");
            allEnemies[i].y = randPosition(1, 300);
            allEnemies[i].speed = speed(100, 400);
        }
    }
    
        
};
// Place the player object in a variable called player
var player = new Hero();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
