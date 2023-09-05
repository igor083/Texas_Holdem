import { ReactNode } from "react";
// Defina o tipo das props do componente
type CardProps = {
   suit: string; // naipe
   rank: number; // numero ou nome

};


function Card({ suit, rank }: CardProps): ReactNode {
   var urlImage = () => {
      var urlImage
      if (rank == 1) {
         return urlImage = `../${suit}/${suit}_${"a"}.png`; // caminho pode precisar ser corrigido
      }
      if (rank == 11) {
         return urlImage = `../${suit}/${suit}_${"j"}.png`; // caminho pode precisar ser corrigido
      }
      if (rank == 12) {
         return urlImage = `../${suit}/${suit}_${"q"}.png`; // caminho pode precisar ser corrigido
      }
      if (rank == 13) {
         return urlImage = `../${suit}/${suit}_${"k"}.png`; // caminho pode precisar ser corrigido
      }
      return urlImage = `../${suit}/${suit}_${rank}.png`; // caminho pode precisar ser corrigido

   };

   return (
      <div>
         <img src={urlImage()} alt={`Carta ${rank} de ${suit}`} />
      </div>
   );
}

export default Card;
