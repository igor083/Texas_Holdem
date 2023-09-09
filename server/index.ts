import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { Room } from "./src/types/Room";

const app = express();
const httpServer = createServer(app);
const io = new Server(
  httpServer, 
  {cors: { origin: "*" }}
);

const fakeRooms: Room[] = [
  {
    id: "2323232",
    name: "server 1",
    playersCount: 20
  },
  {
    id: "18181818",
    name: "server 2",
    playersCount: 10
  }
]


app.use(cors({
  origin: "http://localhost:5173"
}));

io.on("connection", socket => {
  console.log("Conected!");

  socket.on("get-rooms", () => {

  })
});

app.get("/get-rooms", (request, response) => {
  try {
    throw "ola";
    return response.json(fakeRooms);

  } catch(e) {
    return response.status(500).json({error: "Erro ao buscar salas"})
  }
});


httpServer.listen(8080, () => console.log("Server running on port 8080"));