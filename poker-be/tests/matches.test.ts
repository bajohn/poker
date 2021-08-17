import { iCard } from '../../shared/sharedtypes';
import { getMatches, valuateMatches } from '../src/utils/handEvaluator';
import { card } from '../src/utils/card';
import { assert } from 'chai';
import { describe, it } from 'mocha';

describe.only('Card Matches Unit Test', () => {

    it('Throws an error for an incorrectly sized hand', () => {
        assert.throw(() => valuateMatches(hand), 'Incorrect sized card array sent to valuateMatches()!');
        assert.throw(() => valuateMatches(hand.slice(0, 3)), 'Incorrect sized card array sent to valuateMatches()!');
        assert.doesNotThrow(() => valuateMatches(hand.slice(0, 5)));
    });

    it('Properly valuates a full house', () => {
        const smallHouse = [card('C', 2), card('D', 2), card('S', 2), card('S', 3), card('D', 3)];
        const bigHouse = [card('C', 2), card('D', 2), card('H', 3), card('S', 3), card('D', 3)];
        assert.equal(valuateMatches(smallHouse), 2e24 + 3e22)
        assert.equal(valuateMatches(bigHouse), 3e24 + 2e22)
    });

    it('Properly valuates four of a kind', () => {
        const fourOfKind = [card('C', 2), card('D', 2), card('S', 2), card('H', 2), card('D', 3)];
        assert.equal(valuateMatches(fourOfKind), 2e26 + 3);
    });

})

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