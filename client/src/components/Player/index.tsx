import styles from "./style.module.scss";
import { playerSize } from "../../helpers/configs";


export interface Player {
  id: string;
  name: string;
  position: {
    x: number,
    y: number
  };
}

export function Player({ name, position }: Player) {
  //logica para o jogador


  return (
    <div
      className={styles.player}
      style={{
        width: playerSize.width+"px",
        height: playerSize.height+"px",

        left: position.x+"px",
        top: position.y+"px",

      }}
    >
      <img className={styles.playerImage} src={"/images/player.png"} />

      <div className={styles.betAmount}>R$200</div>

      <div className={styles.name}>{name}</div>

      <img className={styles.backCard} src={"/images/back-card.png"} />

      <div className={styles.currentBet}>
        <img src={"/images/coin.png"} />
        R$200
      </div>

    </div>
  );
}
