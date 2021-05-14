
import { Game } from "./game";
import { socketEmitter } from "./types/betypes";



export class DataStore {

    private games: Game[] = [];
    constructor() {
    }


    // Create a new game
    // return gameId
    createGame() {
        const newGame = new Game();

        this.games.push(newGame);
        return newGame.getGameId();
    }

    joinGame(playerAddress: string, gameId: string, socketEmitter: socketEmitter) {
        const game = this.getGame(gameId);
        return game.joinGame(playerAddress, socketEmitter);

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