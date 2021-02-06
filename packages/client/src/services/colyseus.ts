import { Client, Room } from "colyseus.js";

import log from "loglevel";

export class ColyseusService {
  client: Client;
  constructor(protocol: string, endpoint: string, port: string) {
    const path = protocol + "://" + endpoint + (port ? ":" + port : "");
    log.info("Colyseus path:", path);
    this.client = new Client(path);
  }

  async getGameRoom(lobby: string): Promise<Room> {

    let options: any = {
      name: localStorage.getItem("name"),
    };

    if (lobby === 'random') {
      return await this.client.joinOrCreate("random", options);
    }

    try {
      return await this.client.joinById(lobby, options);
    } catch (e) {
      return await this.client.joinOrCreate("random", options);
    }
  }
}
