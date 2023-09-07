import { useState } from "react";
import { Player, PlayerType } from "../components/Player";
import styles from "./style.module.scss";
import { tableSize, getPlayerPosition } from "../helpers/configs";


export function App() {
  const [players, setPlayers] = useState<PlayerType[]>([]);


  function createPlayer(name?: string) {
    if (!name) {
      const response = window.prompt("Qual o nome? ")

      if (response) name = response;
      else return;
    }

    if (players.length >= 7) {
      alert("O números maximo de players foi atingido");
        
    } else {
      setPlayers([ 
        ...players, 
        { name, position: getPlayerPosition(players.length+1) }
      ]);
    }
  }

  return (
    <div className={styles.table} style={{...tableSize}}>
      <img src={"/images/table.png"} />

      <div className={styles.gameContainer}>
        <button 
          onClick={() => createPlayer()}
          className={styles.createPlayerButton}
        >
          Criar player
        </button>

        {
          players.map(player => <Player {...player} />)
        }
      </div>
    </div>
  )
}











// import { Player } from './components/Player';
// import { createDeck, dealTwoCards } from "./helpers/BaralhoDealer";

// // const players = [
// //    {
// //       name: 'Player 1',
// //       pot: 100,
// //       cards: [],
// //    }
// // ]

// const App = () => {
//    const baralho = createDeck();
  
//    return (
//       <>
//          <div>
//             <Player name={'Joao Sorrisao'} pot={0} cards={dealTwoCards(baralho)} />
//             <Player name={'Sorrisao'} pot={5000} cards={dealTwoCards(baralho)} />
//          </div>
//       </>


//    );
// }


// export default App;
