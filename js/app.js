// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = randPosition(1, 300);
    this.speed = speed(100, 400);
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x === -100)
        this.y = randPosition();
    if (this.x < 405)
        this.x += this.speed * dt;
    else {
        resetSpeed();
        this.x = -100;
    }
   // console.log("My enemy position " + this.y);
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
        //console.log("0 - " + equalizer[0]);
    } else if (equalizer[1] < equalizer[2]) {
        position = 131;
        equalizer[1]++;
        //console.log("1 - " + equalizer[1]);
    } else {
        position = 214;
        equalizer[2]++;
        //console.log("2 - " + equalizer[2]);
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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
In our resetSpeed function we change the speed of each bug every time it 
reaches the end of our level. This helps give it a randomness effect to keep
the player guessing every time.
*/
var resetSpeed = function () {
    var xArray = allEnemies.map(function (a) { return a.x; });

    for (i = 0; i < xArray.length; i++) {
        if (xArray[i] > 405) {
            allEnemies[i].speed = speed(100, 400);
            // console.log("Our new speed " + allEnemies[i].speed + " and our new position " + allEnemies[i].y);
        }
    }
};

Enemy.prototype.collision = function () {
    console.log(Hero.x);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method
var Hero = function () {
    this.x = 200;
    this.y = 380;
    
    this.sprite = 'images/char-boy.png';
}

/*
On the handleInput method is where the player movement is mapped to the
arrow keys keystrokes. If the player tries to move outside of the game 
map the move function is not performed. If the player reaches the end
of the level (water blocks) his position gets reset.
*/
Hero.prototype.handleInput = function(movement){
    if (movement === 'left' && (this.x - 100) > -100 )
        this.x -= 100;
    else if (movement === 'right' && (this.x + 100) < 500 )
        this.x += 100;
    else if (movement === 'up' && (this.y - 100) > -100)
        this.y -= 83;
    else if (movement === 'down' && (this.y + 100) < 400 )
        this.y += 83;

    if (this.y < -34) {
       // collision();
        this.x = 200;
        this.y = 380;
    }
    //console.log(this.x, this.y);
};

Hero.prototype.update = function () {

};

Hero.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];

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
