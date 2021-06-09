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
  blankPlayerIter = []; // blank array used to count players. Dumb, but easiest way to do this

  public playersInGame = [];

  constructor(
    private socketServ: SocketService
  ) {
    socketServ.on('game-created-id', resp => {
      this.gameId = resp.gameId;
      console.log('game id!', this.gameId);
    });
    socketServ.on('update-game-state', resp => {
      this.gameState = resp.gameState;
    });
    socketServ.on('player-joined', resp => {
      console.log('joined!!', resp);
      this.playersInGame.push(
        resp.playerAddress);
    });

  }

  createGameClick() {
    console.log('click!!');
    this.socketServ.emit('create-game');
  }

  addPlayerClick() {
    this.blankPlayerIter.push(null);
  }

  startGameClick() {
    this.socketServ.emit('start-game', { gameId: this.gameId });
  }

  canStartGame() {
    return (this.gameState === 'pregame') && (this.playersInGame.length > 0);
  }

}
