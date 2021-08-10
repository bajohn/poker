import { iCard } from '../../shared/sharedtypes';
import { rankSort } from '../src/utils/handEvaluator';
import { card } from '../src/utils/card';
import { assert } from 'chai';
import { describe, it } from 'mocha';

describe('Rank Hand Sort Unit Test', () => {

    it('Sorts a 5 card hand', () => {
        const randHand = [hand[6], hand[4], hand[2], hand[5], hand[1]];
        const sortedHand = rankSort(randHand);
        // assert monotonically non-decreasing
        for (let i = 0; i < sortedHand.length - 1; i++) {
            assert.isAtLeast(sortedHand[i].value, sortedHand[i + 1].value);
        }
    });

})

// Card values C 1-7 for readability :)
const hand: iCard[] = [
    card('C', 1),
    card('D', 2),
    card('C', 3),
    card('S', 4),
    card('H', 5),
    card('C', 5),
    card('C', 7),
];