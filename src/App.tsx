import { useEffect, useState, useCallback } from 'react';
import CardService from './services/cardService';
import Card from './components/card/card';
import Button from './components/button/button';
import Banner from './components/banner/banner';
import { DrawnCards, Guess } from './types/types';
import { CARD_RANKS } from './constants/constants';
import CircularProgress from '@mui/material/CircularProgress';

import './App.css';

const cardService = new CardService();

const App = () => { 
  const [points, setPoints] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [deckID, setDeckID] = useState<undefined | string>(undefined);
  const [drawnCardState, setDrawnCardState] = useState<null | DrawnCards>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [userWin, setUserWin] = useState<null | boolean>(null);

  const initGame = useCallback(async (): Promise<void> => {
    setLoading(true);
    const newDeck = await cardService.createNewShuffledDeck();
    const deckID = newDeck.deck_id;
    const drawnCard = await cardService.drawCard(deckID);
    
    setDrawnCardState(drawnCard);
    setDeckID(deckID);
    setPoints(0);
    setGameOver(false);
    setUserWin(null);

  }, []);

  const handleResetGame = useCallback(async (): Promise<void> => {
    initGame();
  }, [initGame]);

  const handleGuess = useCallback(async (guess: Guess): Promise<void> => {
    if (deckID !== undefined && drawnCardState !== null && drawnCardState.remaining > 0) {
      setLoading(true);
      const nextDrawnCard = await cardService.drawCard(deckID);

      const currentCardValue = CARD_RANKS.get(drawnCardState.cards[0].value) as number;
      const nextDrawnCardValue = CARD_RANKS.get(nextDrawnCard.cards[0].value) as number;

      setDrawnCardState(nextDrawnCard);

      if (guess === 'higher') {
        if (nextDrawnCardValue >= currentCardValue) {
          setPoints(points + 1);
          return;
        } else {
          setPoints(points - 1);
          return;
        }
      }

      if (guess === 'lower') {
        if (nextDrawnCardValue < currentCardValue) {
          setPoints(points + 1);
          return;
        } else {
          setPoints(points - 1);
          return;
        }
      }

    }
  }, [deckID, drawnCardState, points]);

  useEffect(() => {
    initGame()
  }, [initGame]);

  useEffect(() => {
    if (drawnCardState !== null) {
      if (points >= 5 && drawnCardState.remaining >= 0) {
        setGameOver(true);
        setUserWin(true);
      }

      else if ((points <= -5 && drawnCardState.remaining >= 0) || (points > -5 && drawnCardState.remaining === 0) || (points < 5 && drawnCardState.remaining === 0) ) {
        setGameOver(true);
        setUserWin(false);
      }

    }
  }, [points, drawnCardState])
  
  return (
    <div id="app">

      {/* Points container */}
      <div className='spacing' id='points-container'>
        <p id='points'>POINTS: {points}</p>
      </div>

      {/* Playing card */}
      <div id='card-container'>
        {loading && <div><CircularProgress /></div>}
        {drawnCardState !== null && <Card imageURL={drawnCardState.cards[0].image} imageCode={drawnCardState.cards[0].code} loading={loading} onLoad={() => setLoading(false)}></Card> }
      </div>
      

      {/* Game buttons */}
      <div id='buttons-container'>
        {/* High guess and low guess buttons */}
        <div className='spacing'>
          <div id='high-low-container'>
            <div className='play-button-container'>
              <Button type='higher' disabled={gameOver || loading} onClick={() => handleGuess('higher')} />
            </div>
            <div className='play-button-container'>
              <Button type='lower' disabled={gameOver || loading} onClick={() => handleGuess('lower')} />
            </div>
          </div>
        </div>

        {/* Reset game button */}
        <div id='reset-button-container'>
          <Button type='reset' disabled={false} onClick={() => handleResetGame()} />
        </div>

      </div>

      {/* Game over text */}
      {gameOver === true && userWin && 
        <div className='spacing message-container'>
          <div className='banner-wrapper'>
            <Banner message='YOU WIN!' />
          </div>
        </div>
      }
      
      {gameOver === true && !userWin && 
        <div className='spacing message-container'>
          <div className='banner-wrapper'>
            <Banner message='YOU LOSE!' />
          </div>
        </div>
      }

    </div>
  );
}

export default App;
