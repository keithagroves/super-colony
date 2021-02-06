import { Room } from 'colyseus';
import {Game} from '../game/Game';
import {isIdFree, takeId, freeId} from './roomIdStore';
import {Types} from '@adventurers/common';
export interface RoomOptions {
    roomId: string;
    random: boolean;
    maxClients: number;
  }

export class GameRoom extends Room {
    game: Game;
    player: Types.Player = {x:100, y:100};
    async onCreate (options: Partial<RoomOptions>){
    this.game = new Game();
    const seekingId = options.roomId?.toLowerCase()
    if (seekingId && !isIdFree(seekingId)) {
        this.roomId = seekingId
    }
    takeId(this.roomId);
    this.registerMessages();

    setInterval(() => this.broadcastTimestamp(), 1000);
    this.startGameLoop();
    }

    gameLoopInterval: ReturnType<typeof setInterval>;
    startGameLoop() {
        this.gameLoopInterval = setInterval(() => {
          this.tick();
        }, 1000/60);
      }

    registerMessages(){

    }
    tick(){
        const ts = Date.now();
        this.game.tick(ts);
        this.broadcastPlayer(this.player);
        this.player.x++;
    }
    broadcastTimestamp() {
        this.broadcast("timestamp", Date.now());
      }
      broadcastPlayer(player :Types.Player) {
        this.broadcast("player", player);
      }
}