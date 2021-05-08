import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { v4 as uuidv4 } from 'uuid';
// Generate demo player for testing
@Component({
  selector: 'app-player-gen',
  templateUrl: './player-gen.component.html',
  styleUrls: ['./player-gen.component.css']
})
export class PlayerGenComponent implements OnInit {
  private address = uuidv4();

  private offsetX: 0;
  private offsetY: 0;

  @Input() gameId: string;

  constructor(
    private socketServ: SocketService
  ) { }

  ngOnInit(): void {
    this.socketServ.on('player-joined', (msg) => {
      console.log('player joined!', msg);
    });
  }

  join() {
    this.socketServ.emit('player-join', {
      playerAddress: this.address,
      gameId: this.gameId
    });
  }

  getAddress() {
    return this.address;
  }

}
