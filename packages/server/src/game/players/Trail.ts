import { Schema, type ,ArraySchema} from "@colyseus/schema";
import {Block} from '../Block';
export class Trail extends Schema{
    @type([ Block ])
    path = new ArraySchema<Block>();

}