import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { Player, Room } from "./src/types/Types";

const app = express();
const httpServer = createServer(app);
const io = new Server(
  httpServer, 
  {cors: { origin: "*" }}
);

const rooms: Room[] = [
  {
    id: "serv112121221",
    name: "server 1",
    players: [],
    ownerId: "1",
    gameStarted: false
  }
]

const players: Player[] = []


app.use(cors({
  origin: "http://localhost:5173"
}));

io.on("connection", socket => {
  console.log("Conected!");
  
  socket.on("enter-room", (roomId, callback) => {
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].id === roomId) {        
        const player = players.find(p => p.id === socket.id);

        if (player) {

          if (rooms[i].players.length === 0)
            rooms[i].ownerId = player.id;

          socket.join(roomId);
          io.to(roomId).emit("new-player", player);
          rooms[i].players.push(player);
        }
      }
    }

    callback(rooms);
  });


  socket.on("new-player", (player: Player) => {
    players.push(player);
  });
});

app.get("/get-rooms", (request, response) => {
  try {
    return response.json(rooms);

  } catch(e) {
    return response.status(500).json({error: "Erro ao buscar salas"})
  }
});


httpServer.listen(8080, () => console.log("Server running on port 8080"));