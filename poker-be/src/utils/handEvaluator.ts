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

// Sort in descending card rank order
export const rankSort = (cards: iCard[]) => cards.sort((a, b) => b.value - a.value);

// TODO finish this!
export const getMatches = (cards: iCard[]) => {
    const sortedCards = rankSort(cards);
    let matchCtr = 0;
    const kickers = [];
    const matches: { [key: string]: number } = {};
    for (let i = 0; i < sortedCards.length - 1; i++) {
        if (sortedCards[i].value === sortedCards[i + 1].value) {
            matchCtr += 1;
        } else {
            if (matchCtr > 0) {
                matches[sortedCards[i].value + ''] = matchCtr + 1;
                matchCtr = 0;
            } else {
                kickers.push(sortedCards[i].value);
            }
        }
    }
    return { matches, kickers };
}


// Dumb alg
// export const getMatches = (cards: iCard[]) => {
//     const matchCounter = cards.reduce((lv: { [key: string]: number }, cv) => {
//         const curVal = '' + cv.value;
//         curVal in lv ? lv[curVal] += 1 : lv[curVal] = 1;
//         return lv;
//     }, {});

//     // kickers?
//     const pairs = getMatchCount(matchCounter, 2);
//     const threeOfKind = getMatchCount(matchCounter, 3);
//     const fourOfKind = getMatchCount(matchCounter, 4);
// }


// const getMatchCount = (
//     matchCounter: { [key: string]: number }, num: number
// ) => Object.keys(matchCounter).reduce((lv, cv) => matchCounter[cv] === num ? lv + 1 : lv, 0)