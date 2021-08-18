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

// Return proper valuation for any hand that requires matches:
// Four of kind, full house, three of kind, two pair, one pair, or no matches (kickers only)
export const valuateMatchHand = (cards: iCard[]) => {
    const localCards = [].concat(cards);
    if (localCards.length !== 5) {
        throw Error('Incorrect sized card array sent to valuateMatchHand()!')
    }
    const { matches, kickers } = getMatches(localCards);
    return valuateMatches(matches) + valuateKickers(kickers);
}

// returns matches and kickers ordered descending
const getMatches = (cards: iCard[]) => {

    const sortedCards = rankSort(cards);
    const grouped: matches[] = [{ value: cards.shift().value, count: 1 }];

    // Group all cards into match objects (whether cards are alone or are part of a pair+)
    for (const card of sortedCards) {
        const lastIdx = grouped.length - 1;
        if (!grouped || grouped[lastIdx].value === card.value) {
            grouped[lastIdx].count += 1;
        } else {
            grouped.push({ value: card.value, count: 1 })
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



const valuateMatches = (matches: matches[]) => {

    if (matches.length === 2) {
        if (matches[0].count === 3) {
            // full house
            return 1e24 * matches[0].value + 1e22 * matches[1].value;
        } else {
            // two pair 
            return 1e14 * matches[0].value + 1e12 * matches[1].value;
        }

    } else if (matches.length === 1) {
        if (matches[0].count === 4) {
            // four of kind
            return 1e26 * matches[0].value;
        }
        if (matches[0].count === 3) {
            // three of kind
            return 1e16 * matches[0].value;
        } else {
            // pair
            return 1e10 * matches[0].value;
        }
    } else {
        // No matches, valuate kickers
        return 0;
    }
}

const valuateKickers = (sortedKickers: number[]) => {
    return sortedKickers.map((el, idx) => {
        const exp = 2 * (sortedKickers.length - idx - 1)
        return el * 10 ** exp;
    }).reduce((lv, cv) => lv + cv, 0);
}

interface matches {
    value: number
    count: number
}
