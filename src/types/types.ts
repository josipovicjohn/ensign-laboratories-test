export type Deck = {
    success: boolean,
    deck_id: string,
    shuffled: boolean,
    remaining: number
}

export type Card = {
    code: string,
    image: string,
    images: {
        [key: string]: string
    },
    value: string,
    suit: string
}

export type DrawnCards = {
    success: boolean,
    deck_id: string,
    cards: Array<Card>,
    remaining: number
}

export type DiscardCards = {
    success: boolean,
    deck_id: string,
    remaining: number,
    piles: any
}