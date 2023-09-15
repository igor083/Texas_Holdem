import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { Room, PlayerState } from "./src/types/Types";

const app = express();
const httpServer = createServer(app);
const io = new Server(
  httpServer,
  {cors: { origin: "*" }}
);

const rooms: Room[] = [
  {
    id: "server1",
    name: "server 1",
    players: [],
    ownerId: "1",
    gameStarted: false
  },
  {
    id: "server2",
    name: "server 2",
    players: [],
    ownerId: "1",
    gameStarted: false
  }
]

function deletePlayer(playerId: string) {
  for (const room of rooms) {
    for (const i in room.players) {
      if (room.players[Number(i)].id === playerId) {
        console.log("[delete player]: ", room.players[Number(i)]);
        room.players.splice(Number(i), 1);
      }
    }
  }
}

function getRoomByPlayerId(playerId: string) {
  for (const room of rooms) {
    for (const player of room.players) {
      if (player.id === playerId) {
        return room;
      }
    }
  }
}


app.use(cors({
  origin: "http://localhost:5173"
}));


setInterval(() => {
  console.log("[all players]: ", rooms.map(room => room.players));
}, 2000);

io.on("connection", socket => {
  console.log("Conected!");

  socket.on("disconnect", () => {
    const room = getRoomByPlayerId(socket.id);    

    deletePlayer(socket.id);

    
    if (room) {
      if (room?.ownerId === socket.id && room.players.length > 0) {
        room.ownerId = room.players[0].id;
        io.to(room.id).emit("[lobby] update-owner", room.ownerId);
      }
      io.to(room.id).emit("[lobby] update-players", room.players);
    }
  });

  socket.on("new-player", (playerState: PlayerState) => {
    console.log("[new player]", playerState);

    rooms.forEach(room => {
      // alterar no array original
      if (room.id === playerState.roomId) {
        if (room.players.length === 0) room.ownerId = socket.id;

        room.players.push({
          id: socket.id,
          name: playerState.name,
          profilePictureIndex: playerState.profilePictureIndex
        });

        socket.join(room.id);

        socket.broadcast.to(room.id).emit("[lobby] update-players", room.players);
        socket.emit("[lobby] initial-data", room);
      }
    })

  })
});



// Routes

app.get("/rooms", (request, response) => {
  try {
    return response.json(rooms);

  } catch(e) {
    return response.status(500).json({error: "Erro ao buscar salas"})
  }
});


httpServer.listen(8080, () => console.log("Server running on port 8080"));