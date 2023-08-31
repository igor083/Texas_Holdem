import React from 'react';
import Card from './components/Card';
import Player from './components/Player';

const players = [
   {
     name: 'Player 1',
     pot: 100,
     cards: [new Card({ suit: 'copas', rank: '2' })],
// Adicione as cartas do jogador aqui
   }]

const App = () => {
  return (
    <div>
      <Card suit="copas" rank="2" />
      <Card suit="copas" rank="k" />
    </div>
  );
};

export default App;