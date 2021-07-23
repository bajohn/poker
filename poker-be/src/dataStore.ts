
import { iBetMessage } from "../../shared/sharedtypes";
import { Game } from "./game";
import { SocketEmitter } from "./types/betypes";
import { dataStore } from "./wsRouter";



export class DataStore {

    private games: Game[] = [];
    constructor() {
    }


    // Create a new game
    // return gameId
    createGame(socketEmitter: SocketEmitter) {
        const newGame = new Game(socketEmitter);

        this.games.push(newGame);
        return newGame.getGameId();
    }

    joinGame(playerAddress: string, gameId: string, socketEmitter: SocketEmitter) {
        const game = this.getGame(gameId);
        return game.joinGame(playerAddress, socketEmitter);
    }

    playerBetResponse(playerAddress: string, gameId: string, betMessage: iBetMessage, socketEmitter: SocketEmitter) {
        const game = this.getGame(gameId);
        return game.playerBet(playerAddress, betMessage, socketEmitter);
    }

    startGame(gameId: string) {
        const game = this.getGame(gameId);
        return game.startGame();
    }



    // dev only
    latestGameId() {
        const game = this.games[this.games.length - 1];
        return game.getGameId();
    }

    setTestId(gameId: string, testId: string) {
        const game = dataStore.getGame(gameId);
        game.setPresetHands(testId);
    }

    private getGame(gameId: string) {
        const games = this.games.filter((game) => {
            return gameId === game.getGameId();
        });
        if (games.length === 1) {
            return games[0];
        } else if (games.length === 0) {
            throw Error(`Game not found, gameId: ${gameId}`);
        } else {
            throw Error(`Duplicate gameId: ${gameId}`);
        }
    }

}