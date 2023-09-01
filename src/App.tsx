import Card from './components/Card';
import Player from './components/Player';
import { Suit, Rank, createDeck, dealTwoCards}  from "./helpers/BaralhoDealer";
const players = [
  {
    name: 'Player 1',
    pot: 100,
    cards: [],
  }
]

const App = () => {
   let baralho = createDeck();
   
   const dealtCards = dealTwoCards(baralho);
 
 if (dealtCards !== null) {
   const [cardA, cardB] = dealtCards;
   console.log("Carta A:", cardA);
   console.log("Carta B:", cardB);
   console.log("Deck restante:", baralho);
 } else {
   console.log("Não há cartas suficientes para distribuir duas cartas.");
 }
 
  return (
    <div>
      <Card suit="copas" rank={2} />
      <Card suit="copas" rank={11} />
      <Card suit="copas" rank= {3} />
    </div>
  );
};

export default App;