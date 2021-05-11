import { iServerWsCb } from "../../../shared/types";


const playerJoinHandler: iServerWsCb =
    (
        dataStore,
        socketEmitter,
        message
    ) => {
        const didJoin = dataStore.joinGame(message.playerAddress, message.gameId)
        socketEmitter('player-joined', {
            success: true,
            playerAddress: message.playerAddress,
            didJoin
        });
    }

export {
    playerJoinHandler
};

