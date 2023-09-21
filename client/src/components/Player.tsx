import { Spin } from "antd";

type Hand = [
  { value: number, naipe: number },
  { value: number, naipe: number }
]

export interface PlayerType {
  id: string;
  name: string;
  profilePictureIndex: number;
  isAi: boolean;
  hand: Hand;
  money: number;
  played: PlayType;
  quit: boolean;
  currentBet: number;
  disconnected: boolean;
}

export type PlayType = "check" | "pay" |  "increased" | "all-in" | "quit";

interface PlayerProps extends PlayerType {
  style?: React.CSSProperties;
  isDealer?: boolean;
  isSmallBlind?: boolean;
  isBigBlind?: boolean;
  isTurn?: boolean;
  count?: number;
}

export function Player({
  name, 
  profilePictureIndex, 
  style, money, quit, 
  hand, isDealer, isTurn, 
  count, disconnected, played
}: PlayerProps) {
  
  return (
    

    <div 
      style={{...style}} 
      className={`
        ${quit || disconnected ? "opacity-30" : ""} 
        w-[100px] h-[100px] absolute top-0 left-0
      `}>
      <div>
        <img className={`${isTurn ? "scale-125 border-blue-500 border-4" : ""}  rounded-[50%] w-[100px] h-[100px]`} src={`/profile_pictures/${profilePictureIndex}.png`} />

        <div className="border -top-2 absolute bg-gray-900 rounded-md w-[100%] pr-2 h-min">
          <div className="flex bg-gray-900 rounded-md w-max pr-2">
            <img src={"/images/coin.png"} className="w-[25px] z-10" />
            <div className="text-white z-10">R$ {money}</div>
          </div>

          {
            count ? (
              <div
                className={`
                  absolute top-[50%] right-0 
                  translate-x-[105%] translate-y-[-50%] 
                  flex items-center bg-gray-900 
                  rounded-md px-2 border gap-2
                `}
              >
                <Spin 
                  size="small" 
                />
                <div className="text-white">{count}</div>
              </div>
            ) : ""
          }
        </div>


        <div className="absolute flex w-[100%] -translate-y-[100%]">
          <img className="w-10" src={`/all-cards/${hand[0].value}_${hand[0].naipe}.png`} />
          <img className="w-10" src={`/all-cards/${hand[1].value}_${hand[1].naipe}.png`} />
        </div>

        <div className="border -bottom-1 absolute w-full flex gap-2 bg-gray-900 text-white rounded-md px-2">
          {disconnected ? "DESCONECTADO" : played ? played : name}

          {
            isDealer && (
              <img 
                src={"/images/dealer-button.png"} 
                className="absolute w-8 right-0 top-[50%] -translate-y-[50%] translate-x-[70%]" 
              />
            )
          }
        </div>
      </div>
    </div>
  )
}