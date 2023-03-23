import React, { useEffect } from 'react';
import logo from './logo.svg';
import CardService from './services/cardService';
import './App.css';

const App = () => { 
  useEffect(() => {
    const cardService = new CardService();
    const fetchNewDeck = async () => {
      const newDeck = await cardService.createNewShuffledDeck();
      console.log(newDeck);
    }
    fetchNewDeck();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
