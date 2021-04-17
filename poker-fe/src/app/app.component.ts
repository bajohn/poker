import { Component } from '@angular/core';
import { io } from "socket.io-client";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'poker-fe';
  constructor() {


    const url = 'localhost:8080';

    const socket = io(url, {
      transports: ["websocket"],
    });
  }
}
