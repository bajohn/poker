import { Server } from "socket.io";
import { Game } from "./game";
import { Contract } from "./mockContract/contract";
import { Dealer } from "./mockContract/dealer";
import { Player } from "./mockContract/player";


export class DataStore {

    private games: Game[];
    private io: Server;
    constructor(io: any) {
        this.io = io;
    }

    createContract() {
        this.games.push(new Game());
    }

}