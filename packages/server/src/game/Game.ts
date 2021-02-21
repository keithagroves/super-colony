import { World } from "./World";

export class Game{
    world = new World();
    constructor(){
       //this.world.init(); 
    }
    tick(timestamp: number){
        let dx = (Date.now()-timestamp)/50.0;
    }

    createTrail(){
        
    }
}