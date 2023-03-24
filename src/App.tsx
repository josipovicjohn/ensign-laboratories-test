import { useEffect, useState, useCallback } from 'react';
import CardService from './services/cardService';
import Card from './components/card/card';
import Button from './components/button/button';
import { DrawnCards } from './types/types';

import './App.css';

const cardService = new CardService();

const App = () => { 
  const [deckID, setDeckID] = useState<undefined | string>(undefined);
  const [drawnCardState, setDrawnCardState] = useState<null | DrawnCards>(null);

  // Initialises the game by creating a new shuffled deck and drawing the first card.
  const initGame = useCallback(async () => {
    const newDeck = await cardService.createNewShuffledDeck();
    const deckID = newDeck.deck_id;
    const drawnCard = await cardService.drawCard(deckID);
    
    setDrawnCardState(drawnCard);
    setDeckID(deckID);

  }, []);

  const handleDrawCard = useCallback(async () => {
    if (deckID !== undefined) {
      const drawnCard = await cardService.drawCard(deckID);
      setDrawnCardState(drawnCard);
      // TODO: Implement error handling to prevent drawing cards once end of deck is reached
    }
  }, [deckID]);

  const handleResetGame = useCallback(async () => {
    initGame();
  }, [initGame]);
  
  useEffect(() => {
    initGame()
  }, [initGame]);
  
  return (
    <div className="App">
      {/* Playing card */}
      {drawnCardState !== null ? <Card imageURL={drawnCardState.cards[0].image} imageCode={drawnCardState.cards[0].code}></Card> : <></>}
      
      {/* Game buttons */}
      <div className='buttons-container'>
        {/* Draw card button */}
        <div className='spacing'>
          <Button type='draw' disabled={false} onClick={handleDrawCard} />
        </div>

        {/* High guess and low guess buttons */}
        <div className='spacing'>
          <div className='high-low-container'>
            <Button type='higher' disabled={false} onClick={() => {}} />
            <Button type='lower' disabled={false} onClick={() => {}} />
          </div>
        </div>

        {/* Reset game button */}
        <Button type='reset' disabled={false} onClick={handleResetGame} />
      </div>

    </div>
  );
}

export default App;
