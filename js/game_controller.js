class AnimationConsistencyEngine {
    constructor(methodsArray) {
        this.methodsArray = methodsArray
    }

    main() {
        let now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        methodsArray.forEach(function (item) {
            item();
        })
        this.lastTime = now;
    }

}

const defaultGameParameters = {
    player: new DynamicGamePiece('images/char-boy.png', 200, 388),
    enemies =[
        new DynamicGamePiece('images/enemy-bug.png', 0, 64, 4),
        new DynamicGamePiece('images/enemy-bug.png', 0, 144),
        new DynamicGamePiece('images/enemy-bug.png', 0, 224, 6)
    ],
    level1: {
        levelImages =[
            'images/stone-block.png',
            'images/water-block.png',
            'images/grass-block.png',
            'images/enemy-bug.png',
            'images/char-boy.png',
            'images/Star.png'
        ],

        width: 606,
        height: 505,
    }
}

class GameController {
    constructor(player, enemies) {
        this.player = player;
        this.enemies = enemies;

        // TODO: Create Game Board class - move this
        this.blockCountX = 5;
        this.blockCountY = 6;

        // Initial Computed Properties:
        this.gameAreaWidth = gameEngine.canvas.width;
        this.gameAreaHeight = gameEngine.canvas.height;

        // TODO: include graphic offset
        this.distMoveX = gameEngine.canvas.width / this.blockCountX;
        this.distMoveY = (gameEngine.canvas.height / this.blockCountY) - 18;

        // Game State
        this.isRunning = false;
        this.scoreBoard = document.getElementById('score');
        this.score = 0;

        // Setup board
        this.reset();
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

    renderAll() {
        this.player.render();
        this.enemies.forEach(element => {
            element.render();
        });
    }

    updateAll(dt) {
        this.player.update();
        if (this.isRunning == true) {
            this.winCheck();
            this.enemies.forEach(element => {
                this.collisionCheck(element);
                element.update(dt);
                if (this.isRunning == true) {
                    if (element.x > this.gameAreaWidth || element.x < -5) {
                        element.reset();
                    }
                    element.moveRight(10 * dt);
                }
            });
        }
    }

    winCheck() {
        if (this.player.y < 0) {
            this.isRunning = false;
            this.updateScore(10);
            this.reset();
        }
    }

    collisionCheck(item, player = this.player) {
        // TODO: make arguments dynamic
        let itemMinX = item.x - 10;
        let itemMaxX = item.x + 80;
        let itemMinY = item.y - 10;
        let itemMaxY = item.y + 80;
        if (player.x < itemMaxX && player.x > itemMinX && player.y < itemMaxY && player.y > itemMinY) {
            this.updateScore(-10);
            this.reset
        }
    }

    updateScore(num) {
        this.score += num;
        this.scoreBoard.innerText = this.score;
    }

    reset() {
        this.player.reset();
        this.isRunning = true;
    }

    // TODO: Should this be kept as a separate method?
    // TODO: take board design / graphics into account with y and x offset.
    // TODO: ?? Break this up into helper methods? each method checks a single direction?
    // Probably get the dynamic properties from a game tile class
    checkNextMove(pos = this.player.getCurrentPosition()) {
        console.log(pos);
        let returnObject = {
            xLeft: false,
            xRight: false,
            yUp: false,
            yDown: false,
        };

        // Check move left x
        // TODO: use dynamic offset (using const -5 as a place holder)
        if ((pos.x - this.distMoveX) > -5) {
            returnObject.xLeft = true;
        }
        // Check move right x
        if ((pos.x + this.distMoveX) < this.gameAreaWidth - this.distMoveX) {
            returnObject.xRight = true;
        }
        // Check move up y
        if (pos.y) {
            if ((pos.y - this.distMoveY) > (-1 * this.distMoveY)) {
                returnObject.yUp = true;
            }
        }
        // Check move down y
        // TODO: will need dynamic y offset
        // canvas height does not work here
        if (pos.y) {
            if ((pos.y + this.distMoveY) < this.gameAreaHeight - (2 * this.distMoveY)) {
                returnObject.yDown = true;
            }
        }

        return returnObject;
    }

    // Getters / setters
    getGameItems() {
        return [player, allEnemies];
    }

    setGameAreaWidth(width) {
        this.gameAreaWidth = width;
    }

    setGameAreaHeight(height) {
        this.gameAreaHeight = height;
    }
}

// TODO List
// 1) create a reference to the js engine and include as argument in Game Controller
// 2) make canvas dimensions an argument
// 3) let GC set needed game elements such as images to load
// 4) automate player?

let gameController = new GameController(ctx);