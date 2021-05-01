import express from "express";
import { Server } from "socket.io";



import { wsSetup } from "./wsRouter";


const app = express();

const http = require('http').Server(app);
let io = require("socket.io")(http) as Server;

wsSetup(io);

// app.locals.io = getIOServer(http);

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});


// start the Express server
const port = 8080; // default port to listen
http.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});

