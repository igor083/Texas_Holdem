import { ReactNode } from "react";
// Defina o tipo das props do componente
type CardProps = {
  suit: string; // naipe
  rank: string; // numero ou nome
};

function Card({ suit, rank }: CardProps): ReactNode {
  const urlImage = `../${suit}/${suit}_${rank}.png`; // caminho pode precisar ser corrigido

  return (
    <div>
      <img src={urlImage} alt={`Carta ${rank} de ${suit}`} />
    </div>
  );
}

export default Card;
