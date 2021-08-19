import { card } from "../src/utils/card";
import { assert } from 'chai';
import { valuateStraight } from '../src/utils/valuators/straightValuator'
import { describe, it } from 'mocha';

describe('Straight Valuator Unit Test', () => {
    const simpleStraight = [card('C', 2), card('D', 3), card('S', 4), card('S', 5), card('D', 6)];
    const wheelStraight = [card('C', 2), card('D', 3), card('S', 4), card('S', 5), card('D', 14)];
    const nonStraight = [card('C', 10), card('D', 3), card('S', 4), card('S', 5), card('D', 6)];
    it('recognizes a straight', () => {
        assert.equal(valuateStraight(simpleStraight), 6e18)
    });
    it('recognizes a wheel straight', () => {
        assert.equal(valuateStraight(wheelStraight), 5e18)
    });
    it('returns -1 for a non-straight', () => {
        assert.equal(valuateStraight(nonStraight), -1)
    });

});