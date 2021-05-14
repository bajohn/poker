import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { wsfeendpoint, wsbeendpoint } from "../../../../shared/sharedtypes";
import { v4 as uuidv4 } from 'uuid';
import { iConnection } from '../types/fetypes';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  private readonly URL = 'localhost:8080';
  constructor() {
    this.socket = io(this.URL, {
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

  public createPlayerConn(): iConnection {
    const socket = io(this.URL, {
      transports: ["websocket"],
    });

    return {
      emit: (endpoint, message) => {
        socket.emit(endpoint, message);
      },
      on: (endpoint, callback) => {
        socket.on(endpoint, callback);
      }
    }

  }
}
