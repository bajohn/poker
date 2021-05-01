import { Contract } from "./mockContract/contract"
import { Dealer } from "./mockContract/dealer";



export class Game {
    private dealer = new Dealer();
    private contract = new Contract(this.dealer);
    //private dealers: Dealer[];
    //private players: Player[]
    // private io: Server;
    constructor() {
        console.log(this.contract);
    }

}