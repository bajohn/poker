import { Component } from '@angular/core';
import { io } from "socket.io-client";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rdr = new FileReader();
  constructor() {


    const url = 'localhost:8080';

    const socket = io(url, {
      transports: ["websocket"],
    });

    this.rdr.onloadend = () => {
      const fileText = this.rdr['result'].toString();
      console.log(fileText);
    }
  }

  public onFileChange(event: Event) {
    const file = event.target['files'][0];
    this.rdr.readAsText(file);
  }
}
