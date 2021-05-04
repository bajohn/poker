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

  createGameCb() {
    this.socketServ.emit('create-game');
    this.socketServ.on('game-created-id', (msg) => {
      console.log('Game created, msg', msg)
    })
  }


}
