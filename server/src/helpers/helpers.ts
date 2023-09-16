import { Hand, Player } from "../types/Types";
import { v4 as uuid } from 'uuid';

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateCardHand(): Hand {
  return [
    {value: getRandomNumber(2, 14), naipe: getRandomNumber(1, 4)},
    {value: getRandomNumber(2, 14), naipe: getRandomNumber(1, 4)}
  ]
}

export function generateAIPlayer(): Player {
  return {
    isAi: true,
    id: uuid(),
    money: 20000,
    name: "AI "+uuid().slice(0, 5),
    profilePictureIndex: 3,
    hand: generateCardHand()
  }
}