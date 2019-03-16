class AnimationConsistencyEngine {
    constructor(methodsArray = [], isPaused = true) {
        this.methodsArray = methodsArray
        this.isPaused = isPaused
        this.previousTime = 0;
        this.main();
    }

    main() {
        while (this.isPaused == false) {
            console.log('running');
            let now = Date.now(),
                timeModifier = (now - this.previousTime) / 1000.0;

            this.methodsArray.forEach(function (method) {
                method(timeModifier);
            });

            this.previousTime = now;
        }
    }

    start() {
        this.isPaused = false;
    }

    pause() {
        this.isPaused = true;
    }

}

const gameParameters = {
    player: new DynamicGamePiece('images/char-boy.png', 200, 388),
    enemies: [
        new DynamicGamePiece('images/enemy-bug.png', 0, 64, 4),
        new DynamicGamePiece('images/enemy-bug.png', 0, 144),
        new DynamicGamePiece('images/enemy-bug.png', 0, 224, 6)
    ],
    level1: {
        levelImages: [
            'images/stone-block.png',
            'images/water-block.png',
            'images/grass-block.png',
            'images/enemy-bug.png',
            'images/char-boy.png',
            'images/Star.png'
        ],

        width: 505,
        height: 606,
        blockCountX: 5,
        blockCountY: 6
    }
}

class GameController {
    constructor(document, gameParameters, gameEngine = new AnimationConsistencyEngine) {
        this.document = document;
        this.window = document.window;
        this.gameEngine = gameEngine;
        this.player = gameParameters.player;
        this.enemies = gameParameters.enemies;

        // Canvas variables
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        // gameDimensions
        this.width = gameParameters.level1.width;
        this.height = gameParameters.level1.height;
        this.blockCountX = gameParameters.level1.blockCountX;
        this.blockCountY = gameParameters.level1.blockCountY;

        // TODO: include graphic offset
        // Move to game params?
        this.distMoveX = gameParameters.width / this.blockCountX;
        this.distMoveY = (gameParameters.height / this.blockCountY) - 18;

        // Game State
        this.isRunning = false;

        // Score Fields
        this.scoreBoard = document.getElementById('score');
        this.score = 0;

        // Setup board

        this.init();
        // this.reset();
    }

    init() {
        // Setup canvas
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(0, 0, this.width, this.height);

        var game_area = this.document.getElementById('game_area');
        game_area.appendChild(this.canvas);

        this.renderBG();

        // This listens for key presses and sends the keys to your
        // Player.handleInput() method. You don't need to modify this.
        this.document.addEventListener('keyup', function (e) {
            var allowedKeys = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down',
                80: 'pause'
            };

            this.handleInput(allowedKeys[e.keyCode]);
        });
    }

    handleInput(input) {
        if (this.isRunning == true) {
            let pos = this.checkNextMove();
            switch (input) {
                case 'up':
                    // start game
                    this.isRunning = true;
                    if (pos.yUp) {
                        this.player.moveUp(this.distMoveY);
                    }
                    break;
                case 'down':
                    if (pos.yDown) {
                        this.player.moveDown(this.distMoveY);
                    }
                    break;
                case 'right':
                    if (pos.xRight) {
                        this.player.moveRight(this.distMoveX);
                    }
                    break;
                case 'left':
                    if (pos.xLeft) {
                        this.player.moveLeft(this.distMoveX);
                    }
                    break;
                case 'pause':
                    this.isRunning = !(this.isRunning);
            }
        }

    }

    // renderAll() {
    //     this.renderBG();
    //     this.player.render();
    //     this.enemies.forEach(element => {
    //         element.render();
    //     });
    // }

    renderBG() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
            'images/water-block.png',   // Top row is water
            'images/stone-block.png',   // Row 1 of 3 of stone
            'images/stone-block.png',   // Row 2 of 3 of stone
            'images/stone-block.png',   // Row 3 of 3 of stone
            'images/grass-block.png',   // Row 1 of 2 of grass
            'images/grass-block.png'    // Row 2 of 2 of grass
        ],
            numRows = 6,
            numCols = 5,
            row, col;

        // Before drawing, clear existing canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                this.ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
    }

    // updateAll(dt) {
    //     this.player.update();
    //     if (this.isRunning == true) {
    //         this.winCheck();
    //         this.enemies.forEach(element => {
    //             this.collisionCheck(element);
    //             element.update(dt);
    //             if (this.isRunning == true) {
    //                 if (element.x > this.gameAreaWidth || element.x < -5) {
    //                     element.reset();
    //                 }
    //                 element.moveRight(10 * dt);
    //             }
    //         });
    //     }
    // }

    // winCheck() {
    //     if (this.player.y < 0) {
    //         this.isRunning = false;
    //         this.updateScore(10);
    //         this.reset();
    //     }
    // }

    // collisionCheck(item, player = this.player) {
    //     // TODO: make arguments dynamic
    //     let itemMinX = item.x - 10;
    //     let itemMaxX = item.x + 80;
    //     let itemMinY = item.y - 10;
    //     let itemMaxY = item.y + 80;
    //     if (player.x < itemMaxX && player.x > itemMinX && player.y < itemMaxY && player.y > itemMinY) {
    //         this.updateScore(-10);
    //         this.reset();
    //     }
    // }

    // updateScore(num) {
    //     this.score += num;
    //     this.scoreBoard.innerText = this.score;
    // }

    // reset() {
    //     this.player.reset();
    //     this.isRunning = true;
    // }

    // // TODO: Should this be kept as a separate method?
    // // TODO: take board design / graphics into account with y and x offset.
    // // TODO: ?? Break this up into helper methods? each method checks a single direction?
    // // Probably get the dynamic properties from a game tile class
    // checkNextMove(pos = this.player.getCurrentPosition()) {
    //     console.log(pos);
    //     let returnObject = {
    //         xLeft: false,
    //         xRight: false,
    //         yUp: false,
    //         yDown: false,
    //     };

    //     // Check move left x
    //     // TODO: use dynamic offset (using const -5 as a place holder)
    //     if ((pos.x - this.distMoveX) > -5) {
    //         returnObject.xLeft = true;
    //     }
    //     // Check move right x
    //     if ((pos.x + this.distMoveX) < this.gameAreaWidth - this.distMoveX) {
    //         returnObject.xRight = true;
    //     }
    //     // Check move up y
    //     if (pos.y) {
    //         if ((pos.y - this.distMoveY) > (-1 * this.distMoveY)) {
    //             returnObject.yUp = true;
    //         }
    //     }
    //     // Check move down y
    //     // TODO: will need dynamic y offset
    //     // canvas height does not work here
    //     if (pos.y) {
    //         if ((pos.y + this.distMoveY) < this.gameAreaHeight - (2 * this.distMoveY)) {
    //             returnObject.yDown = true;
    //         }
    //     }

    //     return returnObject;
    // }

    // // Getters / setters
    // getGameItems() {
    //     return [player, allEnemies];
    // }

    // setGameAreaWidth(width) {
    //     this.gameAreaWidth = width;
    // }

    // setGameAreaHeight(height) {
    //     this.gameAreaHeight = height;
    // }
}

// Run game
// TODO: clean this up
function run() {
    return new GameController(document, gameParameters);
}

Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-boy.png',
    'images/Star.png'
]);
Resources.onReady(run);