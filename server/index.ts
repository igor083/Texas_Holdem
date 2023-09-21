import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { ClientFormData, PlayType, Player } from "./src/types/Types";
import { generateAIPlayer, generateCardHand, generateCard } from "./src/helpers/helpers";
import { setTimeout as sleep } from "node:timers/promises";

const app = express();
const httpServer = createServer(app);
const io = new Server(
  httpServer,
  {cors: { origin: "*" }}
);

app.use(cors({
  origin: "http://localhost:5173"
}));

interface ComunityCard {
  naipe: number;
  value: number;
  turned: boolean;
}

interface Game {
  dealerIndex: number;
  smallBlindIndex: number;
  bigBlindIndex: number;
  playerTurnIndex: number;
  players: Player[];
  readOnlyPlayers: Player[];

  moneyPots: {
    playersIndexs: string[];
    betAmount: number;
  }[],

  // flag
  started: boolean;
  minBet: number;

  communityCards: ComunityCard[];
}

const game: Game = {
  minBet: 200,
  dealerIndex: -1,
  smallBlindIndex: -1,
  bigBlindIndex: -1,
  playerTurnIndex: -1,
  players: new Array(8).fill(0).map(() => generateAIPlayer()),
  readOnlyPlayers: [],
  moneyPots: [],
  started: false,
  communityCards: []
}

let timeEvent: NodeJS.Timeout = {} as NodeJS.Timeout;



io.on("connection", socket => {
  console.log("new connection");

  socket.on("new-player", (newPlayerData: ClientFormData, callback) => {
    game.started = true;

    const newPlayer: Player = {
      id: socket.id,
      name: newPlayerData.name,
      money: 20000,
      profilePictureIndex: newPlayerData.profilePictureIndex,
      isAi: false,
      hand: generateCardHand(),
      currentBet: 0,
      disconnected: false,
      quit: false,
      played: false,
      playType: null
    }

    game.readOnlyPlayers.push(newPlayer);

    if (getPlayers().length === 0) {
      restartGame();
    } else {
      io.emit("update-game", game);
    }
  });

  socket.on("receive-play", (newStatus: PlayType, betValue?: number) => {
    if (newStatus === "pay") {
      bet(game.playerTurnIndex, game.minBet, newStatus);
      game.players[game.playerTurnIndex].playType = newStatus;
      game.players[game.playerTurnIndex].played = true;
    }

    else if (newStatus === "check") {
      //
    }

    else if (newStatus === "increased" && betValue) {
      bet(game.playerTurnIndex, betValue, newStatus);
      game.players = game.players.map((p, i) => ({ ...p, played: i === game.playerTurnIndex ? "increased" : null }));
      game.minBet = betValue;
    }

    else if (newStatus === "all-in") {
      //
    }

    io.emit("update-game", game);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected: ", socket.id);
    removePlayerBySocketId(socket.id);
  });
});

function restartGame() {
  updatePlayers();

  updateDealerBigSmall();

  generateCommunityCards();

  nextPlayer();

  io.emit("update-game", game);
}



function removePlayerBySocketId(socketId: string) {
  game.players = game.players.map(p => p.id === socketId ? {...p, disconnected: true} : p);
  game.readOnlyPlayers = game.readOnlyPlayers.filter(p => p.id !== socketId);

  io.emit("update-game", game);
}

/**
 * not updated client automatically
 */
