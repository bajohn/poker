import { DataStore } from "../poker-be/src/dataStore";


// Front end listener endpoints
export type wsfeendpoint =
    'game-created-id' |
    'player-joined';

// Back end listener endpoints
export type wsbeendpoint =
    'open-wallet' |
    'create-game' |
    'player-join'


export interface iServerWsCb {
    (
        dataStore: DataStore,
        socketEmitter: (endpoint: wsfeendpoint, message: any) => void,
        message: any
    ): void
}
