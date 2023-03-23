import axios from 'axios';
import { DECK_OF_CARDS_API_URL } from "../constants/constants";
import { Deck, DrawnCards, DiscardCards } from "../types/types";

interface ICardService {
    createNewShuffledDeck: () => Promise<Deck>
    drawCard: (deckID: string) => Promise<DrawnCards>
    discardCard: (deckID: string, pileName: string, cardCode: string) => Promise<DiscardCards>  
}

class CardService implements ICardService {
    // Assume deck count is 1.
    public async createNewShuffledDeck(): Promise<Deck> {
        const result = await axios.get(`${DECK_OF_CARDS_API_URL}/deck/new/shuffle/?deck_count=1`);
        return result.data as Deck;
    }

    public async drawCard(deckID: string): Promise<DrawnCards> {
        const result = await axios.get(`${DECK_OF_CARDS_API_URL}/deck/${deckID}/draw/?count=1`);
        return result.data as DrawnCards
    }

    // Discards card after it has been drawn.
    // NB: Error checking to be performed for invalid card codes.
    public async discardCard(deckID: string, pileName: string, cardCode: string): Promise<DiscardCards> {
        const result = await axios.get(`${DECK_OF_CARDS_API_URL}/deck/${deckID}/pile/${pileName}/add/?cards=${cardCode}`);
        return result.data as DiscardCards
    } 

}

export default CardService;