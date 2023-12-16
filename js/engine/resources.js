// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image(), // The Image instance for the player.
  playerMove1: new Image(),
  playerMove2: new Image(),
  playerJump1: new Image(),
  playerJump2: new Image(),
  playerJump3: new Image(),
  playerJump4: new Image(),
  playerJump5: new Image(),
  playerJump6: new Image(),
  playerJump7: new Image(),
  playerJump8: new Image(),

  enemy: new Image(), // The Image instance for the enemy.

  collectible: new Image('./resources/images/Collectibles/collectible.png'),
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: new Audio('./resources/audio/jump.wav'), // The file path of the jump sound.
  bgm: new Audio('./resources/audio/bgm.mp3'),
  // Add more audio file paths as needed
};

// Set the source of the player image.
Images.player.src = './resources/images/player/player.png'; // Update the image path
Images.playerMove1.src = './resources/images/player/playerMove1.png';
Images.playerMove2.src = './resources/images/player/playerMove2.png';
Images.playerJump1.src = './resources/images/player/playerJump1.png';
Images.playerJump2.src = './resources/images/player/playerJump2.png';
Images.playerJump3.src = './resources/images/player/playerJump3.png';
Images.playerJump4.src = './resources/images/player/playerJump4.png';
Images.playerJump5.src = './resources/images/player/playerJump5.png';
Images.playerJump6.src = './resources/images/player/playerJump6.png';
Images.playerJump7.src = './resources/images/player/playerJump7.png';
Images.playerJump8.src = './resources/images/player/playerJump8.png';

// Set the source of the enemy image.
Images.enemy.src = './resources/images/enemy/enemy.png'; // Update the image path



// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };
