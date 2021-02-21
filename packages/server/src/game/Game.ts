import { World } from "./World";

export class Game{
    world = new World();
    constructor(){
        
    }
    tick(timestamp: number){
        let dx = (Date.now()-timestamp)/50.0;
    }

    createTrail(){
        
    }
}