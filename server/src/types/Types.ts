
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
  money: number;
  isAi: boolean;
  hand?: Hand;
}

export interface ClientFormData {
  name: string;
  profilePictureIndex: number;
}