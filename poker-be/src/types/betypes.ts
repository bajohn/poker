import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { DataStore } from "../dataStore";
import { wsbeendpoint, wsfeendpoint } from "../../../shared/sharedtypes";


export type iServerSocketOn = (socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    endpoint: wsbeendpoint,
    callback: iServerWsCb) => void

export interface iServerWsCb {
    (
        dataStore: DataStore,
        socketEmitter: socketEmitter,
        message: any
    ): void
};

export type socketEmitter = (endpoint: wsfeendpoint, message: any) => void;