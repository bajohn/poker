
import { Game } from "./game";



export class DataStore {

    private games: Game[] = [];
    constructor() {
    }



    createGame() {
        const newGame = new Game();

        this.games.push(newGame);
        return newGame.getGameId();
    }

}