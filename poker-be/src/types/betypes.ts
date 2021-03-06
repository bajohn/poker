import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { DataStore } from "../dataStore";
import { iCard, wsbeendpoint, wsfeendpoint } from "../../../shared/sharedtypes";


export type iServerSocketOn = (socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    endpoint: wsbeendpoint,
    callback: iServerWsCb) => void

export interface iServerWsCb {
    (
        dataStore: DataStore,
        socketEmitter: SocketEmitter,
        message: any
    ): void
};

export interface iTestParams {
    hands: iCard[][]
    firstPlayerIdx: number
}

export type SocketEmitter = (endpoint: wsfeendpoint, message: any) => void;