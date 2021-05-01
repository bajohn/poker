
import { Game } from "./game";



export class DataStore {

    private games: Game[] = [];
    constructor() {
    }



    createGame() {
        this.games.push(new Game());
    }

}