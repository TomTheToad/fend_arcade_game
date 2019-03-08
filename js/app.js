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
    constructor(image, x, y, distMoveX, distMoveY) {
        super(image, x, y)
        this.distMoveX = distMoveX;
        this.distMoveY = distMoveY;;
    }

    moveUp(howFar = this.distMoveY) {
        this.y -= howFar;
    }

    moveDown(howFar = this.distMoveY) {
        this.y += howFar;
    }

    moveRight(howFar = this.distMoveX) {
        this.x += howFar;
    }

    moveLeft(howFar = this.distMoveX) {
        this.x -= howFar;
    }

    getCurrentPosition() {
        return { x: this.x, y: this.y }
    }
}

let player = new DynamicGamePiece('images/char-boy.png', 200, 370, 101, 101);
let enemy1 = new DynamicGamePiece('images/enemy-bug.png', 10, 10, 101, 101);
let allEnemies = [enemy1];

class GameController {
    constructor(player, allEnemies, gameAreaWidth, gameAreaHeight) {
        this.player = player;
        this.allEnemies = allEnemies;
        this.dt = 1;
        // Make X and Y dynamic
        // Take into account block design
        // To come from game engine. Possibly in an update method
        this.gameAreaWidth = gameAreaWidth;
        this.gameAreaHeight = gameAreaHeight;
    }

    handleInput(input) {
        switch (input) {
            case 'up':
                // TODO: check current position prior to calling move.
                console.log(`game width: ${this.gameAreaWidth}`);
                console.log(`game height: ${this.gameAreaHeight}`);

                this.player.moveUp();
                break;
            case 'down':
                this.player.moveDown();
                break;
            case 'right':
                this.player.moveRight();
                break;
            case 'left':
                this.player.moveLeft();
                break;
        }

    }

    getGameItems() {
        return [player, allEnemies];
    }

    setGameAreaWidth(width) {
        this.gameAreaWidth = width;
    }

    setGameAreaHeight(height) {
        this.gameAreaHeight = height;
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

// TODO make game area dynamic
let gameController = new GameController(player, allEnemies, 505, 606);

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
