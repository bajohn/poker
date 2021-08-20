import { iCard } from "../../../shared/sharedtypes";
import { card } from "../../src/utils/card";

export const testHands: {
    [key: string]: {
        hand: iCard[]
        expectedValue: number
    }
} = {
    straightFlush: {
        hand: [card('C', 2), card('C', 3), card('C', 4), card('C', 5), card('C', 6)],
        expectedValue: 6e28
    },
    smallHouse: {
        hand: [card('C', 2), card('D', 2), card('S', 2), card('S', 3), card('D', 3)],
        expectedValue: 2e24 + 3e22,
    },
    bigHouse: {
        hand: [card('C', 2), card('D', 2), card('H', 3), card('S', 3), card('D', 3)],
        expectedValue: 3e24 + 2e22
    },
    bigHouse_2: {
        hand: [card('C', 5), card('D', 3), card('H', 5), card('S', 3), card('D', 3)],
        expectedValue: 3e24 + 5e22
    },
    fourOfKind: {
        hand: [card('C', 2), card('D', 2), card('S', 2), card('H', 2), card('D', 3)],
        expectedValue: 2e26 + 4
    },
    threeOfKind: {
        hand: [card('C', 2), card('D', 2), card('S', 2), card('H', 3), card('D', 4)],
        expectedValue: 2e16 + 4e2 + 3
    },
    twoPair: {
        hand: [card('C', 2), card('D', 2), card('S', 3), card('H', 3), card('D', 4)],
        expectedValue: 3e14 + 2e12 + 4
    },

    twoPair_2: {
        hand: [card('D', 4), card('H', 2), card('C', 3), card('D', 4), card('S', 2)],
        expectedValue: 4e14 + 2e12 + 3
    },
    pair: {
        hand: [card('C', 2), card('D', 2), card('S', 3), card('H', 4), card('D', 5)],
        expectedValue: 2e10 + 5e4 + 4e2 + 3
    },
    noMatches: {
        hand: [card('C', 2), card('D', 3), card('S', 4), card('H', 5), card('D', 7)],
        expectedValue: 7e8 + 5e6 + 4e4 + 3e2 + 2
    }
};

