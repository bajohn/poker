import { iServerWsCb } from "../types/betypes";

const createGameHandler: iServerWsCb =
    (
        dataStore,
        socketEmitter,
        message
    ) => {
        const gameId = dataStore.createGame(socketEmitter);
        console.log('create game')
        socketEmitter('game-created-id', { gameId });
    }

export {
    createGameHandler
};