import { IInputs } from "@adventurers/common/build/types";
import { Z_BEST_SPEED } from "zlib";

export class PlayerViewManager{
    x: number;
    y: number;
    scrollSpeed: number = 3;
    inputState: IInputs = {
    left: false,
    up: false,
    right: false,
    down: false,
    shoot: false,
  }
  lastUpdate:number = Date.now();
    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    inputs(inputState: IInputs){
        //Object.apply(inputState, this.inputState);
        Object.assign(this.inputState,inputState);
        console.log(inputState);
    }

    tick(t: number){
        let dx = (t-this.lastUpdate)/50;
        this.lastUpdate = t;
        if(this.inputState.up)
            this.y-=this.scrollSpeed/dx;
        if(this.inputState.down)
            this.y+=this.scrollSpeed/dx;
        if(this.inputState.left)
            this.x-=this.scrollSpeed/dx;
        if(this.inputState.right)
            this.x+=this.scrollSpeed/dx;
        
    }

}