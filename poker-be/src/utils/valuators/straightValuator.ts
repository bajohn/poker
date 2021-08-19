import { iCard } from "../../../../shared/sharedtypes";
import { rankSort } from "../hand";

/**
 * 
 * Return value if cards make a straight, 
 * -1 otherwise
 */
export const valuateStraight = (cards: iCard[]) => {
    const localCards = [].concat(cards);
    const sortedCards = rankSort(localCards);
    if (localCards.length !== 5) {
        throw Error('Incorrect sized card array sent to valuateStraight()!')
    }

    // Check for wheel first
    if (
        sortedCards[0].value === 14 &&
        sortedCards[1].value === 5 &&
        sortedCards[2].value === 4 &&
        sortedCards[3].value === 3 &&
        sortedCards[4].value === 2
    ) {
        return 5e18;
    } else {
        for (let i = 0; i < 4; i++) {
            if (sortedCards[i].value !== (sortedCards[i + 1].value + 1)) {
                return -1;
            }
        }
        return 1e18 * sortedCards[0].value;
    }
};