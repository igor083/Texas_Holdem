import Card from './Card';
import { Suit, Rank, createDeck, dealTwoCards } from "../helpers/BaralhoDealer";


type Card = {
   suit: string;
   rank: number;
}
interface PlayerProps {
   name: string;
   pot: number;
   cards: Card[];
}

const Player: React.FC<PlayerProps> = ({ name, pot, cards }) => {
   const play = () => {
      console.log(`${name} is playing.`);
      // Lógica para as ações do jogador durante o turno
   };

   return (
      <div>
         <h2>{name}</h2>
         <p>Pot: {pot}</p>

         <div>
            {cards.map((card, index) => (
               <Card key={index} suit={card.suit} rank={card.rank} />
            ))}
         </div>
      </div>
   );
};

export default Player;
