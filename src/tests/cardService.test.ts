import request from 'supertest';
import { DECK_OF_CARDS_API_URL } from '../constants/constants';
import { Deck, DrawnCards } from '../types/types';

describe('Card Service', () => {
    test('It correctly creates a new shuffled deck', async () => {
        const response = await request(`${DECK_OF_CARDS_API_URL}`)
            .get('/deck/new/shuffle/?deck_count=1')
            .expect('Content-Type', /json/)
            .expect(200);

        const data = response.body as Deck;

        expect(data).toBeDefined();
        expect(data.success).toEqual(true);
        expect(typeof data.deck_id).toBe("string");
        expect(data.shuffled).toEqual(true);
        expect(data.remaining).toEqual(52);

    });
    test('It correctly draws a single card from the deck', async () => {
        const newDeckResponse = await request(`${DECK_OF_CARDS_API_URL}`)
            .get('/deck/new/shuffle/?deck_count=1');

        const newDeck = newDeckResponse.body as Deck;

        const drawnCardResponse = await request(`${DECK_OF_CARDS_API_URL}`)
            .get(`/deck/${newDeck.deck_id}/draw/?count=1`)
            .expect('Content-Type', /json/)
            .expect(200);

        const data = drawnCardResponse.body as DrawnCards;

        expect(data).toBeDefined();
        expect(data.success).toEqual(true);
        expect(data.deck_id).toEqual(newDeck.deck_id)
        expect(data.cards).toHaveLength(1);
        expect(data.remaining).toEqual(51);

    });
});