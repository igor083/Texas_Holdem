import Card from './components/Card';
import Player from './components/Player';
import { createDeck, dealTwoCards, dealCommunityCards } from "./helpers/BaralhoDealer";
const players = [
   {
      name: 'Player 1',
      pot: 100,
      cards: [],
   }
]

const App = () => {
   var baralho = createDeck();

   dealCommunityCards(baralho, 5);

   return (
      <>
         <div>
            <Player name={'Joao Sorrisao'} pot={0} cards={dealTwoCards(baralho)} />
            <Player name={'Sorrisao'} pot={5000} cards={dealTwoCards(baralho)} />
         </div>
      </>


   );
}


export default App;
 /*
if (dealCards !== null) {
   [cardA,cardB] = dealCards; // Assign cardA here
   console.log("Carta A:", cardA);
   console.log("Carta B:", cardB);
   console.log("Deck restante:", baralho);
 } else {
   console.log("Não há cartas suficientes para distribuir duas cartas.");
 }
 
 if (cardA && cardB) {
    return (
      <div>
        <Card suit={cardA.suit} rank={cardA.rank} />
        <Card suit={cardB.suit} rank={cardB.rank} />
      </div>
    );
  } else {
    return <p>Não há cartas suficientes para renderizar.</p>;
  }
};*/