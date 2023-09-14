import { Modal, Button, Typography, Select, Input, Divider, message } from "antd";
import { useState, useEffect } from "react";
import { RoomType } from "./Room";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

interface FormData {
  name: string;
  profilePictureIndex: number;
  room: {
    all: RoomType[];
    selectedRoomId: string | null;
  }
}

export function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: localStorage.getItem("username") || "Guest",
    profilePictureIndex: 1,
    room: {
      all: [],
      selectedRoomId: null
    }
  });

  const navigate = useNavigate();

  const selectedRoom = formData.room.all.find((e: RoomType) => e.id === formData.room.selectedRoomId)


  async function handleEnterOnRoom() {
    if (formData.room.selectedRoomId === null)
      return message.warning("Selecione uma sala");

    navigate(`/room`, {
      state: {
        name: formData.name,
        profilePictureIndex: formData.profilePictureIndex,
        roomId: formData.room.selectedRoomId
      }
    });
  }

  async function getServerRooms() {
    try {
      const response = await api.get("/rooms");

      if (response.data.error) throw new Error("Error");

      console.log("loaded rooms: ", response.data);

      setFormData({
        ...formData,
        room: {
          ...formData.room,
          all: response.data
        }
      });

      message.success("As as salas foram carregadas.")

    } catch(e) {
      message.error("Ocorreu um erro ao buscar salas.");
    }
  }

  useEffect(() => { getServerRooms() }, []);

  return (
    <Modal
      title={<div>Poker online <Divider className="my-4" /></div>}
      footer={selectedRoom?.gameStarted
        ? <Text>Essa partida ja iniciou</Text>
        : (
          <Button
            size="large"
            type={"primary"}
            onClick={handleEnterOnRoom}
          >Entrar na sala</Button>
        )
      }
      closable={false}
      open
      centered
    >
      <div>
        <Text>Selecione um servidor</Text>
        <Select 
          placeholder="Sevidores disponíveis" 
          size="large" 
          className="w-full mt-1"
          fieldNames={{label: "name", value: "id"}}
          onChange={roomId => setFormData({
            ...formData,
            room: {
              ...formData.room,
              selectedRoomId: roomId
            }
          })}
          options={formData.room.all.map(room => ({
            ...room,
            name: `${room.name} - ${room.gameStarted ? "Partida em andamento" : ""} 🎮(${room.players.length}/7)`
          }))}
        />
      </div>
      
      <div className="mt-4">
        <Text>Nome de usuário</Text>
        <Input 
          className="mt-1" 
          placeholder="Digite um nome" 
          size="large" 
          value={formData.name}
          onChange={({target}) => {
            setFormData({...formData, name: target.value});
            localStorage.setItem("username", target.value);
          }}
        />
      </div>

    </Modal>
  );
}