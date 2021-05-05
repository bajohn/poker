import { DataStore } from "../dataStore";
import { iServerWsCb, wsendpoint } from "../../../shared/types";

const createGameHandler: iServerWsCb =
    (
        dataStore: DataStore,
        socketEmitter: (endpoint: wsendpoint, message: any) => void,
        message: string
    ) => {
        const gameId = dataStore.createGame();
        socketEmitter('game-created-id', gameId);
        console.log(dataStore);
    }

export {
    createGameHandler
};