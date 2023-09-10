import styles from "./style.module.scss";
import { Room, useSocket } from "../../hooks/useSocket";
import { useState, useEffect } from "react";
import { Modal, Select, Typography, Button, Divider, Spin, Input, Popover, Row, Image } from "antd";


const { Text } = Typography;

export interface Player {
  id: string;
  name: string;
  avatarIndex: number;
}

export function MainModal() {
  const { 
    rooms, setRooms, 
    isSocketLoading, 
    socketConnection, 
  } = useSocket();
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [playerState, setPlayerState] = useState({
    name: localStorage.getItem("username") || "Guest",
    avatarIndex: 1
  });
  console.log(rooms[0])
  const [selectedRoom, setSelectedRoom] = useState<Room>(rooms[0]);

  const currentRoom = rooms.find(room => room.id === selectedRoom?.id);

  console.log(socketConnection?.id)

  function handleEnterOnGame() {
    setIsWaiting(true);
    
    const newPlayer: Player = {
      ...playerState,
      id: String(socketConnection?.id)
    }

    socketConnection?.emit("new-player", newPlayer);

    socketConnection?.emit("enter-room", selectedRoom?.id, (updatedRooms: Room[]) => {
      setRooms(updatedRooms);
    });
  }

  function handleExitGame() {
    setIsWaiting(false);

    socketConnection?.emit("remove-player")
    // Parei aqui
  }

  function handleChangeUsername(name: string) {    
    localStorage.setItem("username", name);
    setPlayerState({ ...playerState, name });
  }

  return (
    <>
      <Modal
        title={<div style={{marginBottom: "1rem"}}>🎲 Poker Online</div>}
        open={!isWaiting}
        closable={false}
        centered={true}
        footer={selectedRoom?.gameStarted
          ? <Text>Essa partida ja iniciou</Text>
          : (
            <Button 
              size="large" 
              type={"primary"} 
              onClick={handleEnterOnGame} 
              loading={isSocketLoading}
            >Entrar na sala</Button>
          )
        }
      >
        <div className={styles.selectAvatarContainer}>
          {
            isSocketLoading ? (
              <Spin className={styles.selectedAvatar} />
            ) : (
              <Popover
                content={
                  <div className={styles.popoverContent}>
                    {
                      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                        .map(i =>
                          <img
                            key={i}
                            onClick={() => setPlayerState({...playerState, avatarIndex: i})}
                            className={styles.imageOption}
                            src={`/profile_pictures/${i}.png`}
                          />
                        )
                    }
                  </div>
                }
                trigger={"click"}
                title={"Escolha um avatar"}
              >                
                <img
                  className={styles.selectedAvatar}
                  src={`/profile_pictures/${playerState.avatarIndex}.png`}
                />
              </Popover>
            )
          }
        </div>

        <Text>Selecione uma sala</Text>

        <Select
          loading={isSocketLoading}
          value={selectedRoom?.id}
          onChange={(_, room) => setSelectedRoom(room as Room)}
          style={{width: "100%", marginTop: "0.25rem"}}
          fieldNames={{label: "name", value: "id"}}
          size={"large"}
          options={rooms.map(room =>
            ({
              ...room,
              name: `${room.name} - ${room.gameStarted ? "Partida em andamento" : ""} 🎮(${room.players.length}/7)`
            })
          )}
          dropdownRender={(defaultMenu) => (
            <>
              {defaultMenu}

              <Divider style={{margin: "8px 0px"}} />

              <div style={{display: "flex", gap: "8px", margin: "6px"}}>
                <Input style={{width: "100%"}} placeholder="Digite o nome da nova sala" />
                <Button type="primary">Criar nova sala</Button>
              </div>
            </>
          )}
        />

        <div style={{marginTop: "0.75rem"}}>
          <Text>Nome de usuário</Text>
          <Input
            placeholder="Digite um nome qualquer"
            style={{marginTop: "0.25rem"}}
            size="large"
            value={playerState.name}
            onChange={({target}) => handleChangeUsername(target.value)}
          />
        </div>

      </Modal>

      <Modal
        open={isWaiting}
        closable={false}
        centered={true}
        title={<Row style={{gap: "0.75rem"}} align={"middle"}><Spin size="default"/>Aguardando dono da sala iniciar a partida</Row>}
        footer={
          <>
            <Button onClick={handleExitGame}>Sair da sala</Button>
            {  
              currentRoom?.ownerId === socketConnection?.id ? (
                <Button type="primary">Iniciar Partida</Button>
              ) : <></>
            }
          </>
        }
      >
        <div className={styles.modalContentWaitingPlayerContainer}>
          {
            currentRoom?.players.map(e => 
              <Row align={"middle"} className={styles.playerContainer}>
                <Image width={"40px"} src={`/profile_pictures/${e.avatarIndex}.png`} />
                {e.name}
                {
                  currentRoom.ownerId === e?.id ? <span className={styles.owner}>dono</span> : ""
                }
              </Row>
            )
          }
        </div>
      </Modal>
    </>
  )
}