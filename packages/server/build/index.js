"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_1 = require("http");
const colyseus_1 = require("colyseus");
const GameRoom_1 = require("./rooms/GameRoom");
const path_1 = require("path");
function findPort() {
    if (process.env.PORT) {
        return parseInt(process.env.PORT);
    }
    return 8001;
}
const app = express();
app.use(express.json());
const server = new colyseus_1.Server({
    server: http_1.createServer(app),
    express: app
});
// Serve static resources from the "public" folder
app.use(express.static(path_1.join(__dirname, 'public')));
// Serve the frontend client
app.get('*', (req, res) => {
    res.sendFile(path_1.join(__dirname, 'public', 'index.html'));
});
server
    .define("game", GameRoom_1.GameRoom);
server
    .define("random", GameRoom_1.GameRoom, { random: true });
// Make sure to never call the `simulateLatency()` method in production.
const latency = 100;
if (process.env.NODE_ENV !== "production") {
    // simulate 100ms latency between server and client.
    console.log("WARNING: simulating" + latency + "ms latency");
    server.simulateLatency(latency);
}
const PORT = findPort();
server.listen(PORT);
console.log(`Listening on ws://localhost:${PORT}`);
