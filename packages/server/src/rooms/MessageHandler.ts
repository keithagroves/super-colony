import { Types } from "@adventurers/common";
import { Game } from "game/Game";
import { GameRoom } from "./GameRoom";

export class MessageHandler{
    game: Game;
    room: GameRoom;
    constructor(room, game){
        this.room = room;
        this.game = game;
    }

    registerMessages(){
       this.room.onMessage("trail", this.createTrail); 
    }
    inputMessage(){
    }

    createTrail(){

    }


    broadcastTimestamp() {
        this.room.broadcast("timestamp", Date.now());
    }
    broadcastPlayer(player :Types.Player) {
        this.room.broadcast("player", player);
    }

}