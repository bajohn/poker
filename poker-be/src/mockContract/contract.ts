import { Dealer } from "./dealer";
import { v4 as uuidv4 } from 'uuid';

export class Contract {

    private dealerAddress: string;
    private address = uuidv4();


    constructor(dealer: Dealer) {
        this.dealerAddress = dealer.getAddress(); 
    }

    

}


