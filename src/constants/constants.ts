export const DECK_OF_CARDS_API_URL = 'https://deckofcardsapi.com/api';

// NB: Assume no jokers.
export const CARD_RANKS = new Map<string, number>([
    ['2', 2],
    ['3', 3],
    ['4', 4],
    ['5', 5],
    ['6', 6],
    ['7', 7],
    ['8', 8],
    ['9', 9],
    ['10', 10],
    ['J', 11],
    ['Q', 12],
    ['K', 13],
    ['A', 14]
])