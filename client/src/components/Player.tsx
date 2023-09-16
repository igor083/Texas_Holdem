type Hand = [
  { value: number, naipe: number },
  { value: number, naipe: number }
]

export interface PlayerType {
  id: string;
  name: string;
  profilePictureIndex: number;
  isAi?: boolean;
  money: number;
  hand: Hand;
}

interface PlayerProps extends PlayerType {
  style?: React.CSSProperties;
}

export function Player({name, profilePictureIndex, isAi, style, money}: PlayerProps) {


  return (
    <div style={{...style}} className="z-10 w-[100px] h-[100px] absolute top-0 left-0 border">
      <div>
        <img className={`w-[100px] h-[100px]`} src={`/profile_pictures/${profilePictureIndex}.png`} />

        <div className="bg-gray-900 text-white -bottom-1 absolute w-full rounded-md text-center">
          {name + (isAi ? " [AI] " : "")}
        </div>

        <div className="flex -top-2 -left-2 absolute bg-gray-900 rounded-md w-max px-[0.2rem]">
          <img src={"/images/coin.png"} className="w-[25px] z-10" />
          <div className="text-white z-10">R$ {money}</div>
        </div>
      </div>
    </div>
  )
}