import { iServerWsCb, wsendpoint } from "../../../shared/types";
import { DataStore } from "../dataStore";


const playerJoinHandler: iServerWsCb =
    (
        dataStore: DataStore,
        socketEmitter: (endpoint: wsendpoint, message: any) => void,
        message: any
    ) => {
        const didJoin = dataStore.joinGame(message.playerAddress, message.gameId)
        console.log(dataStore);
        socketEmitter('player-joined', {
            success: true,
            playerAddress: message.playerAddress,
            didJoin
        });
    }

export {
    playerJoinHandler
};

