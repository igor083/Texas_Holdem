
export interface Room {
  id: string;
  name: string;
  players: Player[];
  ownerId: string;
  gameStarted: boolean;
}


export type Hand = [
  { value: number, naipe: number },
  { value: number, naipe: number }
]

export interface Player {
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

export type PlayType = "check" | "pay" |  "increased" | "all-in" | "quit" | null;

export interface ClientFormData {
  name: string;
  profilePictureIndex: number;
}