

import { iCard } from '../../shared/sharedtypes';
import { permuteCards } from '../src/utils/handEvaluator';
import { card } from '../src/utils/card';
import { assert } from 'chai';
import { describe, it } from 'mocha';

describe('Permuter Unit Test', () => {


    it('Gets permutations for 3 choose 1 ', () => {
        const resp = permuteCards(hand.slice(0, 3), 1);
        assert.deepEqual(resp, expected3c1);
    });

    it('Gets permutations for 3 choose 2 ', () => {
        const resp = permuteCards(hand.slice(0, 3), 2);
        assert.deepEqual(resp, expected3c2);
    });



    it('Gets permutations for 3 choose 3 ', () => {
        const resp = permuteCards(hand.slice(0, 3), 3);
        assert.deepEqual(resp, expected3c3);
    });

    it('Gets permutations for 7 choose 5  (actual case used in holdem, choose 5 from (5 table + 2 pocket) cards)', () => {

        const resp = permuteCards(hand, 5)
        assert.deepEqual(resp, expected7c5);
    });
})

// Card values C 1-7 for readability :)
const hand: iCard[] = [
    card('C', 1),
    card('C', 2),
    card('C', 3),
    card('C', 4),
    card('C', 5),
    card('C', 6),
    card('C', 7),
];

const expected3c1 = [
    [{ suit: 'C', value: 1 }],
    [{ suit: 'C', value: 2 }],
    [{ suit: 'C', value: 3 }]
];

const expected3c2 = [
    [{ suit: 'C', value: 1 }, { suit: 'C', value: 2 }],
    [{ suit: 'C', value: 1 }, { suit: 'C', value: 3 }],
    [{ suit: 'C', value: 2 }, { suit: 'C', value: 3 }]
];

const expected3c3 = [
    [
        { suit: 'C', value: 1 },
        { suit: 'C', value: 2 },
        { suit: 'C', value: 3 }
    ]
];
const expected7c5 = [
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
];

