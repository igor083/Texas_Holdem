import { useContext, createContext, useState, ReactNode, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

interface ContextProviderType {
  rooms: Room[];
  setRooms(rooms: Room[]): void;
}

interface Room {
  id: string;
  name: string;
  playersCount: number;
}


const SocketContext = createContext({} as ContextProviderType);


export function SocketProvider({ children }: {children: ReactNode}) {
  const [rooms, setRooms] = useState<Room[]>([]);

  async function updateRooms() {
    try {
      const response = await api.get("/get-rooms");

      if (response.status < 400) {
        setRooms(response.data);
      }
    } catch(e: unknown) {
      toast.error(e.response.data.error);
    }
  }

  useEffect(() => {
    updateRooms();
  }, []); 

  return (
    <SocketContext.Provider value={{
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
