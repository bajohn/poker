import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

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
  
  public emit(endpoint: string, message?: any) {
    this.socket.emit(endpoint, message);
  }
}
