import { iServerWsCb } from "../types/betypes";


const startGameHandler: iServerWsCb =
    (
        dataStore,
        socketEmitter,
        message
    ) => {
        dataStore.startGame(message.gameId, socketEmitter)
    }

export {
    startGameHandler
};

