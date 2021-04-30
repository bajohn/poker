import { v4 as uuidv4 } from 'uuid';

export class Player {
    private address = uuidv4();
    constructor() {
        
    }

    public getAddress() {
        return this.address;
    }
}