import { iCard } from "../../../../shared/sharedtypes";
import { rankSort } from "../hand";
import { valuateFlush } from "./flushValuator";
import { valuateMatchHand } from "./matchValuator";
import { valuateStraight } from "./straightValuator";



export const valuateHand = (cards: iCard[]) => {
    const localCards = [].concat(cards);
    const straightVal = valuateStraight(localCards);
    const flushVal = valuateFlush(localCards);
    const matchVal = valuateMatchHand(localCards);
    if (straightVal > -1 && flushVal > -1) {
        // Straight flush
        // Because flush value is 1e20, and straight flush is 1e28, multiply by 1e8
        return flushVal * 1e8
    } else {
        return Math.max(flushVal, straightVal, matchVal);
    }
}