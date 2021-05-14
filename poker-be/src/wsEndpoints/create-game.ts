import { iServerWsCb } from "../types/betypes";

const createGameHandler: iServerWsCb =
    (
        dataStore,
        socketEmitter,
        message
    ) => {
        const gameId = dataStore.createGame(socketEmitter);

        socketEmitter('game-created-id', { gameId });
    }

export {
    createGameHandler
};