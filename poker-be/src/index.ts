import express from "express";
import { Server } from "socket.io";
import { DataStore } from "./dataStore";
import { createContractHandler } from "./wsEndpoints/create-contract";
import { walletOpenHandler } from "./wsEndpoints/open-wallet";


const app = express();

const http = require('http').Server(app);
let io = require("socket.io")(http) as Server;

// app.locals.io = getIOServer(http);
const dataStore = new DataStore(io); 
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

io.on("connection", (socket: any) => {
    // tslint:disable-next-line:no-console
    console.log("a user connected");
    // whenever we receive a 'message' we log it out
    socket.on("open-wallet", walletOpenHandler);
    socket.on("create-contract", () => createContractHandler(dataStore));
});

// start the Express server
const port = 8080; // default port to listen
http.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});

