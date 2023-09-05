import { Player } from './components/Player';
import { createDeck, dealTwoCards } from "./helpers/BaralhoDealer";

// const players = [
//    {
//       name: 'Player 1',
//       pot: 100,
//       cards: [],
//    }
// ]

const App = () => {
   const baralho = createDeck();
   
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
