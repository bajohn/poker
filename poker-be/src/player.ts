import { v4 as uuidv4 } from 'uuid';
import { iCard, wsfeendpoint } from '../../shared/sharedtypes';
import { socketEmitter } from './types/betypes';

export class Player {
    private address: string; //= uuidv4();
    private socketEmitter: socketEmitter;
    private hand: iCard[];
    constructor(
        address: string,
        socketEmitter: socketEmitter
    ) {
        this.address = address;
        this.socketEmitter = socketEmitter;

    }

    public getAddress() {
        return this.address;
    }

    public dealCards(cards: iCard[]) {
        this.hand = cards;
        this.socketEmitter('deal-pocket-cards', cards);
    }

    public requestBet(curBet: number) {
        this.socketEmitter('request-bet', { curBet });
    }


}