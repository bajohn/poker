import { Component, OnInit } from '@angular/core';
import { io } from "socket.io-client";
import { SocketService } from 'src/app/services/socket.service';
@Component({
  selector: 'app-upload-wallet',
  templateUrl: './upload-wallet.component.html',
  styleUrls: ['./upload-wallet.component.css']
})
// Drag and drop wallet json file for authentication

export class UploadWalletComponent implements OnInit {
  private rdr = new FileReader();

  constructor(
    private socketServ: SocketService
  ) {
    this.rdr.onloadend = () => {
      const fileText = this.rdr['result'].toString();
      console.log(fileText);
      this.socketServ.emit('open-wallet', fileText);
    }
  }

  ngOnInit(): void {
  }
  public onFileChange(event: Event) {
    const file = event.target['files'][0];
    this.rdr.readAsText(file);
  }

}
