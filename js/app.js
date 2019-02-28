// TODO: test if es6 classes work with game engine
// If SO: TODO: create a common game item class to fix redundancy

// Constants
// Allow debuggin calls
const debug = false;
// Player canvas origin location
const playerOriginx = 202;
const playerOriginy = 380;
const moveSize = 101;

// Dynamic Game Item Class
class DynamicGameItem {
    constructor(imageURL, x = 0, y = 0) {
        this.sprite = imageURL;
        this.x = x;
        this.y = y;
    }

    moveX() { return (ctx.canvas.width / 5); }
    moveY() { return (ctx.canvas.height / 7); }

    // TODO ? Use collidable?
    boundsX() { return (ctx.canvas.width - this.moveX()); }
    boundsY() { return (ctx.canvas.height - this.moveY()); }

    update(dt) {
        // Do something
    }

    render() {
        // TODO: will this be the correct height and width?
        // ctx.clearRect(this.x, this.y, this.sprite.width, this.sprite.height);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    moveUp() {
        this.y -= this.moveY();
    }

    moveDown() {
        this.y += this.moveY();
    }

    moveRight() {
        this.x += this.moveX();
    }

    moveLeft() {
        this.x -= this.moveX();
    }

}

// TODO: create a default bg image
class GameBlock extends DynamicGameItem {
    constructor(col, row, x, y, bgImage = "images/stone-block.png", isOccupied = false, isPlayable = true) {
        super(bgImage, x, y);
        this.col = col;
        this.row = row;
        // TODO: replace with an object of a certain class
        this.isOccupied = isOccupied;
        this.isPlayable = isPlayable;
    }
}
// GameBlockGrid Class
// Create the game grid and define locations
// Do not extend GameBlock
class GameBlockGrid {
    // Constructor
    // TODO: review variable names
    constructor(widthInPixels, heightInPixels, blockCountX, blockCountY, YOffSet = 0, XOffSet = 0) {
        this.widthInPixels = widthInPixels;
        this.heightInPixels = heightInPixels;
        this.blockCountX = blockCountX;
        this.blockCountY = blockCountY;
        this.YOffSet = YOffSet;
        this.XOffSet = XOffSet;
        this.blockWidth = (this.widthInPixels / this.blockCountX);
        this.blockHeight = (this.heightInPixels / this.blockCountY);
        this.blockCenter = {
            x: this.blockWidth / 2,
            y: this.blockHeight / 2,
        }
        this.grid = [];
    }

    getGameGrid() {
        return this.buildBlockGrid();
    }

    // Build game grid
    buildBlockGrid() {
        this.grid = [];
        for (let y = 0; y < this.blockCountY; y++) {
            let locY = (this.blockHeight + this.YOffSet) * y;
            for (let x = 0; x < this.blockCountX; x++) {
                let locX = (this.blockWidth + this.XOffSet) * x;
                let newBlock = new GameBlock(x, y, locX, locY);
                this.grid.push(newBlock);
            }
        }
        // TODO: make this private?
        // User getter / setter?
        return this.grid
    }

    // buildBlockGrid(blockArray) {
    //     // buid grid from a give array
    // }

    // Set outer limit boundaries
    // Determine movement locations within grid (allowable zones)
    // Add start and end points
    // Add any "special zones"
}

let gameGrid = new GameBlockGrid(505, 606, 5, 6, -18);
console.log(gameGrid.getGameGrid());
// Collidable
// Keep track of game pieces and locations
// Watch for collisions.
// Protocol?
class Collidable {
    // Constructor - get the game grid ... not extend?
    // Place pieces in a game grid array
    // Report on Collisions
}

// Interaction controller
// Evaluates two pieces meeting each other
// Determines the outcome of a collision
class CollisionController extends Collidable {
    // Constructor
    // "listens for collisions from Collidable"
    // Determines results
    // Sets results
}

// TODO: Should this be inheritance or just independent classes?

// TODO: move to exterior file
// Enemy Class extends DynamicGameItem
class Enemy extends DynamicGameItem {
    constructor(sprite = 'images/enemy-bug.png') {
        super(sprite);
    }
};

// TODO move to exerior file
// TODO clean up the args
// Player Class extends Dynamic Game Item
class Player extends DynamicGameItem {
    constructor(sprite = 'images/char-boy.png', x = playerOriginx, y = playerOriginy) {
        super(sprite, x, y)
    }

    // TODO: move this?
    handleInput(input) {
        switch (input) {
            case 'left':
                showCall('left');
                super.moveLeft();
                break;
            case 'up':
                showCall('up');
                super.moveUp();
                break;
            case 'right':
                showCall('right');
                super.moveRight();
                break;
            case 'down':
                showCall('down');
                super.moveDown();
                break;
        }
    }
};

// // Now instantiate your objects.
let enemy1 = new Enemy();

// // Place all enemy objects in an array called allEnemies
let allEnemies = [enemy1];

// // Place the player object in a variable called player
let player = new Player();

// Dynamic blocks
let allBlocks = gameGrid.getGameGrid();

// TODO: add ALL elements to a Map or WeakMap
// dynamicGameImagesMap??
// Field list
// player1 or player2?
// enemies array or WeakSet
// game blocks in an array or WeakSet
// const gameItems = [];
// gameItems.push(player);
// gameItems.push(gameGrid);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    // TODO: make allowed keys a const
    // console.log(e.keyCode);
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
