import { iCard } from '../../shared/sharedtypes';
import { valuateHand } from '../src/utils/valuators/handValuator';
import { card } from '../src/utils/card';
import { assert } from 'chai';
import { describe, it } from 'mocha';
import { testHands } from './testHelpers/testHands';

describe('Hand Valuator Unit Test', () => {

    it('Properly valuates a straight flush', () => {
        assert.equal(valuateHand(testHands.straightFlush.hand), testHands.straightFlush.expectedValue);
    });

    it('Properly valuates all test hands', () => {
        for (const handKey of Object.keys(testHands)) {
            assert.equal(valuateHand(testHands[handKey].hand), testHands[handKey].expectedValue);
        }

    });
});
