import { useEffect, useState } from "react";
import { PlayerType } from "../../components/Player";
import { useLocation } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { WaitingModal } from "./WaitingModal";
import { Game } from "./Game";


export interface RoomType {
  id: string;
  name: string;
  players: PlayerType[];
  ownerId: string;
  gameStarted: boolean;
  currentPlayerId: string;
}

export interface PlayerState {
  state: {
    name: string;
    profilePictureIndex: number;
    roomId: string;
  }
}

// the game is here
export function Room() {
  const playerState: PlayerState = useLocation();
  const [roomData, setRoomData] = useState<RoomType>({
    gameStarted: false,
    id: "",
    name: "",
    players: [],
    ownerId: "-1",
    currentPlayerId: ""
  });

  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    const socket: Socket = io("http://localhost:8080", {reconnection: false, autoConnect: false});

    setSocket(socket);

    return () => {
      socket.disconnect();
    }
  }, []);


  if (roomData.gameStarted)
    return <Game />

  else
    return (
      <WaitingModal
        socket={socket}
        setRoomData={setRoomData}
        roomData={roomData}
        playerState={playerState}
      />
    );
}