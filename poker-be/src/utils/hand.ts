import { iCard } from "../../../shared/sharedtypes";

// Return an array of all possible combinations 
// of the given cards array 
export const combineCards = (cards: iCard[], combinationSize: number) => {
    const ret = cards.map(el => [el]);
    if(combinationSize > cards.length) {
        throw Error('Size of combination cannot be larger than card array');
    }
    while (ret[0].length < combinationSize) {
        const perm = ret.shift();
        const nextIdx = cards.indexOf(perm[perm.length - 1]) + 1;
        for (let i = nextIdx; i < cards.length; i++) {
            const nextPerm = [].concat(perm);
            nextPerm.push(cards[i]);
            ret.push(nextPerm);
        }
    }
    return ret;
}

// Sort in descending card rank order
export const rankSort = (cards: iCard[]) => cards.sort((a, b) => b.value - a.value);

