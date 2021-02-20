import { RegisteredHandler, Room } from 'colyseus';
import {Game} from '../game/Game';
import {isIdFree, takeId} from './roomIdStore';
import {Types} from '@adventurers/common';
import {MessageHandler} from './MessageHandler';
export interface RoomOptions {
    roomId: string;
    random: boolean;
    maxClients: number;
  }

export class GameRoom extends Room {
    game: Game;
    messageHandler: MessageHandler;
    player: Types.Player = {x:100, y:100, distance: 10};
    async onCreate (options: Partial<RoomOptions>){
    this.game = new Game();
    this.setState(this.game.world);
    this.game.world.init();
    const seekingId = options.roomId?.toLowerCase()
    if (seekingId && !isIdFree(seekingId)) {
        this.roomId = seekingId
    }
    takeId(this.roomId);
    this.registerMessages();

    setInterval(() => this.messageHandler.broadcastTimestamp(), 1000);
    this.startGameLoop();
    }

    gameLoopInterval: ReturnType<typeof setInterval>;
    startGameLoop() {
        this.gameLoopInterval = setInterval(() => {
          this.tick();
        }, 1000/60);
      }

    registerMessages(){
        this.messageHandler = new MessageHandler(this, this.game);
        this.messageHandler.registerMessages();
    }
    tick(){
        const ts = Date.now();
        this.game.tick(ts);
    }

}