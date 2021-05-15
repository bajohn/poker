import { iServerWsCb } from "../types/betypes";


const playerBetMessageHandler: iServerWsCb =
    (
        dataStore,
        socketEmitter,
        message
    ) => {
        dataStore.playerBetResponse(
            message.playerAddress, 
            message.gameId, 
            message.betMessage,
            socketEmitter)
    }

export {
    playerBetMessageHandler
};

