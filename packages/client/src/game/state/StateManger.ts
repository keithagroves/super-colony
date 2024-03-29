import {Room} from 'colyseus.js';
import {ColyseusService} from 'services/colyseus';
import {Types} from '@adventurers/common';
import { PlayerViewManager } from './managers/PlayerViewManager';

export class StateManager{

    room!:Room;
    roomId!: string;
    sessionId!: string;
    firstState: boolean = false;
    me:Types.Player = {x:100,y:100, distance:0}
    serverLatencyOffset: number = 50;
    playerView: PlayerViewManager = new PlayerViewManager(0,0);
    async create(colyseus: ColyseusService, lobby: string): Promise<StateManager> {
        const result = new StateManager(colyseus, lobby);
        await result.setup(); return result;
      }

    async setup() {
        this.room = await this.colyseus.getGameRoom(this.lobby);
        this.roomId = this.room.id;
        this.sessionId = this.room.sessionId;
        const handlers: Record<number | "timestamp"|"player", (v: any) => void> = {
          
          timestamp: (v) => {
            this.serverLatencyOffset = v - Date.now();
          },
          player: (v) => (this.me = v),
        
      }
      for (let msg in handlers) {
        const key = msg as any;
        this.room.onMessage(key, handlers[key]);
       
      }
      }

      constructor(readonly colyseus: ColyseusService, readonly lobby:string){

      }

      tick(){
          this.firstState = true;
            const t = Date.now();
          this.playerView.tick(t);
      }
} 