import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { DataStore } from "./dataStore";
import { wsendpoint } from "../../shared/types"
import { walletOpenHandler } from "./wsEndpoints/open-wallet";
import { createGameHandler } from "./wsEndpoints/create-contract";

const wsSetup = (io: Server) => {
    const dataStore = new DataStore();
    io.on("connection", (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {

        socketOn(socket, "open-wallet", walletOpenHandler);
        socketOn(socket, 'create-game', () => createGameHandler(dataStore))

    });
}

const socketOn = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    endpoint: wsendpoint,
    callback: (...args: any[]) => void // TODO can probably nail this type down more precisely
) => {
    socket.on(endpoint, callback);

}



export { wsSetup };