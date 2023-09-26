import { useSelector } from "react-redux";
import { PokerState } from "../../../store/poker";

import Deck from "./Deck/Deck";
import PlayerInfo from "./PlayerInfo/PlayerInfo";

import styles from "./Table.module.scss";

const Table = () => {
  const { folded, currentPlayers, winners } = useSelector((state: { poker: PokerState }) => state.poker);

  return (
    <div className={styles.table}>
      <img className={styles.myTable} src={`${process.env.PUBLIC_URL}/assets/table.png`} alt="" />
      <div className={styles.players}>
        {
          currentPlayers.map((p) => (
            <PlayerInfo
              key={p.id}
              id={p.id}
              name={p.name}
              balance={p.balance}
              type={p.type}
              order={p.order}
              currentBet={p.currentBet}
              hand={p.hand}
              folded={folded.includes(p.id)}
              winners={winners}
              blind={p.blind}
            />
          ))
        }
      </div>
      <Deck></Deck>
    </div>
  );
};

export default Table;
