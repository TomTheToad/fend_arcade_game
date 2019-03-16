// Sphere of influence
// Images may vary in size within the canvas. Will need to figure out how to handle edge case.
// var img = document.getElementById('imageid'); 
// //or however you get a handle to the IMG
// var width = img.clientWidth;
// var height = img.clientHeight;
class SphereOfInfluence {
    constructor(domImageElement) {
        this.domImageElement = domImageElement;
        this.width = domImageElement.clientWidth;
        this.height = domImageElement.clientHeight;
        this.center = domImageElement
    }
}

// TODO: change name to models? break up into individual files?
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
    constructor(image, x, y, xMoveModifier = 1) {
        super(image, x, y)
        this.xMoveModifier = xMoveModifier;
        this.originX = x;
        this.originY = y;
        // this.distMoveX = distMoveX;
        // Use offset here?
        // TODO: Should the GC handle all movement logic?
        // this.distMoveY = distMoveY - 18;
        // TODO: add area of effect
    }

    // TODO: keep howFar? Allow for easily changing move distance in an instance.
    moveUp(howFar) {
        this.y -= howFar;
    }

    moveDown(howFar) {
        this.y += howFar;
    }

    moveRight(howFar) {
        this.x += howFar * this.xMoveModifier;
    }

    moveLeft(howFar) {
        this.x -= howFar * this.xMoveModifier;
    }

    getCurrentPosition() {
        return {
            x: this.x,
            y: this.y,
        }
    }

    // Reset to starting position
    reset() {
        this.x = this.originX;
        this.y = this.originY;
    }
}

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
// TODO: move to controller?
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'pause'
    };

    gameController.handleInput(allowedKeys[e.keyCode]);
});
