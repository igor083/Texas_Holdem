export interface CardType {
   suit: string; // naipe
   rank: number; // numero ou nome
}


export function Card({ suit, rank }: CardType) {
   function getUrlImage() {
      if (rank == 1) {
         return `../${suit}/${suit}_${"a"}.png`; // caminho pode precisar ser corrigido
      }
      if (rank == 11) {
         return `../${suit}/${suit}_${"j"}.png`; // caminho pode precisar ser corrigido
      }
      if (rank == 12) {
         return `../${suit}/${suit}_${"q"}.png`; // caminho pode precisar ser corrigido
      }
      if (rank == 13) {
         return `../${suit}/${suit}_${"k"}.png`; // caminho pode precisar ser corrigido
      }
      return `../${suit}/${suit}_${rank}.png`; // caminho pode precisar ser corrigido

   }

   return (
      <div>
         <img src={getUrlImage()} alt={`Carta ${rank} de ${suit}`} />
      </div>
   );
}