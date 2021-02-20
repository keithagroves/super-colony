import { Schema, type } from "@colyseus/schema";

export class Block extends Schema {
    @type("number")
    id: number;

    @type("number")
    x: number;

    @type("number")
    y: number;
}
