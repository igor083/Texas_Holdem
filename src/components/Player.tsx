import React from 'react';
import Card from './Card'; // Certifique-se de importar o Card corretamente

interface PlayerProps {
  name: string;
  pot: number;
  cards: Card[]; // Certifique-se de que cards seja o tipo correto
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
      {/* Renderize as cartas do jogador aqui */}
      <div>
        {cards.map((card, index) => (
          <Card key={index} suit={card.suit} rank={card.rank} />
        ))}
      </div>
    </div>
  );
};

export default Player;
