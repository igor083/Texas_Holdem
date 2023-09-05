import styles from "./style.module.scss";


export interface PlayerType {
  name: string;
}

export function Player({ name }: PlayerType) {
  //logica para o jogador

  return (
    <div className={styles.playerContainer}>
      {name}
    </div>
  );
}
