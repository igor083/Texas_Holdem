import styles from "./style.module.scss";
import { tableSize, playerSize } from "../../helpers/configs";


export interface PlayerType {
  name: string;
  tablePos: number;
}

export function Player({ name, tablePos }: PlayerType) {
  //logica para o jogador

  function getTablePosition() {
    const stylePos: React.CSSProperties = {}

    switch (tablePos) {
      case 1:
        stylePos.top = "0px";
        break;
      
      case 2:
        stylePos.top = (tableSize.height/2 - playerSize.height/2) + "px";
        stylePos.left = -playerSize.width/2 + "px";
        break;

      case 3:
        stylePos.top = (tableSize.height - playerSize.height) + "px"; 
        break;
      
      case 4:
        stylePos.top = (tableSize.height - playerSize.height/1.5) + "px";
        stylePos.left = (tableSize.width/3 + playerSize.width/2) + "px";
        break;
      
      case 5:
        stylePos.top = (tableSize.height - playerSize.height) + "px";
        stylePos.left = (tableSize.width - playerSize.width) + "px";
        break;

      case 6:
        stylePos.top = (tableSize.height/2 - playerSize.height/2) + "px";
        stylePos.left = (tableSize.width - playerSize.width + playerSize.width/2) + "px";
        break;

      case 7:
        stylePos.top = "0px";
        stylePos.left = (tableSize.width - playerSize.width) + "px";
        break;
    }


    return stylePos;
  }

  return (
    <div 
      className={styles.player}
      style={{
        ...getTablePosition(), 
        width: playerSize.width+"px",
        height: playerSize.height+"px"
      }}
    >
      {name}
    </div>
  );
}
