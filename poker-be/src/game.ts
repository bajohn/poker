import { Contract } from "./mockContract/contract"
import { Dealer } from "./mockContract/dealer";
import { v4 as uuidv4 } from 'uuid';
import { Player } from "./player";
import { GameState, iBetMessage, iCard, Suit } from "../../shared/sharedtypes";
import { randomInt } from 'crypto';
import { SocketEmitter } from "./types/betypes";

export class Game {
    private dealer = new Dealer();
    private contract = new Contract(this.dealer);
    private players: Player[] = [];
    private gameSocketEmitter: SocketEmitter;

    private gameId = uuidv4();
    cards: iCard[];

    // Game state stuff
    private gameState: GameState = 'pregame';
    // private activePlayer: Player = null;
    private activeBet = 0;
    private potSize = 0;
    private smallBlind = 10;

    constructor(socketEmitter: SocketEmitter) {
        this.cards = this.generateCards();
        this.gameSocketEmitter = socketEmitter;
    }

    getGameId() {
        return this.gameId;
    }

    // Have a player with address playerAddress
    // join the game. 
    // Returns true if joined,
    // false if already in the game
    joinGame(playerAddress: string, socketEmitter: SocketEmitter) {
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
        if (didJoin) {
            this.gameSocketEmitter('player-joined', {
                playerAddress: playerAddress
            });
        }
    }

    playerBet(playerAddress: string, betMessage: iBetMessage, socketEmitter: SocketEmitter) {
        const playerIdx = this.players.findIndex((player) => {
            return player.getAddress() === playerAddress;
        });
        const player = this.players[playerIdx];
        if (betMessage.newBetAmount > this.activeBet) {
            // Raise: everybody needs to bet more
            // TODO: check for validity
            this.players.forEach(el => {
                el.setNeedsToBet();
            });
        }
        this.activeBet = this.activeBet + betMessage.newBetAmount;
        player.newBet(betMessage);

        const nextPlayerIdx = (playerIdx + 1) % this.players.length;
        const nextPlayer = this.players[nextPlayerIdx];
        nextPlayer.requestBet(betMessage.newBetAmount);
    }

    startGame() {

        this.shuffleCards();
        this.dealCards();
        this.gameState = 'preflop';
        this.gameSocketEmitter('update-game-state', {
            gameState: this.gameState
        });
        const firstPlayer = this.players[0]; // TODO: randomize first player
        firstPlayer.requestBet(this.smallBlind * 2);
    }

    // gameStep() {
    //     this.activePlayer.requestBet
    // }

    dealCards() {
        for (let player of this.players) {
            const cards = this.cards.splice(0, 2);
            player.dealCards(cards);
        }
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