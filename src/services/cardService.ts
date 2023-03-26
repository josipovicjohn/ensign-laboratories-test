import axios from 'axios';
import { DECK_OF_CARDS_API_URL } from "../constants/constants";
import { Deck, DrawnCards } from "../types/types";

interface ICardService {
    createNewShuffledDeck: () => Promise<Deck>
    drawCard: (deckID: string) => Promise<DrawnCards>
}

class CardService implements ICardService {
    public async createNewShuffledDeck(): Promise<Deck> {
        const result = await axios.get(`${DECK_OF_CARDS_API_URL}/deck/new/shuffle/?deck_count=1`);
        return result.data as Deck;
    }

    public async drawCard(deckID: string): Promise<DrawnCards> {
        const result = await axios.get(`${DECK_OF_CARDS_API_URL}/deck/${deckID}/draw/?count=1`);
        return result.data as DrawnCards
    }

}

export default CardService;