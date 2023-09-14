
export interface Room {
  id: string;
  name: string;
  players: Player[];
  ownerId: string;
  gameStarted: boolean;
}


export interface Player {
  id: string;
  name: string;
  profilePictureIndex: number;
}


export interface PlayerState {
  name: string;
  profilePictureIndex: number;
  roomId: string;
}