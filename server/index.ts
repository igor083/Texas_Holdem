import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { Room, ClientFormData, Player } from "./src/types/Types";
import { generateAIPlayer, getRandomNumber } from "./src/helpers/helpers";

const app = express();
const httpServer = createServer(app);
const io = new Server(
  httpServer,
  {cors: { origin: "*" }}
);

app.use(cors({
  origin: "http://localhost:5173"
}));

// setInterval(() => {
//   console.log("[all players]: ", game.players);
// }, 2000);

interface Game {
  dealerIndex: number;
  smallBlindIndex: number;
  bigBlindIndex: number;
  playerTurnId: string;
  players: Player[];
  readOnlyPlayers: Player[];
  moneyPots: {
    playersIds: string[];
    betAmount: number;
  }[],
  started: boolean;
}

const game: Game = {
  dealerIndex: 0,
  smallBlindIndex: 7,
  bigBlindIndex: 6,
  playerTurnId: "",
  players: new Array(8).fill(0).map(() => generateAIPlayer()),
  readOnlyPlayers: [],
  moneyPots: [],
  started: false
}


io.on("connection", socket => {
  console.log("new connection");

  socket.on("new-player", (newPlayerData: ClientFormData, callback) => {
    game.started = true;

    const newPlayer = {
      id: socket.id,
      name: newPlayerData.name,
      money: 20000,
      profilePictureIndex: newPlayerData.profilePictureIndex,
      isAi: false
    }

    game.readOnlyPlayers.push(newPlayer);
    socket.join("read-only");


    if (getPlayers().length === 0) {
      restarGame();
    } else { 
      callback(game);
      socket.broadcast.emit("new-player", newPlayer);
    }
  });


});


// Os players só poderão ser adicionar após o fim do round
// [1, 2, 3, 4, 5]


function restarGame() {
  for (let i = game.readOnlyPlayers.length-1; i >= 0; i--) {
    for(let j = 0; j < game.players.length; j++) {
      if (game.players[j].isAi) {
        game.players[j] = game.readOnlyPlayers[i];
        game.readOnlyPlayers.splice(i, 1);
        break;
      }
    }
  }

  game.dealerIndex = game.dealerIndex >= 7 ? 0 : game.dealerIndex += 1;
  game.smallBlindIndex = game.dealerIndex === 0 ? 7 : game.dealerIndex - 1;
  game.bigBlindIndex = game.smallBlindIndex === 0 ? 7 : game.smallBlindIndex - 1;

  io.emit("update-game", game);
}


function getPlayers(): Player[] {
  return game.players.filter(e => !e.isAi);
}


app.get("/test", (req, res) => {
  restarGame();
  res.send("ok");
})


httpServer.listen(8080, () => console.log("Server running on port 8080"));