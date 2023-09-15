import { Modal, Button, Row, Divider, Spin, Image } from "antd";
import { PlayerState, RoomType } from ".";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { PlayerType } from "../../components/Player";


interface WaitingModalProps {
  socket: Socket | undefined;
  roomData: RoomType;
  playerState: PlayerState;
  setRoomData(newValue: React.SetStateAction<RoomType>): void;
}


export function WaitingModal({ roomData, socket, setRoomData, playerState }: WaitingModalProps) {
  const navigate = useNavigate();

  function changeRoomCallback(updatedRoom: RoomType, currentPlayerId?: string) {
    console.log("[changeRoomCallback]: ", updatedRoom);

    if (currentPlayerId) updatedRoom.currentPlayerId = currentPlayerId;
    
    setRoomData(updatedRoom);
  }

  function changeRoomPlayersCallback(newPlayers: PlayerType[]) {
    console.log("[changeRoomPlayersCallback]: ", newPlayers);

    setRoomData(prevState => ({...prevState, players: newPlayers}));
  }

  function updateOwnerId(newId: string) {
    console.log("[updateOwnerId]: ", newId);
    setRoomData(prevState => ({...prevState, ownerId: newId}));
  }


  useEffect(() => {    
    
    if (socket) {
      socket?.connect();

      console.log("current: ", socket)
    
      socket?.on("connect", () => {
        console.log("connected: ", socket.id);
  
        socket.emit("new-player", {...playerState.state, id: socket.id});
      });
  
      socket?.on("[lobby] initial-data", (initialData: RoomType) => {
        console.log("[initial data]: ", initialData);
        changeRoomCallback(initialData, socket.id);
      });
  
      socket?.on("[lobby] update-players", (updatedPlayers: PlayerType[]) => {
        console.log("[update-players]: ", updatedPlayers);
        changeRoomPlayersCallback(updatedPlayers);
      });
  
      socket?.on("[lobby] update-owner", (newOwnerId: string) => {
        console.log("[update-room-owner]: ", newOwnerId);
        updateOwnerId(newOwnerId);
      });
    }

    return () => {
      socket?.off("connect");
      socket?.off("[lobby] initial-data");
      socket?.off("[lobby] update-players");
      socket?.off("[lobby] update-owner")
    }
  }, [socket]);

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
        <>
          <Button onClick={() => navigate("/")}>Sair da sala</Button>
          {
            roomData.ownerId === roomData.currentPlayerId && (
              <Button>Iniciar partida</Button>
            ) 
          }
        </>
      }
      centered
      open
    >

      {
        roomData?.players.map(player => 
          <div 
            className={`
              flex items-center gap-2 rounded-md w-max p-2
              bg-[#1a1a1a] hover:brightness-90 cursor-pointer
              relative overflow-hidden
            `}
            key={player.id}
          >
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