import { Component, OnInit } from '@angular/core';
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
  constructor(
    private socketServ: SocketService
  ) { }

  ngOnInit(): void {
    // this.socketServ.on('create-game-id', (msg)=>{

    // })
  }

  join() {
    this.socketServ.emit('player-join', this.address);
  }

  getAddress () {
    return this.address;
  }

}
