import { iCard } from "../../../shared/sharedtypes"


export const permuteHands = (cards: iCard[], outSize: number): iCard[][] => {
    const ret = [];
    for (let i = 0; i < cards.length; i++) {
        for (let j = i+1; j < cards.length; j++) {
            const cur = [];
            cur.push(cards[i]);
            cur.push(cards[j]); 
            
            ret.push(cur);
        }
    }
    return ret;
}  