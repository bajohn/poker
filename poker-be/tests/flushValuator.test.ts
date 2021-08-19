import { card } from "../src/utils/card";
import { assert } from 'chai';
import { valuateFlush } from '../src/utils/valuators/flushValuator'

describe('Flush Valuation Unit Test', () => {
    const simpleFlush = [card('C', 2), card('C', 3), card('C', 4), card('C', 5), card('C', 7)];
    const nonFlush = [card('C', 2), card('D', 3), card('C', 4), card('C', 5), card('C', 7)];

    it('recognizes a flush', () => {
        assert.equal(valuateFlush(simpleFlush), 7e20)
    });
    it('returns -1 for a non-straight', () => {
        assert.equal(valuateFlush(nonFlush), -1)
    });

});