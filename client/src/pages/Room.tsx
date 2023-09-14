import { useCallback, useEffect, useState } from "react";
import { PlayerType } from "../components/Player";
import { useLocation } from "react-router-dom";
import { Modal, Row, Spin, Image, Divider } from "antd";
import { io } from "socket.io-client";


export interface RoomType {
  id: string;
  name: string;
  players: PlayerType[];
  ownerId: string;
  gameStarted: boolean;
}


interface PlayerState {
  state: {
    name: string;
    profilePictureIndex: number;
    roomId: string;
  }
}

// the game is here
export function Room() {
  const {state: playerState}: PlayerState = useLocation();
  const [roomData, setRoomData] = useState<RoomType>();

  const changeRoomCallback = useCallback((newData: RoomType) => {
    console.log("alterando: ", newData)
    setRoomData(newData);
  }, [setRoomData]);

  useEffect(() => {
    const socket = io("http://localhost:8080");

    socket.on("connect", () => {
      console.log("connected: ", socket.id);

      socket.emit("new-player", {...playerState, id: socket.id});
    });

    socket.on("initial-data", (initialData: RoomType) => {
      console.log("initial data", initialData);
      changeRoomCallback(initialData);
    });

    socket.on("update-players", (updatedPlayers: PlayerType[]) => {
      console.log("update-players", updatedPlayers);

      if (roomData) {
        console.log("roomData", roomData);
        changeRoomCallback({...roomData, players: updatedPlayers });
      }
    });

  }, []);

  return (
    <Modal
      closable={false}
      title={
        <Row style={{gap: "0.75rem"}} align={"middle"}>
          <Spin size="default"/>
          Aguardando dono da sala iniciar a partida
          <Divider style={{margin: "0.5rem 0"}} />
        </Row>
      }
      footer={
        <></>
      }
      centered
      open
    >

      {
        roomData?.players.map(player => 
          <div className={`
            flex items-center gap-2 rounded-md w-max p-2
            bg-[#1a1a1a] hover:brightness-90 cursor-pointer
            relative overflow-hidden
          `}>
            <Image 
              style={{width: "3rem"}} 
              src={`/profile_pictures/${player.profilePictureIndex}.png`} 
            />
            <div className="h-min text-[1.1rem]">{player.name}</div>
            
            {
              roomData.ownerId === player.id && (
                <span className={`
                  absolute top-1 -right-5 rotate-[45deg] bg-orange-500
                  px-4 font-bold
                `}>Dono</span>
              )
            }
          </div>
        )
      }

    </Modal>
  );
}