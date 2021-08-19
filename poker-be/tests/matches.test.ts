import { iCard } from '../../shared/sharedtypes';
import { valuateMatchHand } from '../src/utils/valuators/matchValuator';
import { card } from '../src/utils/card';
import { assert } from 'chai';
import { describe, it } from 'mocha';

describe('Card Match Valuation Unit Test', () => {

    const smallHouse = [card('C', 2), card('D', 2), card('S', 2), card('S', 3), card('D', 3)];
    const bigHouse = [card('C', 2), card('D', 2), card('H', 3), card('S', 3), card('D', 3)];
    const bigHouse_2 = [card('C', 5), card('D', 3), card('H', 5), card('S', 3), card('D', 3)];
    const fourOfKind = [card('C', 2), card('D', 2), card('S', 2), card('H', 2), card('D', 3)];
    const threeOfKind = [card('C', 2), card('D', 2), card('S', 2), card('H', 3), card('D', 4)];
    const twoPair = [card('C', 2), card('D', 2), card('S', 3), card('H', 3), card('D', 4)];
    const twoPair_2 = [card('D', 4), card('H', 2), card('C', 3), card('D', 4), card('S', 2)];
    const pair = [card('C', 2), card('D', 2), card('S', 3), card('H', 4), card('D', 5)];
    const noMatches = [card('C', 2), card('D', 3), card('S', 4), card('H', 5), card('D', 7)];

    it('Throws an error for an incorrectly sized hand', () => {
        assert.throw(() => valuateMatchHand(hand), 'Incorrect sized card array sent to valuateMatchHand()!');
        assert.throw(() => valuateMatchHand(hand.slice(0, 3)), 'Incorrect sized card array sent to valuateMatchHand()!');
        assert.doesNotThrow(() => valuateMatchHand(hand.slice(0, 5)));
    });

    it('Properly valuates a full house', () => {
        assert.equal(valuateMatchHand(smallHouse), 2e24 + 3e22)
        assert.equal(valuateMatchHand(bigHouse), 3e24 + 2e22)
        assert.equal(valuateMatchHand(bigHouse_2), 3e24 + 5e22)
    });

    it('Properly valuates four of a kind', () => {
        assert.equal(valuateMatchHand(fourOfKind), 2e26 + 3);
    });


    it('Properly valuates three of a kind', () => {
        assert.equal(valuateMatchHand(threeOfKind), 2e16 + 4e2 + 3);
    });

    it('Properly valuates a two pair', () => {
        assert.equal(valuateMatchHand(twoPair), 3e14 + 2e12 + 4);
        assert.equal(valuateMatchHand(twoPair_2), 4e14 + 2e12 + 3);

    });

    it('Properly valuates a pair', () => {
        assert.equal(valuateMatchHand(pair), 2e10 + 5e4 + 4e2 + 3);
    });

    it('Properly valuates kicker-only ranking', () => {
        assert.equal(valuateMatchHand(noMatches), 7e8 + 5e6 + 4e4 + 3e2 + 2);
    });

    it('Sanely ranks all the match hands', () => {
        assert.isAbove(valuateMatchHand(fourOfKind), valuateMatchHand(bigHouse));
        assert.isAbove(valuateMatchHand(bigHouse), valuateMatchHand(smallHouse));
        assert.isAbove(valuateMatchHand(smallHouse), valuateMatchHand(threeOfKind));
        assert.isAbove(valuateMatchHand(threeOfKind), valuateMatchHand(twoPair));
        assert.isAbove(valuateMatchHand(twoPair), valuateMatchHand(pair));
        assert.isAbove(valuateMatchHand(pair), valuateMatchHand(noMatches));
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