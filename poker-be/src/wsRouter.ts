import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { DataStore } from "./dataStore";
import { wsfeendpoint } from "../../shared/sharedtypes"
import { walletOpenHandler } from "./wsEndpoints/open-wallet";
import { createGameHandler } from "./wsEndpoints/create-game";
import { playerJoinHandler } from "./wsEndpoints/player-join";
import { startGameHandler } from "./wsEndpoints/start-game";
import { iServerSocketOn } from "./types/betypes";
import { playerBetMessageHandler } from "./wsEndpoints/player-bet-message";

const dataStore = new DataStore();

const wsSetup = (io: Server) => {

    io.on("connection", (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
        console.log('connection!')
        // game socket endpoints
        socketOn(socket, "open-wallet", walletOpenHandler);
        socketOn(socket, 'create-game', createGameHandler);
        socketOn(socket, 'start-game', startGameHandler);

        // player socket endpoints
        socketOn(socket, 'player-join', playerJoinHandler);
        socketOn(socket, 'player-bet-message', playerBetMessageHandler);

        // TODO next: socketOn(socket, 'bet-response', playerJoinHandler);



    });
}

const socketOn: iServerSocketOn = (
    socket,
    beEndpoint,
    callback
) => {
    socket.on(beEndpoint, (msg: any) => { callback(dataStore, socketEmitter(socket), msg) });
}

const socketEmitter = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
) => {
    return (endpoint: wsfeendpoint, message: any) => socket.emit(endpoint, message);
}



export { wsSetup, dataStore };