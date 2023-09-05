import { useEffect, useState } from "react";
import { Player, PlayerType } from "../components/Player";
import styles from "./style.module.scss";


export function App() {
   const [players, setPlayers] = useState<PlayerType[]>([]);

   useEffect(() => {
      setPlayers([
         {name: "usuario 1"},
         {name: "usuario 2"},
         {name: "usuario 3"},
         {name: "usuario 4"}
      ]);
   }, []);


   useEffect(() => {
      if (players.length > 7) {
         alert("O números maximo de players foi atingido");
      }
   }, [players]);

   return (
      <div className={styles.table}>
         <img src={"/images/table.png"} />

         {
            players.map(player => <Player {...player} />)
         }
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
