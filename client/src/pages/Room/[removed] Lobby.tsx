import { useEffect, useState } from "react";
import { PlayerType } from "../../components/Player";
import { useLocation, useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { Game } from "./Game";
import { Button, Divider, Image, Modal, Row, Spin } from "antd";


interface RoomType {
  id: string;
  name: string;
  players: PlayerType[];
  ownerId: string;
  gameStarted: boolean;
}

interface ClientFormData {
  state: {
    name: string;
    profilePictureIndex: number;
    roomId: string;
  }
}

// the game is here
export function Lobby() {
  const clientFormData: ClientFormData = useLocation();
  const [roomData] = useState<RoomType>({
    gameStarted: false,
    id: "",
    name: "",
    players: [],
    ownerId: "-1"
  });
  const [socket, setSocket] = useState<Socket | undefined>();
  const navigate = useNavigate();

  function handleStartGame() {

  }


  useEffect(() => {
    const socketClient: Socket = io("http://localhost:8080", {reconnection: false});

    setSocket(socket);

    socketClient.on("connect", () => {

      const newPlayer: PlayerType = {
        id: socketClient.id,
        name: clientFormData.state.name,
        profilePictureIndex: clientFormData.state.profilePictureIndex
      }
  
      socketClient.emit("new-player", newPlayer, (response: unknown) => {
        console.log("reiceved response: ", response)
      });
    })

    return () => {
      socketClient.disconnect();
    }
  }, []);

  return <>
    {
      roomData.gameStarted ? (
        <Game 
          roomData={roomData} 
          socket={socket}
        />
      ) : (
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
                roomData.ownerId === socket?.id && (
                  <Button onClick={handleStartGame}>Iniciar partida</Button>
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
      )
    }
  </>
}