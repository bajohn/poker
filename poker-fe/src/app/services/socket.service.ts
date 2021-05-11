import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { wsfeendpoint, wsbeendpoint } from "../../../../shared/types";
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  constructor() {
    const url = 'localhost:8080';
    this.socket = io(url, {
      transports: ["websocket"],
    });
  }

  public emit(endpoint: wsbeendpoint, message?: any) {
    this.socket.emit(endpoint, message);
  }

  public on(endpoint: wsfeendpoint,
    callback: (...args: any[]) => void // TODO can probably nail this type down more precisely )
  ) {
    this.socket.on(endpoint, callback);
  }
}
