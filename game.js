class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.screen = canvas.getContext('2d');
        widgets = [];
        this.gameSize = {
            x: canvas.width,
            y: canvas.height
        }
        this.player = new Player(this);
        this.keyboarder = new Keyboarder();
        this.snitch = new Snitch(this);
        // this.beater = new Beater();
    }

    update() {

        if (colliding (this.player, this.snitch)) {
            this.snitch.update();
            }//detect collisions from ?
        this.player.update();
        
        // this.beater.update();
    }

    draw() {
        //can clear by covering previous with background color,OR using clearRect
        // screen.clearRect(0, 0, gameSize.x, gameSize.y);
        this.screen.clearRect(0, 0, this.gameSize.x, this.gameSize.y)


        this.screen.strokeStyle = "#FFF";
        this.screen.lineWidth = 10;
        this.screen.strokeRect(150, 150, 200, 200);

        this.screen.font = "40px Arial";
        this.screen.fillStyle = "#F1B72A";
        this.screen.textAlign = "center";
        this.screen.fillText("Snitch Snatch", 250, 50);

        this.player.draw();
        this.snitch.draw();
        // this.beater.draw();
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
        if (this.Keyboarder.isDown(Keyboarder.KEYS.LEFT) && this.center.x > 181) {
            this.center.x -= 5;
        } else if (this.Keyboarder.isDown(Keyboarder.KEYS.RIGHT) && this.center.x < 320) {
            this.center.x += 5;
        } else if (this.Keyboarder.isDown(Keyboarder.KEYS.UP) && this.center.y > 181) {
            this.center.y -= 5;
        } else if (this.Keyboarder.isDown(Keyboarder.KEYS.DOWN) && this.center.y < 320) {
            this.center.y += 5;
        }
    }
    draw() {
        this.game.screen.fillStyle = "#F1B72A";
        this.game.screen.fillRect(this.center.x - this.size.x / 2, this.center.y - this.size.y / 2, this.size.x, this.size.y);
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



// ### Step 4

// Add a coin for the player to gather to the game. This coin, like in the example game, should appear in a random position that is not the player's current position. When the player collects it, it should disappear and reappear elsewhere.

// Add a score to the game. The score should go up by one every time the coin is collected.

// To do this, you will likely want to create a `Coin` class.


//"Coin"
class Snitch {
    constructor(game) {
        this.game = game;
        this.center = {x:155, y:155};
        this.size = {
            x: 20,
            y: 20
        };
    }

    update() {
        //if no collision, {
        //     don't change position
        // } else {}
        this.center.x = Math.floor(Math.random() * (310 - 191 + 1)) + 191;
        this.center.y = Math.floor(Math.random() * (310 - 191 + 1)) + 191;
        // console.log("snitch")
    }

    draw() {
        this.game.screen.fillStyle = "#F1B72A";
        this.game.screen.fillRect(this.center.x, this.center.y, this.size.x, this.size.y);
    }

    // score() {
    // when collision with Player, 
    //  score += score
    // }
}

// ### Step 5

// Add hazards to the game. These hazards work like in the example game: flying squares that come from a random edge of the canvas and travel to the opposite edge. They should cross through the outer rectangle that encloses the player. If the player and a hazard collide, reset the score.

// class Beater {
//     constructor(game) {
//         this.game = game;
//         // this.size = 
//         // this.center = 
//     }
//     draw() {
//         this.game.screen.fillStyle = "#2a623d";
//         // this.game.screen.fillRect(20, 20, 0, 250);
//     }
// }

var colliding = function (b1, b2) {
    return !(
        b1 === b2 ||
        b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
        b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 ||
        b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 ||
        b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2
    );
};

var canvas = document.getElementById("game-canvas");
window.addEventListener('load', function () {
    var game = new Game(canvas);
    game.tick()
});