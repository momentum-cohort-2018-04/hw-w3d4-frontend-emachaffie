class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.screen = canvas.getContext('2d');
        widgets = [];
        this.player = new Player(this);
        this.keyboarder = new Keyboarder();
        this.snitch = new Snitch();
        this.beater = new Beater;
    }

    update() {
        this.player.update();
        // this.snitch.update();
        // this.beater.update();
    }

    draw() {
        //can clear by covering previous with background color,OR using clearRect
        this.screen.strokeStyle = "#FFF";
        this.screen.lineWidth = 10;
        this.screen.strokeRect(150, 150, 200, 200);

        this.screen.font = "40px Arial";
        this.screen.fillStyle = "#F1B72A";
        this.screen.textAlign = "center";
        this.screen.fillText("Snitch Snatch", 250, 50);

        this.player.draw();
        // this.snitch.draw();
        // this.beater.draw();
    }

    tick() {
        this.update()
        this.draw()
        // console.log("ticky")
        requestAnimationFrame(this.tick.bind(this))
    }
}

// ### Step 2

// Create a `Player` class. This class should have a method `draw` that draws 
// a 40x40 square in the middle of the canvas. The `Game` class's `draw` method should call the `Player` class's `draw` method.

class Player {
    constructor(game) {
        this.game = game;
        this.Keyboarder = new Keyboarder();
        this.center = {x:250, y:250};
        this.size = {x:40, y:40};
    }
    update() {
        if (this.Keyboarder.isDown(Keyboarder.KEYS.LEFT)) {
            this.center.x -= 2;
        } else if (this.Keyboarder.isDown(Keyboarder.KEYS.RIGHT)) {
            this.center.x += 2;
        } else if (this.Keyboarder.isDown(Keyboarder.KEYS.UP)) {
            this.center.y -= 2;
        } else if (this.Keyboarder.isDown(Keyboarder.KEYS.DOWN)) {
            this.center.y += 2;
        }
    }
    draw() {
        this.game.screen.fillStyle = "#F1B72A";
        this.game.screen.fillRect(this.center.x-this.size.x/2, this.center.y-this.size.y/2, this.size.x, this.size.y);
    }

}

// NOTES FROM WHAT IM DOING THURS NIGHT: 
// Added new Keyboarder to Player constructor and Game constructor
// Added update methods ABOVE draw fields for both Player and Game classes
// Added update methods to Player, including addition of UP and DOWN
// Added classes Snitch (Coin) and Beater (bullet?)



// ### Step 3

// Add movement to the player's rectangle. The rectangle should not be allowed to move outside the containing hollow rectangle.

// Create a `Keyboarder` class. You can use the one from [Cook's annotated Space Invaders](http://annotated-code.maryrosecook.com/space-invaders/docs/space-invaders.html). Use your keyboarder to make the player's rectangle move. To do this, you will need to add an `update` method to the `Game` class, and an `update` method to the `Player` class.

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

class Snitch {
    constructor(game) {
        this.game = game;
    }

    // update() {

    // }

    draw() {
        this.game.screen.fillStyle = "#F1B72A";
        this.game.screen.fillRect(0, 0, 20, 20);
    }

    // score() {
    
    // }
}

// ### Step 5

// Add hazards to the game. These hazards work like in the example game: flying squares that come from a random edge of the canvas and travel to the opposite edge. They should cross through the outer rectangle that encloses the player. If the player and a hazard collide, reset the score.

class Beater {
    constructor(game) {
        this.game = game;
    }
    draw() {
        this.game.screen.fillStyle = "#2a623d";
        this.game.screen.fillRect(20, 20, 0, 250);
    }
}

var canvas = document.getElementById("game-canvas");
window.addEventListener('load', function () {
    var game = new Game(canvas);
    game.tick()
});