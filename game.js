

// ### Step 1

//  Create a 500x500 `canvas` tag in your HTML for the game. Create a `Game` class that takes a canvas node and saves it. This class should have a method `draw` that draws a "hollow" (10px white line, no fill) 200x200 square in the middle of the canvas.

// This class should also have a method `tick` that calls the `draw` method and uses `requestAnimationFrame` to call `tick` again.

class Game {
    constructor (canvas) {
        
        function draw(screen, ?) {
            var canvas = document.getElementById("game-canvas");
            var screen = canvas.getContext('2d');


        }

        tick (draw) {
        requestAnimationFrame(this)
    }
    }
}

// ### Step 2

// Create a `Player` class. This class should have a method `draw` that draws 
// a 40x40 square in the middle of the canvas. The `Game` class's `draw` method should call the `Player` class's `draw` method.

// ### Step 3

// Add movement to the player's rectangle. The rectangle should not be allowed to move outside the containing hollow rectangle.

// Create a `Keyboarder` class. You can use the one from [Cook's annotated Space Invaders](http://annotated-code.maryrosecook.com/space-invaders/docs/space-invaders.html). Use your keyboarder to make the player's rectangle move. To do this, you will need to add an `update` method to the `Game` class, and an `update` method to the `Player` class.

// ### Step 4

// Add a coin for the player to gather to the game. This coin, like in the example game, should appear in a random position that is not the player's current position. When the player collects it, it should disappear and reappear elsewhere.

// Add a score to the game. The score should go up by one every time the coin is collected.

// To do this, you will likely want to create a `Coin` class.

// ### Step 5

// Add hazards to the game. These hazards work like in the example game: flying squares that come from a random edge of the canvas and travel to the opposite edge. They should cross through the outer rectangle that encloses the player. If the player and a hazard collide, reset the score.

// ## Additional resources

// * [Canvas tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
// * [Canvas chapter from _Eloquent JavaScript_](https://eloquentjavascript.net/17_canvas.html)
// * [Game project from _Eloquent JavaScript_](https://eloquentjavascript.net/3rd_edition/16_game.html)
// * [Lessmilk Game Tutorials](http://www.lessmilk.com/)