import { CardType } from "../components/Card";



export enum Suit {
   copas = "copas",
   ouros = "ouros",
   paus = "paus",
   espadas = "espadas",
}

export const Rank = {
   Ace: 1,
   Two: 2,
   Three: 3,
   Four: 4,
   Five: 5,
   Six: 6,
   Seven: 7,
   Eight: 8,
   Nine: 9,
   Ten: 10,
   Jack: 11,
   Queen: 12,
   King: 13
}

// Função para criar um baralho completo
export function createDeck(): CardType[] {
   const deck: CardType[] = [];
 
   
   const suits = Object.values(Suit);
   const ranks = Object.values(Rank);

   console.log("ranks: ", ranks)
 
   for (const suit of suits) {
      for (const rank of ranks) {
         deck.push({ suit, rank });
      }
   }
 
   return deck;
 }

// Função para distribuir aleatoriamente duas cartas do deck e removê-las
export function dealTwoCards(deck: CardType[]): CardType[] {

   const firstIndex = Math.floor(Math.random() * deck.length);
   let secondIndex = Math.floor(Math.random() * deck.length);
   
   while (secondIndex === firstIndex) {
      secondIndex = Math.floor(Math.random() * deck.length);
   }

   // Extrai as duas cartas do deck
   const [card1] = deck.splice(firstIndex, 1);
   const [card2] = deck.splice(secondIndex < firstIndex ? secondIndex : secondIndex - 1, 1);

   return [card1, card2];
}
export function dealCommunityCards(deck: CardType[], numberOfCards: number): CardType[] {
   const communityCards: CardType[] = [];

   for (let i = 0; i < numberOfCards; i++) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const [communityCard] = deck.splice(randomIndex, 1);
      communityCards.push(communityCard);
   }
  
   return communityCards;
}