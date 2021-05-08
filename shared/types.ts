import { DataStore } from "../poker-be/src/dataStore";


export type wsendpoint =
    'open-wallet' |
    'create-game' |
    'player-join' |
    'game-created-id' | 
    'player-joined';

// TODO: separate be/fe endpoints
// export type wsfeendpoint =
//     'open-wallet' |
//     'create-game' |
//     'player-join' |
//     'game-created-id';

// export type wsbeendpoint =
//     'open-wallet' |
//     'create-game' |
//     'player-join' |
//     'game-created-id';


export interface iServerWsCb {
    (
        dataStore: DataStore,
        socketEmitter: (endpoint: wsendpoint, message: any) => void,
        message: any
    ): void
}
