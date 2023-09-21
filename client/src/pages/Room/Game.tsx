import { Socket, io } from "socket.io-client";
import { PlayType, Player, PlayerType } from "../../components/Player";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ClientFormData } from "../Home";
import { getPos } from "./helper";
import { Button, InputNumber } from "antd";

interface ComunityCard {
  naipe: number;
  value: number;
  turned: boolean;
}

interface GameType {
  currentPlayerIndex: number;

  minBet: number;
  dealerIndex: number;
  smallBlindIndex: number;
  bigBlindIndex: number;
  playerTurnIndex: number,
  players: PlayerType[],
  readOnlyPlayers: PlayerType[];

  moneyPots: {
    playersIds: string[];
    betAmount: number;
  }[],

  communityCards: ComunityCard[],
}

export function Game() {
  const {state: clienteFormData}: {state: ClientFormData} = useLocation();
  const [game, setGame] = useState<GameType>({
    minBet: 200,
    currentPlayerIndex: -1,
    dealerIndex: -1,
    smallBlindIndex: -1,
    bigBlindIndex: -1,
    playerTurnIndex: -1,
    players: [],
    readOnlyPlayers: [],
    moneyPots: [],
    communityCards: [],
  });
  const [currentTime, setCurrentTime] = useState(10);
  const socketRef = useRef<Socket>();
  const [betValue, setBetValue] = useState(game.minBet);

  function updateGame(newGameData: GameType, socketId: string) {

    const newData: GameType = {
      ...newGameData,
      currentPlayerIndex: newGameData.players.concat(newGameData.readOnlyPlayers).findIndex(p => p.id === socketId)
    }

    console.log("func [updateGame]: ", newData);
    setGame(newData);
  }

  useEffect(() => {
    const socket = io("http://localhost:8080");

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("connected!");

      socket.emit("new-player", clienteFormData);
    });

    socket.on("update-game", (newGameData: GameType) => {
      updateGame(newGameData, socket.id);
    });

    socket.on("update-limit-time", (newTime: number) => {  
      setCurrentTime(newTime);
    });

  }, []);

  function handlePlay(newStatus: PlayType) {
    if (newStatus === "pay") {
      socketRef.current?.emit("receive-play", "pay");
    } 
    
    else if (newStatus === "check") {
      //
    }

    else if (newStatus === "increased") {
      socketRef.current?.emit("receive-play", "increased", betValue);
    }

    else if (newStatus === "all-in") {
      //
    } 

    else if (newStatus === "quit") {
      //
    }
  }


  return (
    <div className="w-[100%] h-[100%] justify-center items-center flex">
      <div className="relative  w-[90%] h-min max-w-[1000px]">
        <img src={"/images/table.png"} className="w-[100%]" />

        {
          game.readOnlyPlayers.map((player, i) => 
            <div key={i} className={`absolute left-[calc(${i+1}*100px)] top-[20px] translate-y-[-150%]`}>
              <img 
                className={`w-[3rem]`} 
                src={"/profile_pictures/"+player.profilePictureIndex+".png"} 
              />
              <div className="text-white">{player.name}</div>
            </div>
          )
        }

        {
          game.players.map((player, i) =>
            <Player
              {...player}
              key={player.id}
              profilePictureIndex={player.isAi ? 7 : player.profilePictureIndex}
              // name={
              //   player.name+"; "+(game.dealerIndex === i ? "[DEALER]; " : game.bigBlindIndex === i ? "[BIG]; " : game.smallBlindIndex === i ? "[SMALL]; " : "")
              //   + ("pos: "+i+"; ")
              //   + (game.playerTurnIndex === i ? "VEZ DE; "+"time: "+currentTime+"; " : "")
              // }
              name={player.name}
              style={{...getPos(i)}}
              isDealer={game.dealerIndex === i}
              isTurn={game.playerTurnIndex === i}
              count={game.playerTurnIndex === i ? currentTime : undefined}
            />
          )
        }

        <Button className="absolute -bottom-10" onClick={() => fetch("http://localhost:8080/restart")}>Restart</Button>
        <Button className="absolute -bottom-10 left-20" onClick={() => fetch("http://localhost:8080/next-turn")}>Proximo jogador</Button>

        {
          // game.playerTurnIndex === game.currentPlayerIndex && (
          game.playerTurnIndex === game.currentPlayerIndex && (
            <div className="absolute flex gap-2 right-0 -bottom-[50px]">
              <InputNumber 
                placeholder="Valor da aposta" 
                type={"number"} 
                value={betValue}
                onChange={value => setBetValue(Number(value))} 
              />
              <Button onClick={() => handlePlay("pay")}>Pagar</Button>
              <Button onClick={() => handlePlay("increased")}>Aumentar</Button>
              <Button onClick={() => handlePlay("check")}>Passar</Button>
              <Button onClick={() => handlePlay("quit")}>Desistir</Button>
            </div>
          )
        }

        <div className="border w-full h-full">
          {

            game.communityCards.map((card, i) =>
              <img 
                key={i}
                className={`
                  absolute top-[60%] translate-y-[-100%]
                  w-28
                `} 
                style={{ left: `${(i+1)*15}%` }}
                src={card.turned ? `/all-cards/${card.value}_${card.naipe}.png` : "/images/back-one-card.png"} 
              />
            )
          }
        </div>
      </div>
    </div>
  );
}