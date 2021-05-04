import { Contract } from "./mockContract/contract"
import { Dealer } from "./mockContract/dealer";
import { v4 as uuidv4 } from 'uuid';


export class Game {
    private dealer = new Dealer();
    private contract = new Contract(this.dealer);

    private gameId = uuidv4();

    constructor() {
    }

    getGameId() {
        return this.gameId;
    }



}