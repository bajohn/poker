import { Contract } from "./mockContract/contract"
import { Dealer } from "./mockContract/dealer";
import { v4 as uuidv4 } from 'uuid';
import { Player } from "./player";
import { GameState, iBetMessage, iCard, Suit } from "../../shared/sharedtypes";
import { randomInt } from 'crypto';
import { iTestParams, SocketEmitter } from "./types/betypes";
import { TestData } from "./testdata";

export class Game {
    private dealer = new Dealer();
    private contract = new Contract(this.dealer);
    private players: Player[] = [];
    private gameSocketEmitter: SocketEmitter;

    private gameId = uuidv4();
    private cardDeck: iCard[];
    private tableCards: iCard[];

    // Game state stuff
    private gameState: GameState = 'pregame';
    // private activePlayer: Player = null;
    private activeBet = 0;
    private potSize = 0;
    private smallBlind = 10;
    private dealerChip: Player = null;

    private raiser: Player = null;

    // For testing only
    private testParams: iTestParams = null;

    constructor(socketEmitter: SocketEmitter) {
        this.cardDeck = this.generateCards();
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
            console.log('emit', playerAddress);
            this.gameSocketEmitter('player-joined', {
                playerAddress: playerAddress
            });
        }
    }

    playerBet(playerAddress: string, betMessage: iBetMessage, socketEmitter: SocketEmitter) {

        const player = this.getPlayer(playerAddress);
        const isFolded = betMessage.fold;
        player.setFolded(isFolded)
        if (isFolded) {
            // will probably need this - broadcast fold
            // this.gameSocketEmitter('player-folded', {
            //     playerAddress: playerAddress
            // });
        }
        else {
            // TODO validate
            const newOutstandingBet = betMessage.newBetAmount + player.getOutstandingBet();
            if (newOutstandingBet > this.activeBet) {
                this.activeBet = newOutstandingBet;
                this.raiser = player;
            }

            player.setOutstandingBet(newOutstandingBet);
        }
        this.nextBet(player)
    }

    private nextBet(curPlayer: Player) {
        const nextPlayer = this.nextPlayer(curPlayer);

        const nextPlayerOutstanding = nextPlayer.getOutstandingBet();
        const diff = this.activeBet - nextPlayerOutstanding;
        console.log('raiser', this.raiser.getAddress());
        // special case: give the big blind an opportunity to raise if no one has yet
        if(this.gameState === 'preflop' && nextPlayer === this.bigBlindPlayer() && this.activeBet === this.smallBlind * 2) {

            this.raiser = this.nextPlayer(nextPlayer);
            nextPlayer.requestBet(diff);
        }
        else 
        if (
            nextPlayer === this.raiser
        ) {

            this.advanceGameStage();
        }
        else {
            nextPlayer.requestBet(diff);
        }
    }

    private bigBlindPlayer() {
        return this.nextPlayer(this.nextPlayer(this.dealerChip));
    }

    advanceGameStage() {


        if (this.gameState === 'preflop') {
            this.gameState = 'flop';
            this.dealTableCard();
            this.dealTableCard();
            this.dealTableCard();

        } else if (this.gameState === 'flop') {
            this.dealTableCard();
            this.gameState = 'turn';
        } else if (this.gameState === 'turn') {
            this.dealTableCard();
            this.gameState = 'river';
        }
        else if (this.gameState === 'river') {
            this.gameState = 'showdown';
        }
        if (this.gameState !== 'showdown') {
            this.raiser = this.nextPlayer(this.dealerChip);
            this.raiser.requestBet(0);
        }
        // step game forward
        console.log('step game up', this.gameState);
        this.gameSocketEmitter('update-game-state', {
            gameState: this.gameState
        });
    }


    private nextPlayer(player: Player) {
        return this.adjacentPlayer(player, 1);
    }

    private prevPlayer(player: Player) {
        return this.adjacentPlayer(player, -1);
    }

    private adjacentPlayer(player: Player, incr: 1 | -1) {
        const curIdx = this.players.indexOf(player);
        for (let retIdx = (curIdx + incr) % this.players.length;
            retIdx !== curIdx;
            retIdx = (retIdx + incr) % this.players.length) {
            const nextPlayer = this.players[retIdx];
            if (!nextPlayer.isFolded()) {
                return nextPlayer
            }
        }
        return this.players[curIdx];
    }



    startGame() {
        this.tableCards = [];
        this.shuffleCards();
        this.dealPocketCards();
        this.gameState = 'preflop';
        this.gameSocketEmitter('update-game-state', {
            gameState: this.gameState
        });

        const firstIdx = this.testParams ? this.testParams.firstPlayerIdx : randomInt(this.players.length);
        const dealer = this.players[firstIdx];
        this.dealerChip = dealer;

        const smallBlindPlayer = this.nextPlayer(dealer);
        this.setBlind(smallBlindPlayer, this.smallBlind);

        const bigBlindPlayer = this.nextPlayer(smallBlindPlayer);
        this.setBlind(bigBlindPlayer, 2 * this.smallBlind);
        this.raiser = bigBlindPlayer;

        let curPlayer = this.nextPlayer(bigBlindPlayer);
        while (curPlayer !== smallBlindPlayer) {
            this.setBlind(curPlayer, 0);
            curPlayer = this.nextPlayer(curPlayer);

        }
        this.activeBet = this.smallBlind * 2;
        this.nextBet(bigBlindPlayer);
    }

    private setBlind(player: Player, blindAmount: number) {
        player.setOutstandingBet(blindAmount);
    }

    dealPocketCards() {
        for (let player of this.players) {
            const cards = this.cardDeck.splice(0, 2);
            player.dealPocketCards(cards);
        }
    }

    dealTableCard() {
        const card = this.cardDeck.shift();
        this.tableCards.push(card);
        this.players.forEach(player => player.dealTableCard(card))
    }


    setPresetHands(testId: string) {
        const testData = new TestData();
        this.testParams = testData.getTest(testId);
    }


    private shuffleCards() {

        if (this.testParams) {
            this.cardDeck = this.testParams.hands.pop();
        } else {
            const localCards: iCard[] = [].concat(this.cardDeck);
            const resp = [];

            while (localCards.length > 0) {
                const nextIdx = randomInt(localCards.length);
                const nextCard = localCards.splice(nextIdx, 1)[0];
                resp.push(nextCard);
            }
            this.cardDeck = resp;
        }

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