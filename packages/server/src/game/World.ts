import { MapSchema, Schema, type } from "@colyseus/schema";
import {Block} from './Block';
import {nanoid} from "nanoid";
export class World extends Schema{
    @type({ map: Block })
    blocks = new MapSchema<Block>();


    init(){
         let id = nanoid(10);
          for(let i = 0; i < 100; i++){
               for(let j = 0; j < 100; j++){
                    let block = new Block();
                    block.x = i * 10;
                    block.y = j * 10;
                    block.blocktype = Math.floor(Math.random()*5);
                    block.id = nanoid(10);
               }     
          }
    }
}


