import * as express from 'express';
import { createServer } from 'http';
import { Server } from 'colyseus';
import { GameRoom } from './rooms/GameRoom';
import { join } from 'path';

function findPort(): number {
  if (process.env.PORT) {
    return parseInt(process.env.PORT);
  }
  return 8001;
}

const app = express();

app.use(express.json());

const server = new Server({
  server: createServer(app),
  express: app
})

// Serve static resources from the "public" folder
app.use(express.static(join(__dirname, 'public')));

// Serve the frontend client
app.get('*', (req: any, res: any) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

server
  .define("game", GameRoom)

server
  .define("random", GameRoom, {random: true})

// Make sure to never call the `simulateLatency()` method in production.
const latency = 100;
if (process.env.NODE_ENV !== "production") {
  // simulate 100ms latency between server and client.
  console.log("WARNING: simulating" + latency+"ms latency");
  server.simulateLatency(latency);
}

const PORT = findPort();
server.listen(PORT);
console.log(`Listening on ws://localhost:${PORT}`);
