import express from "express";
import { Contract, ProxyProvider, BasicWallet } from 'elrondjs'


const app = express();


const http = require('http').Server(app);
let io = require("socket.io")(http);

// app.locals.io = getIOServer(http);
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

io.on("connection", (socket: any) => {
    // tslint:disable-next-line:no-console
    console.log("a user connected");
    // whenever we receive a 'message' we log it out
    socket.on("open-wallet", (message: any) => {
        // tslint:disable-next-line:no-console
        const wallet = BasicWallet.fromJsonKeyFileString(message, 'password');
        console.log(wallet, message);
    });
});

// start the Express server
http.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});