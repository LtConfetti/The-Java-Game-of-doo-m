// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image(), // The Image instance for the player.
  playerMove1: new Image(),
  playerMove2: new Image(),
  playerMove3: new Image(),

  enemy: new Image(), // The Image instance for the enemy.
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: new Audio('./resources/audio/jump.wav'), // The file path of the jump sound.
  bgm: new Audio('./resources/audio/bgm.mp3'),
  // Add more audio file paths as needed
};

// Set the source of the player image.
Images.player.src = './resources/images/player/player.png'; // Update the image path
Images.playerMove1.src = './resources/images/player/player2.png';
Images.playerMove2.src = './resources/images/player/player3.png';
Images.playerMove3.src = './resources/images/player/player4 (2).png';

// Set the source of the enemy image.
Images.enemy.src = './resources/images/enemy/enemy.png'; // Update the image path

// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };
