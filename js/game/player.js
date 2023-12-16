// Importing necessary components and resources
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { Images, AudioFiles } from '../engine/resources.js';
import Enemy from './enemy.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import ParticleSystem from '../engine/particleSystem.js';
import GameAnimation from '../engine/animator.js';
import Sounds from '../engine/sound.js';



// Defining a class Player that extends GameObject
class Player extends GameObject {
  // Constructor initializes the game object and add necessary components
  constructor(x, y) {
    super(x, y); // Call parent's constructor
 this.renderer = new Renderer('blue', 50, 50, Images.player);
    this.addComponent(this.renderer);
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }));
    this.addComponent(new Input());
    this.addComponent(new GameAnimation());
    this.getComponent(GameAnimation).addAnimation([Images.player]);
    this.getComponent(GameAnimation).addAnimation([Images.playerMove1, Images.playerMove2]);
    this.getComponent(GameAnimation).addAnimation([Images.playerJump1, Images.playerJump2, Images.playerJump3, Images.playerJump4, Images.playerJump5, Images.playerJump6, Images.playerJump7, Images.playerJump8, Images.playerJump9, Images.playerJump10,]);
    this.addComponent(new Sounds());
    this.getComponent(Sounds).addSound("Jump", AudioFiles.jump);

    // Initialize player-specific properties.
    this.direction = 1;
    this.lives = 3;
    this.score = 0;
    this.isOnPlatform = false;
    this.speed = 10;
    this.isJumping = false;
    this.jumpForce = 7;
    this.jumpTime = 0.3;
    this.jumpTimer = 0;
    this.isInvulnerable = false;
    this.isGamepadMovement = false;
    this.isGamepadJump = false;
    this.death = false;
    this.jumpCount = 5;
  }

  // The update function runs every frame and contains game logic
  update(deltaTime) {
    const physics = this.getComponent(Physics); // Get physics component
    const input = this.getComponent(Input); // Get input component

    console.log("peen");

    this.handleGamepadInput(input);
    
    // Handle player movement
    if (!this.death && !this.isGamepadMovement && input.isKeyDown('ArrowRight')) {
      physics.velocity.x = this.speed;
      this.direction = -1;
    } else if (!this.death && !this.isGamepadMovement && input.isKeyDown('ArrowLeft')) {
      physics.velocity.x = -this.speed;
      this.direction = 1;
    } else if (!this.isGamepadMovement) {
      physics.velocity.x = 0;
    }


    // Handle player jumping
    if (!this.death && !this.isGamepadJump && input.isKeyDown('ArrowUp') && physics.isGrounded) {
      this.startJump();
    }

    if (this.isJumping) {
      this.updateJump(deltaTime);
    }

    // Handle collisions with collectibles
    const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
    for (const collectible of collectibles) {
      if (physics.isColliding(collectible.getComponent(Physics))) {
        this.collect(collectible);
        this.game.removeGameObject(collectible);
      }
    }
  
    // Handle collisions with enemies
    const enemies = this.game.gameObjects.filter((obj) => obj instanceof Enemy);
    for (const enemy of enemies) {
      if (physics.isColliding(enemy.getComponent(Physics))) {
        this.collidedWithEnemy();
      }
    }
  

  
    // Check if player has fallen off the bottom of the screen
    if (this.y > this.game.canvas.height) {
      this.resetPlayerState();
    }

    // Check if player has no lives left
    //setInterval from https://www.w3schools.com/jsref/met_win_setinterval.asp
    if (this.lives <= 0 || this.jumpCount == 0) {
      setInterval(function() {location.reload();}, 5000);
      this.death = true;
    }

    // Check if player has collected all collectibles
    if (this.score >= 3) {
      console.log('You win!');
      location.reload();
    }


    let anim = this.getComponent(GameAnimation);

    if (this.isJumping) {
      anim.currentAnimation = 2; // Assuming playerJump 1-10 represents the jump frames in the array
      anim.speed = 21;}
    else if(physics.velocity.x == 0){
      anim.currentAnimation = 0;
      //0 IS THE IDLE, REFER TO ANIM.CURRENT = 1 FOR MORE CONTEXT
    }
    else{
      anim.currentAnimation = 1;
      //1 IS THE WALKIN ANIMATION, IF I WANT TO MAKE A JUMP ANIMATION I WILL = 2 AND SO ON, IF I WANT ENEMY THEY HAVE THEIR OWN NUMBERS
      anim.speed = 10;
      console.log("Moving working");
    }

    super.update(deltaTime);
  }

  handleGamepadInput(input){
    const gamepad = input.getGamepad(); // Get the gamepad input
    const physics = this.getComponent(Physics); // Get physics component
    if (gamepad) {
      // Reset the gamepad flags
      this.isGamepadMovement = false;
      this.isGamepadJump = false;

      // Handle movement
      const horizontalAxis = gamepad.axes[0];
      // Move right
      if (horizontalAxis > 0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = 100;
        this.direction = -1;
      } 
      // Move left
      else if (horizontalAxis < -0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = -100;
        this.direction = 1;
      } 
      // Stop
      else {
        physics.velocity.x = 0;
      }
      
      // Handle jump, using gamepad button 0 (typically the 'A' button on most gamepads)
      if (input.isGamepadButtonDown(0) && this.isOnPlatform) {
        this.isGamepadJump = true;
        this.startJump();
      }
    }
  }

  startJump() {
    if (this.jumpCount > 0) {
      this.isJumping = true;
      this.jumpTimer = this.jumpTime;

      this.getComponent(Physics).velocity.y -= this.jumpForce;

      this.isOnPlatform = false;
      this.jumpCount--;

      this.getComponent(GameAnimation).currentAnimation = 2;
      this.getComponent(GameAnimation).speed = 1;
      this.getComponent(Sounds).playSound("Jump");
    }

    if(this.jumpCount == 0){
      this.death = true;
    }

  }
  
  updateJump(deltaTime) {
    // Updates the jump progress over time
    this.jumpTimer -= deltaTime;
    if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
      this.isJumping = false;
    }



  }

  collidedWithEnemy() {
    // Checks collision with an enemy and reduce player's life if not invulnerable
    if (!this.isInvulnerable) {
      this.lives--;
      this.isInvulnerable = true;
      // Make player vulnerable again after 2 seconds
      setTimeout(() => {
        this.isInvulnerable = false;
      }, 2000);
    }
  }

  collect(collectible) {
    // Handle collectible pickup
    this.score += collectible.value;
    this.jumpCount += collectible.value;
    console.log(`Score: ${this.score}`);
    this.emitCollectParticles(collectible);
  }

  emitCollectParticles() {
    // Create a particle system at the player's position when a collectible is collected
    const particleSystem = new ParticleSystem(this.x, this.y, 'yellow', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }

  resetPlayerState() {
    // Reset the player's state, repositioning it and nullifying movement
    this.x = this.game.canvas.width / 2;
    this.y = this.game.canvas.height / 2;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.direction = 1;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpTimer = 0;
  }

  resetGame() {
    // Reset the game state, which includes the player's state
    this.lives = 3;
    this.score = 0;
    this.resetPlayerState();
  }

  getJumpCount() {
    return this.jumpCount;
  }
}

export default Player;
