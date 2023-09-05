import { Card, CardType } from "./Card";


interface PlayerProps {
   name: string;
   pot: number;
   cards: CardType[];
}

export function Player({ name, pot, cards }: PlayerProps) {
   //logica para o jogador

   return (
      <div>
         <h2>{name}</h2>
         <p>Pot: {pot}</p>

         <div>
            {
               cards.map((card, index) =>
                  <Card key={index} suit={card.suit} rank={card.rank} />
               )
            }
         </div>
      </div>
   );
}
