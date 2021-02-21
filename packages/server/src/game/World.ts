import { MapSchema, Schema, type } from "@colyseus/schema";
import {Block} from './Block';
import {nanoid} from "nanoid";
export class World extends Schema{
    @type({ map: Block })
    blocks = new MapSchema<Block>();


    init(){
          for(let i = 0; i < 10; i++){
               for(let j = 0; j < 10; j++){
                    let block = new Block();
                    block.x = i * 100;
                    block.y = j * 100;
                    block.blocktype = Math.floor(Math.random()*5);
                    block.id = nanoid(10);
                    this.blocks.set(block.id, block);
               }     
          }
    }
}


