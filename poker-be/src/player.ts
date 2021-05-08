import { v4 as uuidv4 } from 'uuid';

export class Player {
    private address: string; //= uuidv4();
    constructor(address: string) {
        this.address = address;
    }

    public getAddress() {
        return this.address;
    }
}