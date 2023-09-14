import { useRef, useContext, createContext, useState, ReactNode, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Socket, io } from "socket.io-client";
import { Player } from "../components/MainModal";

interface ContextProviderType {
  rooms: RoomType[];
  setRooms(rooms: RoomType[]): void;
  isSocketLoading: boolean;
  setIsSocketLoading(newValue: boolean): void;
  socketConnection: Socket | null;
  players: Player[];
  setPlayers(players: Player[]): void;
}

export interface RoomType {
  id: string;
  name: string;
  players: Player[];
  ownerId: string;
  gameStarted: boolean;
}


const SocketContext = createContext({} as ContextProviderType);


export function SocketProvider({ children }: {children: ReactNode}) {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  const [isSocketLoading, setIsSocketLoading] = useState<boolean>(false);
  const socketRef = useRef<Socket | null>(null);
  const roomsRef = useRef(rooms);



  useEffect(() => {
    setIsSocketLoading(true);
    const socket = io("http://localhost:8080");

    socket.on("connect", async () => {
      console.log("Connected! ", socket.id)

      setIsSocketLoading(false);

      socketRef.current = socket;
    });


  }, []);

  useEffect(() => { roomsRef.current = rooms }, [rooms]);

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
