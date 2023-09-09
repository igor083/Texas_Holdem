import { Room, useSocket } from "../../hooks/useSocket";
import { useState } from "react";
import { Modal, Select, Typography, Button, Divider, Spin, Input } from "antd";

const { Text } = Typography;

export function MainModal() {
  const { rooms, setRooms, isSocketLoading } = useSocket();
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  function handleChangeRoom(room: Room) {
    setRooms({ ...rooms, selectedRoom: room });
  }

  function handleEnterOnGame() {
    setIsWaiting(true);
  }

  return (
    <>
      <Modal
        title={"🎲 Poker Online"}
        open={!isWaiting}
        closable={false}
        centered={true}
        footer={() => rooms.selectedRoom?.gameStarted
          ? <Text>Essa partida ja iniciou</Text>
          : <Button type={"primary"} onClick={handleEnterOnGame}>Entrar na Sala</Button>
        }
      >
        <Text>Selecione uma sala</Text>

        <Select
          loading={isSocketLoading}
          value={rooms.selectedRoom?.id}
          onChange={(_, room: Room) => handleChangeRoom(room)}
          options={rooms.rooms.map(room =>
            ({
              ...room,
              name: `${room.name} - ${room.gameStarted ? "Partida em andamento" : ""} 🎮(${room.playersCount}/7)`
            })
          )}
          style={{width: "100%"}}
          fieldNames={{label: "name", value: "id"}}
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
          <Input placeholder="Digite um nome qualquer" />
        </div>

      </Modal>

      <Modal
        open={isWaiting}
      >
        <Spin size="large"/>
      </Modal>
    </>
  )
}