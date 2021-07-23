import { iCard } from "../../shared/sharedtypes";
import { SocketEmitter } from "./types/betypes";

export class TestData {

    constructor() {

    }

    getHands(testId: string) {
        const lookup: { [key: string]: iCard[][] } = {
            test1: [
                [
                    {
                        suit: 'C',
                        value: 1
                    },
                    {
                        suit: 'C',
                        value: 2
                    },
                    {
                        suit: 'C',
                        value: 3
                    },
                    {
                        suit: 'C',
                        value: 4
                    },
                    {
                        suit: 'D',
                        value: 1
                    },
                    {
                        suit: 'D',
                        value: 2
                    },
                    {
                        suit: 'D',
                        value: 3
                    },
                    {
                        suit: 'D',
                        value: 4
                    },
                    {
                        suit: 'S',
                        value: 1
                    },
                    {
                        suit: 'S',
                        value: 2
                    },
                    {
                        suit: 'S',
                        value: 3
                    },
                    {
                        suit: 'S',
                        value: 4
                    },

                ]
            ]
        };
        if (testId in lookup) {
            return lookup[testId];
        }
        throw Error('Unknown test hand name');
    }
}