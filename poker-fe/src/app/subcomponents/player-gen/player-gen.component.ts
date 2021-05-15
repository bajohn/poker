import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { iConnection } from 'src/app/types/fetypes';
import { v4 as uuidv4 } from 'uuid';
import { iCard } from '../../../../../shared/sharedtypes';
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

}
