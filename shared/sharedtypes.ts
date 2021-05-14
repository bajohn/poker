

// Front end listener endpoints
export type wsfeendpoint =
    'game-created-id' |
    'player-joined' |
    'deal-pocket-cards' |
    'request-bet' |
    'update-game-state'
    ;

// Back end listener endpoints
export type wsbeendpoint =
    'open-wallet' |
    'create-game' |
    'player-join' |
    'start-game' | 
    'bet-response'
    ;



export interface iHand {
    playerCards: {
    [key: string]: iCard[]
    }
};

export interface iCard {
    value: number
    suit: Suit
};

export type GameState = 'pregame' | 'preflop' 



export type Suit = 'C' | 'D' | 'S' | 'H';