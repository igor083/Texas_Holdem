import { Modal, Button, Typography, Input, Divider } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export interface ClientFormData {
  name: string;
  profilePictureIndex: number;
}

export function Home() {
  const [formData, setFormData] = useState<ClientFormData>({
    name: localStorage.getItem("username") || "Guest",
    profilePictureIndex: 1
  });

  const navigate = useNavigate();

  function handleEnterOnGame() {
    navigate("/game", {
      state: {
        name: formData.name,
        profilePictureIndex: formData.profilePictureIndex
      }
    });
  }

  return (
    <Modal
      title={<div>Poker online <Divider className="my-4" /></div>}
      footer={
        <Button 
          size="large" 
          type={"primary"} 
          onClick={handleEnterOnGame}
        >
          Entrar no jogo
        </Button>
      }
      closable={false}
      open
      centered
    >      
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