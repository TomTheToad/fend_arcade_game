// TODO: test if es6 classes work with game engine
// If SO: TODO: create a common game item class to fix redundancy

// Constants
// Allow debuggin calls
const debug = false;
// Player canvas origin location
const playerOriginx = 202;
const playerOriginy = 400;

// TODO: move to exterior file
// Enemy Class
class Enemy {
    constructor(sprite = 'images/enemy-bug.png') {
        // Image asset
        this.sprite = sprite;
    }

    update(dt) {
        // Do something
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// TODO move to exerior file
// TODO clean up the args
// Player Class
class Player {
    constructor(sprite = 'images/char-boy.png', x = playerOriginx, y = playerOriginy) {
        // Image asset
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    update(dt) {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(input) {
        switch (input) {
            case 'left': showCall('left');
            case 'up': showCall('up');
            case 'right': showCall('right');
            case 'down': showCall('down');
        }
    }
};

// // Now instantiate your objects.
let enemy1 = new Enemy();

// // Place all enemy objects in an array called allEnemies
let allEnemies = [enemy1];

// // Place the player object in a variable called player
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    // TODO: make allowed keys a const
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Testing helpers
function showCall(who) {
    if (debug) {
        console.log(`function: ${who} has been called`);
    }
};



// // Enemies our player must avoid
// var Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started

//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
// };

// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };

// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// // Now write your own player class
// // This class requires an update(), render() and
// // a handleInput() method.


// // Now instantiate your objects.
// // Place all enemy objects in an array called allEnemies
// // Place the player object in a variable called player



// // This listens for key presses and sends the keys to your
// // Player.handleInput() method. You don't need to modify this.
// document.addEventListener('keyup', function(e) {
//     var allowedKeys = {
//         37: 'left',
//         38: 'up',
//         39: 'right',
//         40: 'down'
//     };

//     player.handleInput(allowedKeys[e.keyCode]);
// });
