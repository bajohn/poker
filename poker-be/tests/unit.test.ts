

import { iCard } from '../../shared/sharedtypes';
import { permuteCards } from '../src/utils/handEvaluator';
import { card } from '../src/utils/card';
import { assert, expect } from 'chai';
import { describe, it } from 'mocha';

describe('Hand Evaluator Unit Testing', () => {
    it('Gets permutations for 7 choose 5  (actual case used in holdem, choose 5 from (5 table + 2 pocket) cards)', () => {
        // Card values C 1-7 for readability :)
        const hand: iCard[] = [
            card('C', 1),
            card('C', 2),
            card('C', 3),
            card('C', 4),
            card('C', 5),
            card('C', 6),
            card('C', 7),
        ]
        const resp = permuteCards(hand, 5)
        console.log(resp);
        console.log(resp.length);
        assert.deepEqual(resp, expected);

    })
})

const expected = [
    [
        { suit: 'C', value: 1 },
        { suit: 'C', value: 2 },
        { suit: 'C', value: 3 },
        { suit: 'C', value: 4 },
        { suit: 'C', value: 5 }
    ],
    [
        { suit: 'C', value: 1 },
        { suit: 'C', value: 2 },
        { suit: 'C', value: 3 },
        { suit: 'C', value: 4 },
        { suit: 'C', value: 6 }
    ],
    [
        { suit: 'C', value: 1 },
        { suit: 'C', value: 2 },
        { suit: 'C', value: 3 },
        { suit: 'C', value: 4 },
        { suit: 'C', value: 7 }
    ],
    [
        { suit: 'C', value: 1 },
        { suit: 'C', value: 2 },
        { suit: 'C', value: 3 },
        { suit: 'C', value: 5 },
        { suit: 'C', value: 6 }
    ],
    [
        { suit: 'C', value: 1 },
        { suit: 'C', value: 2 },
        { suit: 'C', value: 3 },
        { suit: 'C', value: 5 },
        { suit: 'C', value: 7 }
    ],
    [
        { suit: 'C', value: 1 },
        { suit: 'C', value: 2 },
        { suit: 'C', value: 3 },
        { suit: 'C', value: 6 },
        { suit: 'C', value: 7 }
    ],
    [
        { suit: 'C', value: 1 },
        { suit: 'C', value: 2 },
        { suit: 'C', value: 4 },
        { suit: 'C', value: 5 },
        { suit: 'C', value: 6 }
    ],
    [
        { suit: 'C', value: 1 },
        { suit: 'C', value: 2 },
        { suit: 'C', value: 4 },
        { suit: 'C', value: 5 },
        { suit: 'C', value: 7 }
    ],
    [
        { suit: 'C', value: 1 },
        { suit: 'C', value: 2 },
        { suit: 'C', value: 4 },
        { suit: 'C', value: 6 },
        { suit: 'C', value: 7 }
    ],
    [
        { suit: 'C', value: 1 },
        { suit: 'C', value: 2 },
        { suit: 'C', value: 5 },
        { suit: 'C', value: 6 },
        { suit: 'C', value: 7 }
    ],
    [
        { suit: 'C', value: 1 },
        { suit: 'C', value: 3 },
        { suit: 'C', value: 4 },
        { suit: 'C', value: 5 },
        { suit: 'C', value: 6 }
    ],
    [
        { suit: 'C', value: 1 },
        { suit: 'C', value: 3 },
        { suit: 'C', value: 4 },
        { suit: 'C', value: 5 },
        { suit: 'C', value: 7 }
    ],
    [
        { suit: 'C', value: 1 },
        { suit: 'C', value: 3 },
        { suit: 'C', value: 4 },
        { suit: 'C', value: 6 },
        { suit: 'C', value: 7 }
    ],
    [
        { suit: 'C', value: 1 },
        { suit: 'C', value: 3 },
        { suit: 'C', value: 5 },
        { suit: 'C', value: 6 },
        { suit: 'C', value: 7 }
    ],
    [
        { suit: 'C', value: 1 },
        { suit: 'C', value: 4 },
        { suit: 'C', value: 5 },
        { suit: 'C', value: 6 },
        { suit: 'C', value: 7 }
    ],
    [
        { suit: 'C', value: 2 },
        { suit: 'C', value: 3 },
        { suit: 'C', value: 4 },
        { suit: 'C', value: 5 },
        { suit: 'C', value: 6 }
    ],
    [
        { suit: 'C', value: 2 },
        { suit: 'C', value: 3 },
        { suit: 'C', value: 4 },
        { suit: 'C', value: 5 },
        { suit: 'C', value: 7 }
    ],
    [
        { suit: 'C', value: 2 },
        { suit: 'C', value: 3 },
        { suit: 'C', value: 4 },
        { suit: 'C', value: 6 },
        { suit: 'C', value: 7 }
    ],
    [
        { suit: 'C', value: 2 },
        { suit: 'C', value: 3 },
        { suit: 'C', value: 5 },
        { suit: 'C', value: 6 },
        { suit: 'C', value: 7 }
    ],
    [
        { suit: 'C', value: 2 },
        { suit: 'C', value: 4 },
        { suit: 'C', value: 5 },
        { suit: 'C', value: 6 },
        { suit: 'C', value: 7 }
    ],
    [
        { suit: 'C', value: 3 },
        { suit: 'C', value: 4 },
        { suit: 'C', value: 5 },
        { suit: 'C', value: 6 },
        { suit: 'C', value: 7 }
    ]
]