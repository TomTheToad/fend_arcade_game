// TODO: test if es6 classes work with game engine
// If SO: TODO: create a common game item class to fix redundancy

// Constants
// Allow debuggin calls
const debug = false;
// Player canvas origin location
// const playerOriginx = 202;
// const playerOriginy = 380;
// const moveSize = 101;

const GameParameters = {
    playerOriginx: 202,
    playerOriginy: 380,
}

// TODO: Add actionable code?
// Is this even necessary?
const GameItemInteractions = {
    DEATH: -2,
    DAMAGE: -1,
    NEUTRAL: 0,
    BUFF: 1,
    ADD_LIFE: 2
}
Object.freeze(GameItemInteractions);

// Game Item Class
class GamePiece {
    constructor(imageURL, x = 0, y = 0) {
        this.sprite = imageURL;
        this.x = x;
        this.y = y;
        this.isAnchored = false;
    }

    update(dt) {
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

class GameItem extends GamePiece {
    constructor(imageURL, x = 0, y = 0, playerEffect = GameItemInteractions.GOOD) {
        super(imageURL, x, y);
        this.PlayerEffect = playerEffect;
    }

    shiftY(num) {
        if (this.isAnchored != true) {
            this.y += num;
        }
    }

    // getEffect() {
    //     // TODO: change score?
    //     return playerEffect;
    // }

}

// TODO: create a default bg image
class GameBlock extends GameItem {
    constructor(col, row, x, y, bgImage = "images/stone-block.png", isPlayable = true, playerEffect = GameItemInteractions.NEUTRAL) {
        super(bgImage, x, y);
        this.col = col;
        this.row = row;
        // TODO: replace with an object of a certain class
        // or remove entirely
        this.isPlayable = isPlayable;
        this.playerEffect = playerEffect;
        // Use getter / setter
        this.occupiedBy = null;
    }

    getOccupiedBy() {
        return this.occupiedBy;
    }

    setOccupiedBy(AGameItem) {
        this.occupiedBy = AGameItem
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
        // this.blockWidth = (this.widthInPixels / this.blockCountX);
        this.blockWidth = 101
        // this.blockHeight = (this.heightInPixels / this.blockCountY);
        this.blockHeight = 101
        this.blockCenter = {
            x: this.blockWidth / 2,
            y: this.blockHeight / 2,
        }
        this.grid = [];
        this.startRowY = 0;
        // This may not be necessary if single direction scroll
        this.finishRowY = 6;
    }

    // Getters
    getGameGrid() {
        return this.buildBlockGrid();
    }

    getScrollingGrid(numBlocksX, numBlocksY) {
        return this.buildScrollingGrid(numBlocksX, numBlocksY);
    }

    // Setters
    setScrollingGrid(numBlocksX, numBlocksY) {
        this.grid = this.buildScrollingGrid(numBlocksX, numBlocksY);
    }

    // setStartRow(row) {
    //     if (row >= 0 | row <= this.blockCountY) {
    //         this.startRowY = row;
    //     }
    // }

    // override
    // shiftY(num) {
    //     console.log("called")
    //     if (num > 0) {
    //         this.startRowY -= 1;
    //         this.finishRowY -= 1;
    //     } else {
    //         this.startRowY += 1;
    //         this.finishRowY += 1;
    //     }
    // }

    // Build game grid
    buildBlockGrid() {
        let grid = [];
        for (let y = 0; y < this.blockCountY; y++) {
            let locY = (this.blockHeight + this.YOffSet) * y;
            for (let x = 0; x < this.blockCountX; x++) {
                let locX = (this.blockWidth + this.XOffSet) * x;
                let newBlock = new GameBlock(x, y, locX, locY);
                grid.push(newBlock);
            }
        }
        // TODO: make this private?
        // User getter / setter?
        return grid;
    }

    buildScrollingGrid(numBlocksX, numBlocksY) {
        let grid = [];
        for (let y = numBlocksY; y >= 0; y--) {
            let locY = (this.blockHeight + this.YOffSet) * y;
            for (let x = numBlocksX; x >= 0; x--) {
                if ((Math.floor(Math.random() * 5) < 4)) {
                    let locX = (this.blockWidth + this.XOffSet) * x;
                    let newBlock = new GameBlock(x, y, locX, locY);
                    grid.push(newBlock);
                }
            }
        }
        return grid.reverse();
    }

    // TODO: override render or create layer?
    // TODO: add bg, main, and sky layers?
    // render(fromRow = this.startRowY, toRow = this.finishRowY) {
    //     // Determine the shift in Y height to land in the visible window
    //     let heightToSubtract = this.blockHeight * fromRow;
    //     this.grid.forEach(function (block) {
    //         if (block.row >= fromRow && block.row < toRow) {
    //             block.y = (block.y - heightToSubtract);
    //             block.render();
    //         }
    //     })
    // }

    render() {
        // Determine the shift in Y height to land in the visible window
        this.grid.forEach(function (block) {
            block.render();
        })
    }

    // Override update
    // update() {
    //     // TODO: add getter to player
    //     console.log(`player y: ${player.y}`)
    //     //  && this.startRowY > 2
    //     if (player.y < (2 * this.blockHeight)) {
    //         this.startRowY--
    //         console.log(`row shifted: ${this.startRowY}`);

    //     }
    // }

    // buildBlockGrid(blockArray) {
    //     // buid grid from a give array
    // }

    // Set outer limit boundaries
    // Determine movement locations within grid (allowable zones)
    // Add start and end points
    // Add any "special zones"
}

// Dynamic Game Item Class
class DynamicGameItem extends GamePiece {
    constructor(imageURL, x = 0, y = 0) {
        super(imageURL, x, y);
    }

    // TODO: fix code smell?
    moveX() { return (ctx.canvas.width / 5); }
    moveY() { return (ctx.canvas.height / 7); }

    // TODO ? Use collidable?
    boundsX() { return (ctx.canvas.width - this.moveX()); }
    boundsY() { return (ctx.canvas.height - this.moveY()); }

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

    performDeath() {
        // TODO: perform death
    }

}

let gameGrid = new GameBlockGrid(505, 3000, 5, 6, -18);
// gameGrid.gridStartingRow = 0;
gameGrid.setScrollingGrid(40, 6);
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
    constructor(sprite = 'images/char-boy.png', x = GameParameters.playerOriginx, y = GameParameters.playerOriginy) {
        super(sprite, x, y)
        this.isAnchored = true;
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
                // super.moveUp();
                allItems.forEach(function (item) { item.y += 101 });
                allEnemies.forEach(function (item) { item.y += 101 });
                gameGrid.grid.forEach(function (item) { item.y += 101 });
                // gameGrid.shiftY(101);
                break;
            case 'right':
                showCall('right');
                super.moveRight();
                break;
            case 'down':
                showCall('down');
                // super.moveDown();
                allItems.forEach(function (item) { item.y -= 101 });
                allEnemies.forEach(function (item) { item.y -= 101 });
                gameGrid.grid.forEach(function (item) { item.y -= 101 });
                // gameGrid.shiftY(-101);
                break;
        }
    }

};

// // Now instantiate your objects.
let enemy1 = new Enemy();

// Place all items
// /z_Projects/FEND/projects/classicArcadeGame/frontend-nanodegree-arcade-game/images/Gem Green.png
let blueGem = new GameItem("images/Gem Blue.png", 100, 125, GameItemInteractions.BUFF);
let greenGem = new GameItem('images/Gem Green.png', 202, 215, GameItemInteractions.ADD_LIFE);
let allItems = [blueGem, greenGem];

// // Place all enemy objects in an array called allEnemies
let allEnemies = [enemy1];

// // Place the player object in a variable called player
let player = new Player();

// Dynamic blocks
// let allBlocks = gameGrid.getGameGrid();
// console.log(gameGrid.getScrollingGrid(6, 40));
// let allBlocks = gameGrid.getScrollingGrid(6, 40);

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
}