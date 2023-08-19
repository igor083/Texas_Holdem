import React, { Component } from 'react';

// Defina o tipo das props do componente
type CardsProps = {
  suit: string;
  rank: string;
};

class Cards extends Component<CardsProps> {
  render() {
    const { suit, rank } = this.props;

    const urlImage = `../assets/${suit}/${suit}_${rank}.png`; // Caminho para a imagem (ajuste conforme sua estrutura)

    return (
      <div>
        <img src={urlImage} alt={`Carta ${rank} de ${suit}`} />
      </div>
    );
  }
}

export default Cards;
