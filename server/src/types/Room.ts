
export interface Room {
  id: string;
  name: string;
  playersCount: number;
  ownerId: number;
  gameStarted: boolean;
}
