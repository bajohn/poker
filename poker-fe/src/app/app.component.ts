import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private socketServ: SocketService
  ) {

  }

  clickCb() {
    this.socketServ.emit('create-contract');
  }


}
