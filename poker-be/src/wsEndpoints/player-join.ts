import { iServerWsCb } from "../types/betypes";


const playerJoinHandler: iServerWsCb =
    (
        dataStore,
        socketEmitter,
        message
    ) => {
        dataStore.joinGame(message.playerAddress, message.gameId, socketEmitter)
    }

export {
    playerJoinHandler
};

