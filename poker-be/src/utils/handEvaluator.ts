import { iCard } from "../../../shared/sharedtypes"

const TEN_K = 1e4;
const ONE_M = 1e6;
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
// return
// array of matches? 
// [{val, count}, {val, count},...]
export const getMatches = (cards: iCard[]) => {

    const sortedCards = rankSort(cards);
    const grouped: matches[] = [{ value: cards.shift().value, count: 1 }];

    // Group all cards into match objects (whether cards are alone or are part of a pair+)
    for (const card of sortedCards) {
        if (!grouped || grouped[0].value === card.value) {
            grouped[0].count += 1;
        } else {
            grouped.unshift({ value: card.value, count: 1 })
        }
    }

    // Separate pairs+ from one-offs (kickers)
    const { matches, kickers } = grouped.reduce((lv, cv) => {
        if (cv.count > 1) {
            lv.matches.push(cv);
        } else {
            lv.kickers.push(cv.value);
        }
        return lv;
    }, { matches: [], kickers: [] })

    matches.sort((a, b) => {
        // three of a kind before pair
        const ret = b.count - a.count;
        if (ret === 0) {
            // two pair: sort by value
            return b.value - a.value;
        }
        return ret;
    });
    return { matches, kickers };
}

export const valuateMatches = (cards: iCard[]) => {
    if (cards.length !== 5) {
        throw Error('Incorrect sized card array sent to valuateMatches()!')
    }
    const { matches, kickers } = getMatches(cards);
    if (matches.length === 2) {
        if (matches[0].count === 3) {
            // full house
            return 1e24 * matches[0].value + 1e22 * matches[1].value
        } else {
            // two pair 
            // return 1e14 * matches[0].value + 1e22 * matches[1].value
        }


    } else if (matches.length === 1) {
        if (matches[0].count === 4) {
            // four of kind
            return 1e26 * matches[0].value + kickers[0];
        }
        if (matches[0].count === 3) {
            // three of kind
        } else {
            // pair
        }
    } else {
        return -1;
    }
}

interface matches {
    value: number
    count: number
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