import styles from "./style.module.scss";
import { playerSize } from "../../helpers/configs";


export interface PlayerType {
  name: string;
  position: {
    x: number,
    y: number
  };
}

export function Player({ name, position }: PlayerType) {
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
      
      {
        [1, 2, 3, 4].map(e => {
          e = e < 2 ? -e : e-1;

          return (
            <img 
              style={{
                left: 30*e+"px", bottom: "-40px", 
                position: "absolute", width: "30px", height: "auto",
                zIndex: 1
              }} 
              src={"/images/back-card.png"} 
            />
          )
        })
      }
      <img 
        style={{
          left: 0+"px", bottom: "-40px", 
          position: "absolute", width: "30px", height: "auto",
          zIndex: 1
        }} 
        src={"/images/back-card.png"} 
      />
      
      
    </div>
  );
}
