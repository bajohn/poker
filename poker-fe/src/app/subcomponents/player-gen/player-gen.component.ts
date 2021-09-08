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
  pocketCards: iCard[] = [];
  tableCards: iCard[] = [];
  alreadyJoined = false;

  needsBet = false;
  outstandingBet = 0;
  betInput = 0;
  minBet = 0;
  errMsg = '';
  folded = false;
  stack = 0;

  @Input() gameId: string;
  @Input() playerIdx: number;
  connection: iConnection
  constructor(
    private socketServ: SocketService
  ) { }

  ngOnInit(): void {
    this.connection = this.socketServ.createPlayerConn();
    console.log('player gen init');
    this.connection.on('player-joined', (msg) => {
      this.alreadyJoined = true;
      this.stack = msg.stack;
    });

    this.connection.on('deal-pocket-cards', (cards: iCard[]) => {
      console.log(cards);
      this.pocketCards = cards;
    });

    this.connection.on('deal-table-card', (card: iCard) => {
      console.log(card);
      this.tableCards.push(card);
    });

    this.connection.on('request-bet', (msg) => {
      this.betInput = msg.curBet;
      this.minBet = msg.curBet;
      this.needsBet = true;
    });

    this.connection.on('set-outstanding-bet', (msg) => {
      this.outstandingBet = msg.outstandingBet;
      this.stack = msg.stack;
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
    console.log('bet click', this.playerIdx)
    if (this.betInput < this.minBet) {
      this.errMsg = `Error: minimum bet ${this.minBet}`;
    } else {
      this.errMsg = '';
      const betMessage: iBetMessage = {
        newBetAmount: this.betInput,
        fold: false
      };
      // this.outstandingBet = this.outstandingBet + this.betInput;

      this.connection.emit('player-bet-message', {
        playerAddress: this.address,
        gameId: this.gameId,
        betMessage: betMessage
      });
      this.needsBet = false;
    }

  }

  getId() {
    return `player-${this.playerIdx}`;
  }

  foldClick() {
    //TODO fold message
    const betMessage: iBetMessage = {
      newBetAmount: this.betInput,
      fold: true
    };

    this.connection.emit('player-bet-message', {
      playerAddress: this.address,
      gameId: this.gameId,
      betMessage: betMessage
    });
    this.needsBet = false;
    this.folded = true;
  }

  checkClick() {

  }

  canCheck() {
    return this.minBet === 0 && this.needsBet
  }


}
