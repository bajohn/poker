import 'mocha';
import { iCard } from '../../shared/sharedtypes';
import { permuteHands } from '../src/utils/handEvaluator';
import { card } from '../src/utils/card';

describe('Hand Evaluator Unit Testing', () => {
    it('Gets permutations', () => {
        const hand: iCard[] = [
            card('C', 3),
            card('C', 4),
            card('D', 5),
            // card('S', 10),
            // card('S', 10)
        ]
        const resp = permuteHands(hand, 2)
        console.log(resp);
    })
}) 