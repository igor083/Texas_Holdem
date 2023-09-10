import { useRef, useContext, createContext, useState, ReactNode, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Socket, io } from "socket.io-client";
import { Player } from "../components/MainModal";

interface ContextProviderType {
  rooms: Room[];
  setRooms(rooms: Room[]): void;
  isSocketLoading: boolean;
  setIsSocketLoading(newValue: boolean): void;
  socketConnection: Socket | null;
  players: Player[];
  setPlayers(players: Player[]): void;
}

export interface Room {
  id: string;
  name: string;
  players: Player[];
  ownerId: string;
  gameStarted: boolean;
}


const SocketContext = createContext({} as ContextProviderType);


export function SocketProvider({ children }: {children: ReactNode}) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  const [isSocketLoading, setIsSocketLoading] = useState<boolean>(false);
  const socketRef = useRef<Socket | null>(null);


  async function updateRooms() {
    try {
      const response = await api.get("/get-rooms");

      if (response.status < 400) {
        setRooms(response.data);
      } else {
        throw new AxiosError;
      }

    } catch(e: unknown) {
      if (e instanceof AxiosError) {
        toast.error(e?.response?.data.error);
      } else {
        toast.error("Ocorreu um erro desconhecido ao buscar salas.")
      }
    }
  }

  // function sleep(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  useEffect(() => {
    const socket = io("http://localhost:8080");
    setIsSocketLoading(true);

    socket.on("connect", async () => {
      console.log("Connected! ", socket.id)
      setIsSocketLoading(false);

      socketRef.current = socket;
    });

    socket.on("new-player", (player: Player, roomId: string) => {
      setRooms(rooms.map(room => 
        room.id == roomId 
          ? {
            ...room,
            players: [...room.players, player]
          } : room
      ));
    });

    updateRooms();
  }, []);

  return (
    <SocketContext.Provider value={{
      isSocketLoading, setIsSocketLoading,
      rooms, setRooms,
      socketConnection: socketRef.current,
      players, setPlayers
    }}>
      {children}
    </SocketContext.Provider>
  )
}


export function useSocket(): ContextProviderType {
  const socketContext = useContext(SocketContext);

  return socketContext;
}
