import { iCard } from '../../shared/sharedtypes';
import { getMatches } from '../src/utils/handEvaluator';
import { card } from '../src/utils/card';
import { assert } from 'chai';
import { describe, it } from 'mocha';

describe.only('Card Matches Unit Test', () => {

    it('Sorts a 7 card hand', () => {
        const ret = getMatches(hand);
        console.log(ret);
    });

})

// Card values C 1-7 for readability :)
const hand: iCard[] = [
    card('C', 1),
    card('D', 2),
    card('C', 3),
    card('S', 3),
    card('H', 5),
    card('C', 5),
    card('C', 7),
];