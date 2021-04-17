import express from "express";
import *  as http from 'http';
const app = express();


const server = http.createServer(app);
// const io = require("socket.io")(httpServer);
// app.locals.io = getIOServer(http);
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );