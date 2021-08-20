import { iCard } from '../../shared/sharedtypes';
import { valuateMatchHand } from '../src/utils/valuators/matchValuator';
import { card } from '../src/utils/card';
import { assert } from 'chai';
import { describe, it } from 'mocha';
import { TestHands } from './helpers/testhands';

describe('Card Match Valuation Unit Test', () => {

    it('Throws an error for an incorrectly sized hand', () => {
        assert.throw(() => valuateMatchHand(hand), 'Incorrect sized card array sent to valuateMatchHand()!');
        assert.throw(() => valuateMatchHand(hand.slice(0, 3)), 'Incorrect sized card array sent to valuateMatchHand()!');
        assert.doesNotThrow(() => valuateMatchHand(hand.slice(0, 5)));
    });

    it('Properly valuates a full house', () => {
        assert.equal(valuateMatchHand(TestHands.smallHouse.hand), TestHands.smallHouse.expectedValue)
        assert.equal(valuateMatchHand(TestHands.bigHouse.hand), TestHands.bigHouse.expectedValue)
        assert.equal(valuateMatchHand(TestHands.bigHouse_2.hand), TestHands.bigHouse_2.expectedValue)
    });

    it('Properly valuates four of a kind', () => {
        assert.equal(valuateMatchHand(TestHands.fourOfKind.hand), TestHands.fourOfKind.expectedValue);
    });


    it('Properly valuates three of a kind', () => {
        assert.equal(valuateMatchHand(TestHands.threeOfKind.hand), TestHands.threeOfKind.expectedValue);
    });

    it('Properly valuates a two pair', () => {
        assert.equal(valuateMatchHand(TestHands.twoPair.hand), TestHands.twoPair.expectedValue);
        assert.equal(valuateMatchHand(TestHands.twoPair_2.hand), TestHands.twoPair_2.expectedValue);

    });

    it('Properly valuates a pair', () => {
        assert.equal(valuateMatchHand(TestHands.pair.hand), TestHands.pair.expectedValue);
    });

    it('Properly valuates kicker-only ranking', () => {
        assert.equal(valuateMatchHand(TestHands.noMatches.hand), TestHands.noMatches.expectedValue);
    });

    it('Sanely ranks all the match hands', () => {
        assert.isAbove(valuateMatchHand(TestHands.fourOfKind.hand), valuateMatchHand(TestHands.bigHouse.hand));
        assert.isAbove(valuateMatchHand(TestHands.bigHouse.hand), valuateMatchHand(TestHands.smallHouse.hand));
        assert.isAbove(valuateMatchHand(TestHands.smallHouse.hand), valuateMatchHand(TestHands.threeOfKind.hand));
        assert.isAbove(valuateMatchHand(TestHands.threeOfKind.hand), valuateMatchHand(TestHands.twoPair.hand));
        assert.isAbove(valuateMatchHand(TestHands.twoPair.hand), valuateMatchHand(TestHands.pair.hand));
        assert.isAbove(valuateMatchHand(TestHands.pair.hand), valuateMatchHand(TestHands.noMatches.hand));
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