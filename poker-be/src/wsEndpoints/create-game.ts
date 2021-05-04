import { DataStore } from "../dataStore";
import { Server, Socket } from "socket.io";
import { wsendpoint } from "../../../shared/types";

const createGameHandler = (dataStore: DataStore, socketEmitter: (endpoint: wsendpoint, message: any) => void) => {
    const gameId = dataStore.createGame();
    socketEmitter('game-created-id', gameId);
    console.log(dataStore);
}

export {
    createGameHandler
};