// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = x;
    this.y = y;
    this.speed = 
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
};

Hero.prototype.update = function () {

};

Hero.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
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