export interface Player{
    x:number,
    y:number,
    distance: number
}

export interface IInputs {
    left: boolean;
    up: boolean;
    right: boolean;
    down: boolean;
    shoot: boolean;
  }