import { iCard } from "../../shared/sharedtypes";
import { iTestParams, SocketEmitter } from "./types/betypes";

export class TestData {

    constructor() {

    }

    // TODO typing here
    getTest(testId: string): iTestParams {
        const lookup: { [key: string]: iTestParams } = {
            basichand: {
                firstPlayerIdx: 0,
                hands: [
                    [
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
                            suit: 'C',
                            value: 5
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
                            suit: 'D',
                            value: 5
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
                        {
                            suit: 'S',
                            value: 5
                        },

                    ]
                ]
            }

        };
        if (testId in lookup) {
            return lookup[testId];
        }
        throw Error('Unknown test hand name');
    }
}