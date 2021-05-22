import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { iConnection } from 'src/app/types/fetypes';
import { v4 as uuidv4 } from 'uuid';
import { iCard, iBetMessage } from '../../../../../shared/sharedtypes';
// Generate demo player for testing
@Component({
  selector: 'app-player-gen',
  templateUrl: './player-gen.component.html',
  styleUrls: ['./player-gen.component.css']
})
export class PlayerGenComponent implements OnInit {
  private address = uuidv4();
  cards: iCard[] = []
  alreadyJoined = false;

  needsBet = false;
  outstandingBet = 0;
  betInput = 0;


  @Input() gameId: string;
  connection: iConnection
  constructor(
    private socketServ: SocketService
  ) { }

  ngOnInit(): void {
    this.connection = this.socketServ.createPlayerConn();
    this.connection.on('player-joined', (msg) => {
      this.alreadyJoined = true;
    });
    this.connection.on('deal-pocket-cards', (cards: iCard[]) => {
      console.log(cards);
      this.cards = cards;
    });
    this.connection.on('request-bet', (msg) => {
      this.betInput = msg.curBet;
      this.needsBet = true;
    });
  }

  join() {
    this.connection.emit('player-join', {
      playerAddress: this.address,
      gameId: this.gameId
    });
  }

  getAddress() {
    return this.address;
  }

  makeBetClick() {
    const betMessage: iBetMessage = {
      newBetAmount: this.betInput
    };
    this.outstandingBet = this.outstandingBet + this.betInput;

    this.connection.emit('player-bet-message', {
      playerAddress: this.address,
      gameId: this.gameId,
      betMessage: betMessage
    });
    this.needsBet = false;
  }

  foldClick() {
    //TODO fold message
    
  }

}
