

// Front end listener endpoints
export type wsfeendpoint =
    'game-created-id' |
    'player-joined' |
    'deal-pocket-cards'
    ;

// Back end listener endpoints
export type wsbeendpoint =
    'open-wallet' |
    'create-game' |
    'player-join';



export interface iHand {
    playerCards: {
    [key: string]: iCard[]
    }
};

export interface iCard {
    value: number
    suit: Suit
};



export type Suit = 'C' | 'D' | 'S' | 'H';