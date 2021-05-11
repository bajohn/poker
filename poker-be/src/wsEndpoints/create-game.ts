import { iServerWsCb } from "../../../shared/types";

const createGameHandler: iServerWsCb =
    (
        dataStore,
        socketEmitter,
        message
    ) => {
        const gameId = dataStore.createGame();
        socketEmitter('game-created-id', { gameId });
        console.log(dataStore);
    }

export {
    createGameHandler
};