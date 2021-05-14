import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { DataStore } from "../dataStore";
import { wsbeendpoint, wsfeendpoint } from "../../../shared/types";


export type iServerSocketOn = (socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    endpoint: wsbeendpoint,
    callback: (
        dataStore: DataStore,
        socketEmitter: (endpoint: wsfeendpoint, message: any) => void,
        message: any
    ) => void) => void