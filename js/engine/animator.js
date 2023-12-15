import {Images} from '../engine/resources.js';
import Renderer from "./renderer.js";
import Component from './component.js';

class GameAnimation extends Component{

constructor(){
    super();
    this.gameAnimation = []; 
    this.currentFrame = 0;
    this.speed = 1;
    this.currentAnimation = 0;
}

addAnimation(animation){
    this.gameAnimation.push(animation);
}

update(deltaTime) {
    this.currentFrame += deltaTime * this.speed;
    if (this.currentFrame >= this.gameAnimation[this.currentAnimation].length) {
      this.currentFrame = 0;
    }
  
    let renderer = this.gameObject.getComponent(Renderer);
    renderer.image = this.gameAnimation[this.currentAnimation][Math.floor(this.currentFrame)];
  }


}
export default GameAnimation;