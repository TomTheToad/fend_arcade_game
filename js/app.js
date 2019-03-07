// Master base class GamePiece
class GamePiece {
    constructor(image, x, y) {
        this.sprite = image;
        this.x = x;
        this.y = y;
    }

    update(dt) {
        // do something
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class DynamicGamePiece extends GamePiece {
    constructor(image, x, y) {
        super(image, x, y)
    }
}

let player = new DynamicGamePiece('images/char-boy.png', 200, 370);
let enemy1 = new DynamicGamePiece('images/enemy-bug.png', 10, 10);
let allEnemies = [enemy1];

class GameController {
    constructor(player, allEnemies) {
        this.player = player;
        this.allEnemies = allEnemies;
        this.dt = 1;
        // Make X and Y dynamic
        this.moveDistance = 101;
        // Take into account block design
    }

    handleInput(input) {
        console.log(input);
        switch (input) {
            case 'up':
                player.y -= this.moveDistance;
                break;
            case 'down':
                player.y += this.moveDistance;
                break;
            case 'right':
                player.x += this.moveDistance;
                break;
            case 'left':
                player.x -= this.moveDistance;
                break;
        }

    }

    getGameItems() {
        return [player, allEnemies];
    }

    renderAll() {
        this.player.render();
        this.allEnemies.forEach(element => {
            element.render();
        });
    }

    updateAll() {
        this.player.update(this.dt);
        this.allEnemies.forEach(element => {
            element.update(this.dt);
        });
    }
}

let gameController = new GameController(player, allEnemies);

// Enemies our player must avoid
// var Enemy = function() {
// Variables applied to each of our instances go here,
// we've provided one for you to get started

// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
// this.sprite = 'images/enemy-bug.png';
// };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
// };

// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
// ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    gameController.handleInput(allowedKeys[e.keyCode]);
});
