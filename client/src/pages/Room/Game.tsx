import { io } from "socket.io-client";
import { Player, PlayerType } from "../../components/Player";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ClientFormData } from "../Home";
import { getPos } from "./helper";
import { Button } from "antd";


interface GameType {
  dealerIndex: number;
  smallBlindIndex: number;
  bigBlindIndex: number;
  playerTurnId: "",
  players: PlayerType[],
  readOnlyPlayers: PlayerType[];
  moneyPots: {
    playersIds: string[];
    betAmount: number;
  }[]
}

export function Game() {
  const {state: clienteFormData}: {state: ClientFormData} = useLocation();
  const [game, setGame] = useState<GameType>({
    dealerIndex: 0,
    smallBlindIndex: 7,
    bigBlindIndex: 6,
    players: [],
    readOnlyPlayers: [],
    playerTurnId: "",
    moneyPots: [],
  });

  function updateGame(newGameData: GameType) {
    console.log("func [updateGame]: ", newGameData);

    setGame(newGameData);
  }

  function newReadOnlyPlayer(newPlayer: PlayerType) {
    console.log("func [updateReadOnlyPlayers]: ", newPlayer);

    setGame(prevState => ({
      ...prevState, 
      readOnlyPlayers: [...prevState.readOnlyPlayers, newPlayer]
    }));
  }

  useEffect(() => {
    const socket = io("http://localhost:8080");

    socket.on("connect", () => {
      console.log("connected!");

      socket.emit("new-player", clienteFormData, (initialGameData: GameType) => {
        if (initialGameData) updateGame(initialGameData);
      });
    });

    socket.on("update-game", (newGameData: GameType) => {
      console.log("sock [update-game]:", newGameData)
      updateGame(newGameData);
    });

    socket.on("new-player", (newPlayer: PlayerType) => {
      newReadOnlyPlayer(newPlayer);
    });

  }, []);


  return (
    <div className="w-[100%] h-[100%] justify-center items-center flex">
      <div className="relative border w-[90%] h-min max-w-[1000px]">
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
              key={player.id}
              profilePictureIndex={player.isAi ? 7 : player.profilePictureIndex}
              name={game.dealerIndex === i ? "dealer" : game.bigBlindIndex === i ? "big-blinder" : game.smallBlindIndex === i ? "small blind" : String(i)}
              id={player.id}
              isAi={player.isAi}
              style={{...getPos(i)}}
              hand={player.hand}
              money={player.money}
            />
          )
        }

        <Button className="absolute -bottom-10" onClick={() => fetch("http://localhost:8080/test")}>Restart</Button>
      </div>
    </div>
  );
}