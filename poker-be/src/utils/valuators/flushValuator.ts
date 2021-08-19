import { iCard } from "../../../../shared/sharedtypes";
import { rankSort } from "../hand";

/**
 * 
 * Return value if cards make a straight, 
 * -1 otherwise
 */
export const valuateFlush = (cards: iCard[]) => {
    const localCards = [].concat(cards);
    const sortedCards = rankSort(localCards);
    if (localCards.length !== 5) {
        throw Error('Incorrect sized card array sent to valuateFlush()!')
    }

    for (let i = 0; i < 4; i++) {
        if (sortedCards[i].suit !== (sortedCards[i + 1].suit)) {
            return -1;
        }
    }
    return 1e20 * sortedCards[0].value;
};