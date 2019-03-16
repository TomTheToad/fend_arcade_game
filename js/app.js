
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