async function nextPlayer() {
  let isCompleteBettingRound = true;

  for (let i = 0; i < game.players.length; i++) {
    const currentLoopPlayer = game.players[i];

    if (currentLoopPlayer.currentBet < game.minBet && !currentLoopPlayer.disconnected) {
      isCompleteBettingRound = false;
      break;
    }
  }

  if (!isCompleteBettingRound) {
    game.playerTurnIndex = game.playerTurnIndex == -1
    ? getOneLessIndexByReference(game.bigBlindIndex)
    : getOneLessIndexByReference(game.playerTurnIndex)

    io.emit("update-game", game);

    const oldStatus = game.players[game.playerTurnIndex].played;
    let limitTime = 10;
  
    const time = setInterval(() => {
      limitTime--;
      io.emit("update-limit-time", limitTime);
  
      if (oldStatus !== game.players[game.playerTurnIndex].played) {
        console.log("Jogoooouu");
        nextPlayer();
        clearInterval(time);
      }
  
      else if (limitTime <= 0) {
        // consider that the player has been disconnected
        clearInterval(time);
        console.log("desconectado");
        game.players = game.players.map((p, i) => i === game.playerTurnIndex ? {...p, disconnected: true} : p);
        nextPlayer();
      }
    }, 1000);
  
  
    // -=-=-=-=-=| por enquanto |=-=-=-=-
    if (game.players[game.playerTurnIndex].isAi) {
      console.log("------------------------------")
      console.log("A IA vai jogar...");
      await sleep(1000);
      AIPlay();
      // nextPlayer();
    }
  } else {
    console.log("não entrei, pois: ", game.players)
    turnCommunityCards();
  }
  
}


function turnCommunityCards() {
  const countTurnedCards = game.communityCards.filter(c => c.turned).length;
  game.players = game.players.map(p => ({...p, played: null}));

  if (countTurnedCards === 0) {
    game.communityCards = game.communityCards.map((card, i) => i < 3 ? ({...card, turned: true}) : card);
    nextPlayer();
  } 
  
  else if (countTurnedCards === 3 || countTurnedCards === 4) {
    game.communityCards = game.communityCards.map((card, i) => 
      i < (countTurnedCards - 1) 
      ? ({...card, turned: true}) 
      : card
    );

    nextPlayer();
  }

  else {
    console.log("fim do jogo")
  }

  io.emit("update-game", game);
}

/**
 * not updated client automatically
 */
function generateCommunityCards() {
  for (let i = 0; i < 5; i++) {
    game.communityCards.push({...generateCard(), turned: false});
  }
}

/**
 * not updated client automatically
 */
function updatePlayers() {
  for (let i = game.readOnlyPlayers.length-1; i >= 0; i--) {
    for(let j = 0; j < game.players.length; j++) {
      if (game.players[j].isAi || game.players[j].disconnected) {
        game.players[j] = game.readOnlyPlayers[i];
        game.readOnlyPlayers.splice(i, 1);
        break;
      }
    }
  }

  // if have space for more players, add IA
  game.players = game.players.map(p => p.disconnected ? generateAIPlayer() : p);
}

/**
 * not updated client automatically
 */
function updateDealerBigSmall() {
  game.dealerIndex = getOneLessIndexByReference(game.dealerIndex);
  game.smallBlindIndex = getOneLessIndexByReference(game.dealerIndex);
  game.bigBlindIndex = getOneLessIndexByReference(game.smallBlindIndex);

  bet(game.smallBlindIndex, game.minBet, "pay");
  bet(game.bigBlindIndex, game.minBet, "pay");
}

/**
 * Not updated client automatically
 */
function bet(playerIndex: number, betValue: number, newStatus: "pay" | "increased") {
  console.log(game.players[playerIndex].name, " apostou ", betValue);

  // const newBetValue = newStatus === "increased" 
  //   ? betValue
  //   : 
  
  game.players[playerIndex].currentBet = betValue;
  game.players[playerIndex].money -= betValue;
  game.players[playerIndex].played = newStatus;
}


function AIPlay() {
  bet(game.playerTurnIndex, game.minBet, "pay");

  io.emit("update-game", game);
}

function getOneLessIndexByReference(reference: number) {
  if (reference <= 0) {
    return 7;
  } else {
    return reference - 1;
  }
}

function getPlayers(): Player[] {
  return game.players.filter(e => !e.isAi);
}



app.get("/restart", (req, res) => {
  restartGame();
  return res.send("OK");
});

app.get("/next-turn", (req, res) => {
  return res.send("OK");
});


httpServer.listen(8080, () => console.log("Server running on port 8080"));