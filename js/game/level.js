// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import {Images} from '../engine/resources.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);
    
    // Create a player object and add it to the game
    const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
    this.addGameObject(player);
  

    // Set the game's camera target to the player
    this.camera.target = player;

    // Define the platform's width and the gap between platforms
    let platformWidth = 200;
    let gap = 100;

    // Create platforms and add them to the game
    const platforms = [
      new Platform(0, this.canvas.height - 20, platformWidth + 3000, 20, 'gray', Images.platform3),
      new Platform(0, this.canvas.height - 20, platformWidth - 150, -3000, 'gray', Images.platform2),

      new Platform(platformWidth + gap, this.canvas.height - 170, platformWidth, 20),
      new Platform(5 * (platformWidth + gap), this.canvas.height - 150, platformWidth, 20),
      new Platform(2 * (platformWidth + gap), this.canvas.height - 168, platformWidth, 20),
      new Platform(4 * (platformWidth + gap), this.canvas.height - 175, platformWidth, 20),
      new Platform(7 * (platformWidth + gap), this.canvas.height - 140, platformWidth, 20),
      new Platform(11 * (platformWidth + gap), this.canvas.height - 146, platformWidth, 20),
      new Platform(2 * (platformWidth + gap), this.canvas.height - 350, platformWidth, 20),
      new Platform(3.5 * (platformWidth + gap), this.canvas.height - 330, platformWidth, 20),
      new Platform(4 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
      new Platform(4 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
      new Platform(4 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
      new Platform(4 * (platformWidth + gap), this.canvas.height - 20, platformWidth, 20),
      new Platform(3 * (platformWidth + gap), this.canvas.height - 150, platformWidth, 27),
      new Platform(5 * (platformWidth + gap), this.canvas.height - 522, platformWidth, 9),
      new Platform(7 * (platformWidth + gap), this.canvas.height - 853, platformWidth, 28),
      new Platform(9 * (platformWidth + gap), this.canvas.height - 473, platformWidth, 7),
      new Platform(2 * (platformWidth + gap), this.canvas.height - 1124, platformWidth, 23),
      new Platform(8 * (platformWidth + gap), this.canvas.height - 1362, platformWidth, 26),
      new Platform(4 * (platformWidth + gap), this.canvas.height - 632, platformWidth, 5),
      new Platform(10 * (platformWidth + gap), this.canvas.height - 1322, platformWidth, 13),
      new Platform(5 * (platformWidth + gap), this.canvas.height - 150, platformWidth, 27),
      new Platform(9 * (platformWidth + gap), this.canvas.height - 522, platformWidth, 9),
      new Platform(8 * (platformWidth + gap), this.canvas.height - 853, platformWidth, 28),
      new Platform(4 * (platformWidth + gap), this.canvas.height - 473, platformWidth, 7),
      new Platform(10 * (platformWidth + gap), this.canvas.height - 1124, platformWidth, 23),
      new Platform(2 * (platformWidth + gap), this.canvas.height - 1362, platformWidth, 26),
      new Platform(7 * (platformWidth + gap), this.canvas.height - 632, platformWidth, 5),
      new Platform(3 * (platformWidth + gap), this.canvas.height - 1322, platformWidth, 13),
      new Platform(6 * (platformWidth + gap), this.canvas.height - 425, platformWidth, 29),
      new Platform(1 * (platformWidth + gap), this.canvas.height - 1238, platformWidth, 6),
      new Platform(5 * (platformWidth + gap), this.canvas.height - 150, platformWidth, 20),
      new Platform(9 * (platformWidth + gap), this.canvas.height - 800, platformWidth, 10),
      new Platform(8 * (platformWidth + gap), this.canvas.height - 300, platformWidth, 15),
      new Platform(4 * (platformWidth + gap), this.canvas.height - 500, platformWidth, 25),
      new Platform(10 * (platformWidth + gap), this.canvas.height - 700, platformWidth, 30),
      new Platform(2 * (platformWidth + gap), this.canvas.height - 200, platformWidth, 5),
      new Platform(7 * (platformWidth + gap), this.canvas.height - 400, platformWidth, 12),
      new Platform(1 * (platformWidth + gap), this.canvas.height - 1000, platformWidth, 8),
      new Platform(3 * (platformWidth + gap), this.canvas.height - 600, platformWidth, 18),
      new Platform(6 * (platformWidth + gap), this.canvas.height - 900, platformWidth, 22),

    ];
    //x, y, width, height

    for (const platform of platforms) {
      this.addGameObject(platform);
    }


    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(300, this.canvas.height - 1050, 20, 20, 'gray',Images.collectible, 'collectible'));


    //copilot helped with final part, for loop was my idea
    for (let i = 0; i < 30; i++) {
      const x = Math.floor(Math.random() * (3000 - 200 + 1)) + 200;
      const y = Math.floor(Math.random() * (800 - 200 + 1)) + 200;
      const width = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
      const height = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
  
      this.addGameObject(new Collectible(x, this.canvas.height - y, width, height, 'gray', Images.collectible2, 'health'));
  }
  
  //copilot helped with final part, for loop was my idea
  for (let i = 0; i < 30; i++) {
      const x = Math.floor(Math.random() * (3000 - 200 + 1)) + 200;
      const y = Math.floor(Math.random() * (800 - 200 + 1)) + 200;
      const width = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
      const height = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
  
      this.addGameObject(new Collectible(x, this.canvas.height - y, width, height, 'gray', Images.collectible2, 'jump'));
  }
        // Add the player UI object to the game MOVED HERE BECAUSE IT WOULD BREAK OTHERWISE
        this.addGameObject(new PlayerUI(10, 10));
  }
  
  
}
// Export the Level class as the default export of this module
export default Level;
