import { iCard } from "../../../shared/sharedtypes"

// Return an array of all possible permutations 
// of the given cards array 
export const permuteCards = (cards: iCard[], permSize: number) => {
    const ret = cards.map(el => [el]);
    while (ret[0].length < permSize) {
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