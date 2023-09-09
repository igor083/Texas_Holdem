import { useContext, createContext, useState, ReactNode, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface ContextProviderType {
  rooms: RoomProviderValue;
  setRooms(rooms: RoomProviderValue): void;
  isSocketLoading: boolean;
  setIsSocketLoading(newValue: boolean): void;
}

interface RoomProviderValue {
  selectedRoom: null | Room;
  rooms: Room[];
}

export interface Room {
  id: string;
  name: string;
  playersCount: number;
  ownerId: number;
  gameStarted: boolean;
}


const SocketContext = createContext({} as ContextProviderType);


export function SocketProvider({ children }: {children: ReactNode}) {
  const [rooms, setRooms] = useState<RoomProviderValue>({
    selectedRoom: null,
    rooms: []
  });
  const [isSocketLoading, setIsSocketLoading] = useState<boolean>(false);

  async function updateRooms(initialUpdate: boolean = false) {
    setIsSocketLoading(true);
    try {
      const response = await api.get("/get-rooms");

      if (response.status < 400) {
        setRooms({ 
          rooms: response.data, 
          selectedRoom: initialUpdate ? response.data[0] : rooms.selectedRoom
        });
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
    setIsSocketLoading(false);
  }

  useEffect(() => {
    // initial update
    updateRooms(true);
  }, []);

  return (
    <SocketContext.Provider value={{
      isSocketLoading, setIsSocketLoading,
      rooms, setRooms
    }}>
      {children}
    </SocketContext.Provider>
  )
}


export function useSocket(): ContextProviderType {
  const socketContext = useContext(SocketContext);

  return socketContext;
}
