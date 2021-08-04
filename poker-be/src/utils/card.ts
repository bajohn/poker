

//helper to initialize cards quickly

import { iCard, Suit } from "../../../shared/sharedtypes"

export const card = (suit: Suit, value: number): iCard => {
    return {
        suit,
        value
    }
}