import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { DataStore } from "./dataStore";
import { wsendpoint } from "../../shared/types"
import { walletOpenHandler } from "./wsEndpoints/open-wallet";
import { createGameHandler } from "./wsEndpoints/create-game";
import { playerJoinHandler } from "./wsEndpoints/player-join";

const dataStore = new DataStore();

const wsSetup = (io: Server) => {
    io.on("connection", (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {

        // TODO how to make these callbacks more uniform?
        // Datastore and socketEmitter should be available to everybody 
        socketOn(socket, "open-wallet", walletOpenHandler);
        socketOn(socket, 'create-game', createGameHandler);
        socketOn(socket, 'player-join', playerJoinHandler);
    });
}

const socketOn = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    endpoint: wsendpoint,
    callback: (
        dataStore: DataStore,
        socketEmitter: (endpoint: wsendpoint, message: any) => void,
        message: any
    ) => void //(...args: any[]) => void // TODO can probably nail this type down more precisely
) => {
    socket.on(endpoint, (msg: any) => { callback(dataStore, socketEmitter(socket), msg) });
}

const socketEmitter = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
) => {
    return (endpoint: wsendpoint, message: any) => socket.emit(endpoint, message);
}



export { wsSetup };