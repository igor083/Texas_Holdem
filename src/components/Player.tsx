import Card from './Card';



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
   //logica para o jogador


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
