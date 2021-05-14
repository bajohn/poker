import { Component } from '@angular/core';
import { GameState } from '../../../shared/sharedtypes';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public gameId = null;
  public gameState: GameState = 'pregame';
  playerIter = []; // blank array used to count players. Dumb, but easiest way to do this
  constructor(
    private socketServ: SocketService
  ) {
    socketServ.on('game-created-id', resp => {
      this.gameId = resp.gameId;
    });
    socketServ.on('update-game-state', resp => {
      this.gameState = resp.gameState;
    });

  }

  createGameClick() {
    this.socketServ.emit('create-game');
  }

  addPlayerClick() {
    this.playerIter.push(null);
  }

  startGameClick() {
    this.socketServ.emit('start-game', { gameId: this.gameId });
  }

  gameStarted() {
    return this.gameState !== 'pregame';
  }

}
