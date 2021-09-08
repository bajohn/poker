import e from 'express';
import { v4 as uuidv4 } from 'uuid';
import { iBetMessage, iCard, wsfeendpoint } from '../../shared/sharedtypes';
import { SocketEmitter } from './types/betypes';
import { combineCards } from './utils/hand';
import { valuateHand } from './utils/valuators/handValuator';

export class Player {
    private address: string; //= uuidv4();
    private socketEmitter: SocketEmitter;
    private pocketCards: iCard[];
    private bestHandValue = 0;
    private bestHand: iCard[] = [];

    private stack = 0;

    //private betNeeded = false;
    private outstandingBet = 0;
    private folded = false;

    constructor(
        address: string,
        socketEmitter: SocketEmitter,
        stack: number
    ) {
        this.address = address;
        this.socketEmitter = socketEmitter;
        this.stack = stack;

    }

    public getAddress() {
        return this.address;
    }

    public dealPocketCards(cards: iCard[]) {
        this.pocketCards = cards;
        this.socketEmitter('deal-pocket-cards', cards);
    }

    public dealTableCard(card: iCard) {
        this.socketEmitter('deal-table-card', card);
    }

    public requestBet(curBet: number) {
        this.socketEmitter('request-bet', { curBet });
    }



    public newBet(newBetAmount: number) {
        if (newBetAmount > this.stack) {
            // this shouldn't happen - throw some error
        } else {
            this.stack -= newBetAmount;
            this.outstandingBet += newBetAmount;
        }
        const betMsg = {
            outstandingBet: this.outstandingBet,
            stack: this.stack
        };
        this.socketEmitter('set-outstanding-bet', betMsg);
        return this.outstandingBet;
    }

    public setOutstandingBet(newOutstandingBet: number) {
        this.outstandingBet = newOutstandingBet;
        this.stack = newOutstandingBet
        const betMsg = {
            outstandingBet: newOutstandingBet,
            stack: this.stack
        };
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

    public calcBestHand(tableCards: iCard[]) {
        const allCards = tableCards.concat(this.pocketCards);
        const allCombines = combineCards(allCards, 5);
        for (const possibleHand of allCombines) {
            const possibleVal = valuateHand(possibleHand);
            if (possibleVal > this.bestHandValue) {
                this.bestHandValue = possibleVal;
                this.bestHand = possibleHand;
            }
        }
        console.log('Best hand', this.address, this.bestHand, this.bestHandValue);
        return this.bestHandValue;
    }




}