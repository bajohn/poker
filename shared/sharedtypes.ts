

// Front end listener endpoints
export type wsfeendpoint =
    'game-created-id' |
    'player-joined' |
    'deal-pocket-cards' |
    'request-bet' |
    'update-game-state' | 
    'player-folded' | 
    'set-outstanding-bet' |
    'deal-table-card'
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
    fold: boolean
    newBetAmount: number
};

export type GameState = 'pregame' | 'preflop' | 'flop' | 'turn' | 'river' | 'showdown';



export type Suit = 'C' | 'D' | 'S' | 'H';