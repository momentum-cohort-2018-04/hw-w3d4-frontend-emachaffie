class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.screen = canvas.getContext('2d');
        this.bodies = [];
        this.gameSize = {
            x: canvas.width,
            y: canvas.height
        }
        this.player = new Player(this);
        this.keyboarder = new Keyboarder();
        this.snitch = new Snitch(this);
        this.bludger = new Bludger(this);
    }

    //Add an array for the "bodies"

    update() {

        if (colliding(this.snitch, this.player)) {
            score = score + 1;
            this.snitch.update();
            console.log(score)
        };

        if (colliding(this.player, this.bludger)) {
            score = 0;
            //Destroy both and create new player
            
        } 
        // else {
        this.player.update();
        this.bludger.update();
    // }
    }

    draw() {
        //can clear by covering previous with background color,OR using clearRect
        // screen.clearRect(0, 0, gameSize.x, gameSize.y);
        this.screen.clearRect(0, 0, this.gameSize.x, this.gameSize.y)


        this.screen.strokeStyle = "#FFF";
        this.screen.lineWidth = 10;
        this.screen.strokeRect(150, 150, 200, 200);

        this.screen.font = "40px Arial";
        this.screen.fillStyle = "#FFF";
        this.screen.textAlign = "center";
        this.screen.fillText("Snitch Snatch", 150, 50);

        this.screen.font = "40px Arial";
        this.screen.fillStyle = "#FFF";
        this.screen.textAlign = "right";
        this.screen.fillText("Score: " + score, 450, 475);

        this.player.draw();
        this.snitch.draw();
        this.bludger.draw(); 
        // or somehow push bludgers into array/onto screen
    }

    tick() {
        this.update()
        this.draw()
        // console.log("ticky")
        requestAnimationFrame(this.tick.bind(this))
    }
}

class Player {
    constructor(game) {
        this.game = game;
        this.Keyboarder = new Keyboarder();
        this.center = {
            x: 250,
            y: 250
        };
        this.size = {
            x: 40,
            y: 40
        };
    }
    update() {
        if (this.Keyboarder.isDown(Keyboarder.KEYS.LEFT) && this.center.x > 175) {
            this.center.x -= 2;
        } else if (this.Keyboarder.isDown(Keyboarder.KEYS.RIGHT) && this.center.x < 325) {
            this.center.x += 2;
        } else if (this.Keyboarder.isDown(Keyboarder.KEYS.UP) && this.center.y > 175) {
            this.center.y -= 2;
        } else if (this.Keyboarder.isDown(Keyboarder.KEYS.DOWN) && this.center.y < 325) {
            this.center.y += 2;
        }
    }
    draw() {
        this.game.screen.fillStyle = "#ae0001";
        this.game.screen.fillRect(this.center.x - 20, this.center.y - 20, this.size.x, this.size.y);
        // this.game.screen.fillRect(this.center.x - this.size.x / 2, this.center.y - this.size.y / 2, this.size.x, this.size.y);
    }
}


class Snitch {
    constructor(game) {
        this.game = game;
        this.center = {
            x: 175,
            y: 175
        };
        this.size = {
            x: 20,
            y: 20
        };
    }


    update() {
        this.center.x = Math.floor(Math.random() * (335 - 175 + 1)) + 175;
        this.center.y = Math.floor(Math.random() * (335 - 175 + 1)) + 175;
        if (colliding(this.snitch, this.player)) {
            this.snitch.update
        } else {
            this.center.x = this.center.x;
            this.center.y = this.center.y;
        }
    }

    draw() {
        this.game.screen.fillStyle = "#F1B72A";
        this.game.screen.fillRect(this.center.x - 10, this.center.y - 10, this.size.x, this.size.y);
    }
}

// ### Step 5

// Add hazards to the game. These hazards work like in the example game: flying squares that come from a random edge of the canvas and travel to the opposite edge. They should cross through the outer rectangle that encloses the player. If the player and a hazard collide, reset the score.

class Bludger {
    constructor(game) {
        this.game = game;
        this.size = {x: 30, y:30}
        this.center = {x: 200, y:15}
        // RANDOM with either X or Y set to 0 or 500
    }

    draw() {
        this.game.screen.fillStyle = "#000";
        this.game.screen.fillRect(this.center.x-15, this.center.y-15, this.size.x, this.size.y);
    }
// update() {
//     if (colliding (this.bludger, this.player)) {
//         this.bludger.update} else {
//             this.center.x = this.center.x + 0.5;
//              this.center.y = this.center.y + 0.5;
//         }
// }

    update () {
        this.center.y+=2;
    }
}


class Keyboarder {
    constructor() {
        this.keyState = {}

        window.addEventListener('keydown', function (e) {
            this.keyState[e.keyCode] = true
        }.bind(this))

        window.addEventListener('keyup', function (e) {
            this.keyState[e.keyCode] = false
        }.bind(this))
    }

    isDown(keyCode) {
        return this.keyState[keyCode] === true
    }

    on(keyCode, callback) {
        window.addEventListener('keydown', function (e) {
            if (e.keyCode === keyCode) {
                callback()
            }
        })
    }
}

Keyboarder.KEYS = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    // S: 83
}

var bludgerStartTop = function () {
    x = Math.floor(Math.random() * (335 - 175 + 1)) + 175;
    // y = Math.floor(Math.random() * (335 - 175 + 1)) + 175
    bludgerStartTop = x;
    console.log(x)
}

var score = 0;

var colliding = function (b1, b2) {
    return !(
        b1 === b2 ||
        b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
        b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
        b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
        b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
    );
};

// var notCollidingWithAnything = function(b1) {
//     return this.bodies.filter(function(b2) { return colliding(b1, b2); }).length === 0;
//   };

var canvas = document.getElementById("game-canvas");
window.addEventListener('load', function () {
    var game = new Game(canvas);
    game.tick()
});