

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
    // game endpoints
    'open-wallet' |
    'create-game' |
    'start-game' | 
    'bet-response' |

    // player endpoints
    'player-join' |
    'player-bet-message'
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

export interface iBetMessage {
    newBetAmount: number
}

export type GameState = 'pregame' | 'preflop' 



export type Suit = 'C' | 'D' | 'S' | 'H';