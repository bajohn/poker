import express from "express";
import { Server } from "socket.io";



import { wsSetup, dataStore } from "./wsRouter";


const app = express();
app.use(express.json()) // To parse the incoming requests with JSON payloads

const http = require('http').Server(app);
let io = require("socket.io")(http) as Server;

wsSetup(io);

// app.locals.io = getIOServer(http);

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

// Dev only endpoints. Any better way to do this? Should be fine.
if (process.env.NODE_ENV === 'development') {
    app.get('/get-dev-game', (req, res) => {
        const gameId = dataStore.latestGameId();
        res.send({ gameId });
    });
    app.post('/setup-test-hands', (req, res) => {
        dataStore.setTestId(req.body.gameId, req.body.testId);
        res.send('Done')
    });
}



// start the Express server
const port = 8080; // default port to listen
http.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost:${port}`);
    console.log(`Node env: ${process.env.NODE_ENV}`)
    
});

