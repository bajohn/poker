import { Component, OnInit } from '@angular/core';
import { io } from "socket.io-client";
@Component({
  selector: 'app-upload-wallet',
  templateUrl: './upload-wallet.component.html',
  styleUrls: ['./upload-wallet.component.css']
})
// Drag and drop wallet json file for authentication

export class UploadWalletComponent implements OnInit {
  private rdr = new FileReader();

  constructor() {
    const url = 'localhost:8080';
    const socket = io(url, {
      transports: ["websocket"],
    });

    this.rdr.onloadend = () => {
      const fileText = this.rdr['result'].toString();
      console.log(fileText);
      socket.emit('open-wallet', fileText);
    }
  }

  ngOnInit(): void {
  }
  public onFileChange(event: Event) {
    const file = event.target['files'][0];
    this.rdr.readAsText(file);
  }

}
