import { Maths } from "@adventurers/common";
import { IInputs } from "@adventurers/common/build/types";


export class PlayerViewManager{
    x: number;
    y: number;
    scrollSpeed: number = 5;
    inputState:IInputs = {
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
        Object.assign(this.inputState,inputState);
    }

    tick(t: number){
        let dx = (t-this.lastUpdate)/50;
        this.lastUpdate = t;
        
        if(this.inputState.up)
            this.y = Maths.lerp(this.y,this.y-this.scrollSpeed, dx);
        if(this.inputState.down)
            this.y = Maths.lerp(this.y, this.y+this.scrollSpeed, dx);
        if(this.inputState.left)
            this.x = Maths.lerp(this.x, this.x-this.scrollSpeed, dx);
        if(this.inputState.right)
            this.x = Maths.lerp(this.x, this.x+this.scrollSpeed, dx);
        
    }

}