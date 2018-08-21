// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y + 55; // center
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //If enemy hasn't passed a boudary
    if(this.x < this.boundary * 5) {
      //move forward
      //increment x by speed * dt
      this.x += this.speed * dt;
    }
    // else reset position to start
    else {
      this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {

/*
**  Constructor
*/

  constructor() {
    this.sprite = 'images/char-boy.png';
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 4) + 55;
    this.x = this.startX;
    this.y = this.startY;
    this.victory = false;
  }

/*
**  Update method
*/

  update() {

    /*
    **  Collision Check
    */

    for(let enemy of allEnemies) {

      //did players x and y collide with an enemy?
      if (this.y === enemy.y && (enemy.x + enemy.step/1.5 > this.x && enemy.x < this.x + this.step/1.5)) {

        // Ummm yup, start over
        this.reset();

      }

    }

  }

/*
**  Did they win?
**  Check to see if the final tile has been reached.
*/

  forTheWinCheck() {

    if(this.y == 55){

      // C
      this.victory = true;

    }

  }

/*
**  Draw hero sprite on current x and y coord position
*/

  render() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    player.forTheWinCheck();

  };

  // Reset hero
  reset() {

    //set x and y to starting x and y
    this.y = this.startY;
    this.x = this.startX;

  }

  /**
   * Update Hero's x and y property according to handleInput
   * @param  {string} input - Direction to travel
   */

   //Create Input Handler
  handleInput(input) {

    switch(input) {
      case 'left':
        if (this.x > 0) {
          this.x -= this.step;
        }
          break;
      case 'up':
        if (this.y > this.jump) {
          this.y -= this.jump;
        }
          break;
      case 'right':
          if (this.x < this.step * 4) {
          this.x += this.step;
        }
          break;
      case 'down':
          if (this.y < this.jump * 4) {
          this.y += this.jump;
        }
          break;
    }

  }

}


// Now instantiate your objects.
  //Store the new object in a variable called player
const player = new Hero();
const bug1 = new Enemy(-101, 0, 300);
const bug2 = new Enemy(-101, 83, 200);
const bug3 = new Enemy((-101*2.5), 83, 300);
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
