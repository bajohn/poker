import { iServerWsCb, wsendpoint } from "../../../shared/types";
import { DataStore } from "../dataStore";


const playerJoinHandler: iServerWsCb =
    (
        dataStore: DataStore,
        socketEmitter: (endpoint: wsendpoint, message: any) => void,
        message: string
    ) => {
        console.log(message);
    }

export {
    playerJoinHandler
};

