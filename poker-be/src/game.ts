import { Contract } from "./mockContract/contract"
import { Dealer } from "./mockContract/dealer";
import { v4 as uuidv4 } from 'uuid';
import { Player } from "./player";
import { iCard, Suit } from "../../shared/types";
import { randomInt } from 'crypto';

export class Game {
    private dealer = new Dealer();
    private contract = new Contract(this.dealer);
    private players: Player[] = [];


    private gameId = uuidv4();
    cards: iCard[];

    constructor() {
        this.cards = this.generateCards();
    }

    getGameId() {
        return this.gameId;
    }

    // Have a player with address playerAddress
    // join the game. 
    // Returns true if joined,
    // false if already in the game
    joinGame(playerAddress: string) {
        const newPlayer = new Player(playerAddress);
        const playerAddrs = this.players.map(el => el.getAddress());
        if (playerAddrs.includes(playerAddress)) {
            return false;
        } else {
            this.players.push(newPlayer);
            return true;
        }
    }

    startGame() {
        const config = {
            blinds: 10,
        }
        this.shuffleCards();
        this.dealCards();
    }

    dealCards() {

    }

    private shuffleCards() {
        const localCards: iCard[] = [].concat(this.cards);
        const resp = [];

        while (localCards.length > 0) {
            const nextIdx = randomInt(localCards.length);
            const nextCard = localCards.splice(nextIdx, 1)[0];
            resp.push(nextCard);
        }
        this.cards = resp;
    }

    private getPlayer(playerAddress: string) {
        const players = this.players.filter((player) => {
            return playerAddress === player.getAddress();
        });
        if (players.length === 1) {
            return players[0];
        } else if (players.length === 0) {
            throw Error(`Game not found, playerAddress: ${playerAddress}`);
        } else {
            throw Error(`Duplicate playerAddress: ${playerAddress}`);
        }
    }

    private generateCards() {
        const ret: iCard[] = [];
        const suits: Suit[] = ['C', 'D', 'S', 'H'];
        for (let suit of suits) {
            for (let value = 2; value <= 14; value++) {
                ret.push({
                    suit,
                    value
                })
            }
        }
        return ret;
    }



}