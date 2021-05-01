import { DataStore } from "./../dataStore";

const createGameHandler = ( dataStore: DataStore) => {
    dataStore.createGame();
}

export {
    createGameHandler
};