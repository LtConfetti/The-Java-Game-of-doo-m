import GameObject from '../engine/gameobject.js';
import UI from '../engine/ui.js';
import Player from './player.js';

// The PlayerUI class extends GameObject.
class PlayerUI extends GameObject {
  constructor(x, y) {
    super(x, y); // Call the constructor of the GameObject class.

    // Create a new UI component with initial text and add it to this object's components.
    this.uiComponent = new UI('Speed: 1 Score: 0', x, y);
    this.addComponent(this.uiComponent);
  }

  // The update method is called every frame.
  update(deltaTime) {
    const player = this.game.gameObjects.find((obj) => obj instanceof Player);

    // Update the text of the UI component to reflect the player's current lives and score.
    this.uiComponent.setText(`Speed: ${player.lives} Score: ${player.score} Jump Amount: ${player.jumpCount}`);
    if (player.death){
    this.uiComponent.setText(`You are forever stuck in the loop.... You are lost and hopeless....`);
    }
  }
}

export default PlayerUI; // Export the PlayerUI class for use in other modules.
