import { wsbeendpoint, wsfeendpoint } from "../../../../shared/sharedtypes";


export interface iConnection {
    emit: (endpoint: wsbeendpoint, message?: any) => void,
    on: (endpoint: wsfeendpoint, callback: (...args: any[]) => void) => void
}