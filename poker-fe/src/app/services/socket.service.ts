import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { wsfeendpoint, wsbeendpoint } from "../../../../shared/types";
import { v4 as uuidv4 } from 'uuid';

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

  public createConnection() {
    const socket = io(this.URL, {
      transports: ["websocket"],
    });

    return {
      id: uuidv4(),
      emit: (endpoint: wsbeendpoint, message?: any) => {
        socket.emit(endpoint, message);
      },
      on: (endpoint: wsfeendpoint,
        callback: (...args: any[]) => void
      ) => {
        this.socket.on(endpoint, callback);
      }
    }

  }
}
