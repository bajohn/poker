import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public gameId = null;
  playerIter = []; // blank array used to count players. Dumb, but easiest way to do this
  constructor(
    private socketServ: SocketService
  ) {
    socketServ.on('game-created-id', resp => {
      this.gameId = resp.gameId;
    });

  }

  createGameClick() {
    this.socketServ.emit('create-game');
  }

  addPlayerClick() {
    this.playerIter.push(null);
  }



}
