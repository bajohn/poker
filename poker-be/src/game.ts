import { Contract } from "./mockContract/contract"
import { Dealer } from "./mockContract/dealer";
import { v4 as uuidv4 } from 'uuid';
import { Player } from "./player";
import { iCard, Suit } from "../../shared/sharedtypes";
import { randomInt } from 'crypto';
import { socketEmitter } from "./types/betypes";

export class Game {
    private dealer = new Dealer();
    private contract = new Contract(this.dealer);
    private players: Player[] = [];


    private gameId = uuidv4();
    cards: iCard[];

    private dealtCards: {
        [key: string]: iCard[]
    }

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
    joinGame(playerAddress: string, socketEmitter: socketEmitter) {
        const newPlayer = new Player(playerAddress, socketEmitter);
        const playerAddrs = this.players.map(el => el.getAddress());
        let didJoin;
        if (playerAddrs.includes(playerAddress)) {
            didJoin = false;
        } else {
            this.players.push(newPlayer);
            didJoin = true;
        }
        socketEmitter('player-joined', {
            success: true,
            playerAddress: playerAddress,
            didJoin
        });

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