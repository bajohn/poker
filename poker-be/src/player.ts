import { v4 as uuidv4 } from 'uuid';
import { iBetMessage, iCard, wsfeendpoint } from '../../shared/sharedtypes';
import { SocketEmitter } from './types/betypes';

export class Player {
    private address: string; //= uuidv4();
    private socketEmitter: SocketEmitter;
    private hand: iCard[];
    //private betNeeded = false;
    private outstandingBet = 0;
    private folded = false;

    constructor(
        address: string,
        socketEmitter: SocketEmitter
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

    //
    public setOutstandingBet(newOutstandingBet: number) {
        this.outstandingBet = newOutstandingBet;
        const betMsg = { outstandingBet: newOutstandingBet };
        this.socketEmitter('set-outstanding-bet', betMsg);
    }

    public getOutstandingBet() {
        return this.outstandingBet;
    }

    public isFolded() {
        return this.folded;
    }

    public setFolded(isFolded: boolean) {
        this.folded = isFolded
    }


}