import { filter, Schema, type } from "@colyseus/schema";
import { boolean } from "@colyseus/schema/lib/encoding/decode";
import { Client } from "colyseus";

export class Block extends Schema {
    @type("string")
    id: string;

    @type("number")
    x: number;

    @type("number")
    y: number;

    @type("boolean")
    visible: boolean = true;
    
    //TODO: only make this visible to a ants within range
    @filter(function(
        this: Block, // the instance of the class `@filter` has been defined (instance of `Card`)
        client: Client, // the Room's `client` instance which this data is going to be filtered to
        value: Block['blocktype'], // the value of the field to be filtered. (value of `number` field)
        root: Schema // the root state Schema instance
    ) {
        return this.visible;
    })
    @type("uint8") blocktype: number;
}
