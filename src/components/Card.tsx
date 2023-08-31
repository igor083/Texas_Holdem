import React from 'react';

// Defina o tipo das props do componente
type CardProps = {
  suit: string; // naipe
  rank: string; // numero ou nome
};

const Card: React.FC<CardProps> = ({ suit, rank }) => {
  const urlImage = `../assets/${suit}/${suit}_${rank}.png`; // caminho pode precisar ser corrigido

  return (
    <div>
      <img src={urlImage} alt={`Carta ${rank} de ${suit}`} />
    </div>
  );
};

export default Card;
