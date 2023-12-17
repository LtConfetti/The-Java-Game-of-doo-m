// Importing necessary components and resources
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { Images, AudioFiles } from '../engine/resources.js';
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
    this.getComponent(Sounds).addSound("CollectJ", AudioFiles.collectJump);
    this.getComponent(Sounds).addSound("CollectH", AudioFiles.collectHealth);
    this.getComponent(Sounds).addSound("Game End", AudioFiles.gameOver);
    this.getComponent(Sounds).addSound("Collect", AudioFiles.collect);
    this.getComponent(Sounds).addSound("Hurt", AudioFiles.hurt);

    // Initialize player-specific properties.
    this.direction = 1;
    this.lives = 1;
    this.score = 0;
    this.isOnPlatform = false;
    this.speed = 10;
    this.isJumping = false;
    this.jumpForce = 7;
    this.jumpTime = 0.3;
    this.jumpTimer = 0;
    this.isInvulnerable = false;
    this.death = false;
    this.jumpCount = 5;
  }

  // The update function runs every frame and contains game logic
  update(deltaTime) {
    const physics = this.getComponent(Physics); // Get physics component
    const input = this.getComponent(Input); // Get input component


    
    // Handle player movement
    if (!this.death && input.isKeyDown('ArrowRight')) {
      physics.velocity.x = this.speed;
      this.direction = -1;
    } else if (!this.death && input.isKeyDown('ArrowLeft')) {
      physics.velocity.x = -this.speed;
      this.direction = 1;
    } else {
      physics.velocity.x = 0;
    }


    // Handle player jumping
    if (!this.death && input.isKeyDown('ArrowUp') && physics.isGrounded) {
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

  

  
    // Check if player has fallen off the bottom of the screen
    if (this.y > this.game.canvas.height) {
      this.resetPlayerState();
    }

    // Check if player has no lives left
    //setInterval from https://www.w3schools.com/jsref/met_win_setinterval.asp
    if (this.lives <= 0 || this.jumpCount == 0) {
      this.getComponent(Sounds).playSound("Game End");
      setInterval(function() {location.reload();}, 5000);
      this.death = true;
    }

    // Check if player has collected all collectibles
    if (this.score == 1) {
      console.log('You win!');
      this.getComponent(Sounds).playSound("Collect");
      setInterval(function() {location.reload();}, 1000);
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
      //1 IS THE WALKIN ANIMATION, IF I WANT TO MAKE A JUMP ANIMATION I WILL = 2 AND SO ON
      anim.speed = 10;
      console.log("Moving working");
    }

    super.update(deltaTime);
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


  collect(collectible) {
      // Handle collectible pickup
      if (collectible.tag === 'collectible') {
          this.score += collectible.value;
          this.emitCollectParticles(collectible);
      } else if (collectible.tag === 'health') {
          // Handle collectible pickup
          this.lives += collectible.value;
          this.speed += collectible.value;
          this.emitCollectParticles(collectible);
          setTimeout(() => {
            this.getComponent(Sounds).playSound("CollectH");
          }, 1500);
      }
     else if (collectible.tag === 'jump') {
      // Handle collectible pickup
      this.jumpCount += collectible.value;
      this.jumpForce += collectible.value;
      this.emitCollectParticles(collectible);
      setTimeout(() => {
        this.getComponent(Sounds).playSound("CollectJ");
      }, 1500);
     }
  }



  emitCollectParticles() {
    // Create a particle system at the player's position when a collectible is collected
    const particleSystem = new ParticleSystem(this.x, this.y, 'black', 20, 1, 0.5);
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
    this.lives = 1;
    this.score = 0;
    this.resetPlayerState();
  }

  getJumpCount() {
    return this.jumpCount;
  }
}

export default Player;
