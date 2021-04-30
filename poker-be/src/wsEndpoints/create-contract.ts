import { DataStore } from "./../dataStore";

const createContractHandler = ( dataStore: DataStore) => {
    console.log('Create Contract',dataStore);
    dataStore.createContract();
}

export {
    createContractHandler
};