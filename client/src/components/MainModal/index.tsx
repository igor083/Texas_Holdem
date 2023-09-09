import styles from "./style.module.scss";
import { useSocket } from "../../hooks/useSocket";
import { useState } from "react";

import { X } from "lucide-react";


export function MainModal() {
  const { rooms } = useSocket();
  const [selectedRoom, setSelectedRoom] = useState<string>();

  function handleChangeRoom(element: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedRoom(element.target.value)
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.bgBlur}></div>

      <div className={styles.content}>
        {/* <X className={styles.closeIcon}/> */}

        <select onChange={handleChangeRoom} value={selectedRoom}>
          <option selected disabled>Selecione um server</option>
          {
            rooms.map(room => 
              <option key={room.id}>{room.name}</option>)
          }
        </select>

        <button>Entrar no jogo</button>
      </div>
    </div>
  )
}