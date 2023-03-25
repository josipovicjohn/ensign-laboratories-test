import { useEffect, useState, useCallback } from 'react';
import CardService from './services/cardService';
import Card from './components/card/card';
import Button from './components/button/button';
import { DrawnCards } from './types/types';
import { CARD_RANKS } from './constants/constants';

import './App.css';

const cardService = new CardService();

const App = () => { 
  const [points, setPoints] = useState<number>(0);
  const [deckID, setDeckID] = useState<undefined | string>(undefined);
  const [drawnCardState, setDrawnCardState] = useState<null | DrawnCards>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [userWin, setUserWin] = useState<null | boolean>(null);

  const initGame = useCallback(async () => {
    const newDeck = await cardService.createNewShuffledDeck();
    const deckID = newDeck.deck_id;
    const drawnCard = await cardService.drawCard(deckID);
    
    setDrawnCardState(drawnCard);
    setDeckID(deckID);
    setPoints(0);
    setGameOver(false);
    setUserWin(null);

  }, []);

  const handleResetGame = useCallback(async () => {
    initGame();
  }, [initGame]);

  const handleHigherGuess = useCallback(async () => {
    if (deckID !== undefined && drawnCardState !== null && drawnCardState.remaining > 0) {
      const nextDrawnCard = await cardService.drawCard(deckID);

      const currentCardValue = CARD_RANKS.get(drawnCardState.cards[0].value) as number;
      const nextDrawnCardValue = CARD_RANKS.get(nextDrawnCard.cards[0].value) as number;

      setDrawnCardState(nextDrawnCard);

      // NB: Assume that if the user guesses higher and the next card is of equal value it is valid.
      if (nextDrawnCardValue >= currentCardValue) {
        setPoints(points + 1);
      } else {
        setPoints(points - 1);
      }
    }
  }, [deckID, drawnCardState, points]);

  const handleLowerGuess = useCallback(async () => {
    if (deckID !== undefined && drawnCardState !== null && drawnCardState.remaining > 0) {
      const nextDrawnCard = await cardService.drawCard(deckID);

      const currentCardValue = CARD_RANKS.get(drawnCardState.cards[0].value) as number;
      const nextDrawnCardValue = CARD_RANKS.get(nextDrawnCard.cards[0].value) as number;

      setDrawnCardState(nextDrawnCard);

      if (nextDrawnCardValue < currentCardValue) {
        setPoints(points + 1);
      } else {
        setPoints(points - 1);
      }
    }
  }, [deckID, drawnCardState, points]);

  useEffect(() => {
    initGame()
  }, [initGame]);

  useEffect(() => {
    if (drawnCardState !== null) {
      console.log(drawnCardState.remaining);
      if (points >= 5 && drawnCardState.remaining >= 0) {
        setGameOver(true);
        setUserWin(true);
      }
  
      else if (points <= -5 && drawnCardState.remaining >= 0) {
        setGameOver(true);
        setUserWin(false);
      }

      // NB: Assume user loses if they dont reach 5 points before the deck finishes.
      else if ((points > -5 && drawnCardState.remaining === 0) || (points < 5 && drawnCardState.remaining === 0)) {
        setGameOver(true);
        setUserWin(false);
      }

    }
  }, [points, drawnCardState])
  
  return (
    <div className="App">

      {/* points container */}
      <div className='spacing'>
        <p className='points'>POINTS: {points}</p>
      </div>

      {/* Playing card */}
      {drawnCardState !== null
        ? <Card imageURL={drawnCardState.cards[0].image} imageCode={drawnCardState.cards[0].code}></Card> 
        : <></>
      }
      
      {/* Game buttons */}
      <div className='buttons-container'>
        {/* High guess and low guess buttons */}
        <div className='spacing'>
          <div className='high-low-container'>
            <Button type='higher' disabled={false} onClick={handleHigherGuess} />
            <Button type='lower' disabled={false} onClick={handleLowerGuess} />
          </div>
        </div>

        {/* Reset game button */}
        <Button type='reset' disabled={false} onClick={handleResetGame} />

        {/* Game over text */}
      </div>


    </div>
  );
}

export default App;
