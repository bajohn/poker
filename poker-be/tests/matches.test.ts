import { iCard } from '../../shared/sharedtypes';
import { valuateMatchHand } from '../src/utils/valuators/matchValuator';
import { card } from '../src/utils/card';
import { assert } from 'chai';
import { describe, it } from 'mocha';
import { testHands } from './testHelpers/testHands';

describe('Card Match Valuation Unit Test', () => {

    it('Throws an error for an incorrectly sized hand', () => {
        assert.throw(() => valuateMatchHand(hand), 'Incorrect sized card array sent to valuateMatchHand()!');
        assert.throw(() => valuateMatchHand(hand.slice(0, 3)), 'Incorrect sized card array sent to valuateMatchHand()!');
        assert.doesNotThrow(() => valuateMatchHand(hand.slice(0, 5)));
    });

    it('Properly valuates a full house', () => {
        assert.equal(valuateMatchHand(testHands.smallHouse.hand), testHands.smallHouse.expectedValue)
        assert.equal(valuateMatchHand(testHands.bigHouse.hand), testHands.bigHouse.expectedValue)
        assert.equal(valuateMatchHand(testHands.bigHouse_2.hand), testHands.bigHouse_2.expectedValue)
    });

    it('Properly valuates four of a kind', () => {
        assert.equal(valuateMatchHand(testHands.fourOfKind.hand), testHands.fourOfKind.expectedValue);
    });


    it('Properly valuates three of a kind', () => {
        assert.equal(valuateMatchHand(testHands.threeOfKind.hand), testHands.threeOfKind.expectedValue);
    });

    it('Properly valuates a two pair', () => {
        assert.equal(valuateMatchHand(testHands.twoPair.hand), testHands.twoPair.expectedValue);
        assert.equal(valuateMatchHand(testHands.twoPair_2.hand), testHands.twoPair_2.expectedValue);

    });

    it('Properly valuates a pair', () => {
        assert.equal(valuateMatchHand(testHands.pair.hand), testHands.pair.expectedValue);
    });

    it('Properly valuates kicker-only ranking', () => {
        assert.equal(valuateMatchHand(testHands.noMatches.hand), testHands.noMatches.expectedValue);
    });

    it('Sanely ranks all the match hands', () => {
        assert.isAbove(valuateMatchHand(testHands.fourOfKind.hand), valuateMatchHand(testHands.bigHouse.hand));
        assert.isAbove(valuateMatchHand(testHands.bigHouse.hand), valuateMatchHand(testHands.smallHouse.hand));
        assert.isAbove(valuateMatchHand(testHands.smallHouse.hand), valuateMatchHand(testHands.threeOfKind.hand));
        assert.isAbove(valuateMatchHand(testHands.threeOfKind.hand), valuateMatchHand(testHands.twoPair.hand));
        assert.isAbove(valuateMatchHand(testHands.twoPair.hand), valuateMatchHand(testHands.pair.hand));
        assert.isAbove(valuateMatchHand(testHands.pair.hand), valuateMatchHand(testHands.noMatches.hand));
    });

});

// Card values C 1-7 for readability :)
const hand: iCard[] = [
    card('C', 2),
    card('D', 2),
    card('H', 2),
    card('S', 2),
    card('H', 3),
    card('S', 3),
    card('D', 3),
    card('D', 4),
    card('D', 5),
    card('D', 6),
];