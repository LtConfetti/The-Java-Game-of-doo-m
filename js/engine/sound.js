import Renderer from "./renderer.js";
import { AudioFiles } from './resources.js';
import Component from "./component.js";


class Sounds extends Component{
    constructor(){
        super();
        this.sound = {};
    }

    addSound(name, path){
        this.sound[name] = path;
    }
    playSound(name){
        this.sound[name].play();
    }

    update(deltaTime){
        
    }
}

export default Sounds;