import { MapSchema, Schema, type } from "@colyseus/schema";
import {Block} from './Block';
import {nanoid} from "nanoid";
export class World extends Schema{
    @type({ map: Block })
    blocks = new MapSchema<Block>();


    init(){
         let id = nanoid(10);
         console.log("id"+id);
          for(let i = 0; i < 100; i++){
               
               //this.blocks.push()
          }
    }
}


