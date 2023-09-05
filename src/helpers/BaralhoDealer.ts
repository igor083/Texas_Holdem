import Card from "../components/Card";

export enum Suit {
   copas = "copas",
   ouros = "ouros",
   paus = "paus",
   espadas = "espadas",
}

export enum Rank {
   Ace = "1",
   Two = "2",
   Three = '3',
   Four = '4',
   Five = '5',
   Six = '6',
   Seven = '7',
   Eight = '8',
   Nine = '9',
   Ten = '10',
   Jack = '11',
   Queen = '12',
   King = '13',
}

// Defina uma interface para representar uma carta
export interface Card {
   suit: Suit;
   rank: Rank;
}

// Função para criar um baralho completo
export function createDeck(): Card[] {
   const deck: Card[] = [];
 
   
   const suits = Object.values(Suit);
   const ranks = Object.values(Rank);
 
   for (const suit of suits) {
     for (const rank of ranks) {
       deck.push({ suit, rank });
     }
   }
 
   return deck;
 }

// Função para distribuir aleatoriamente duas cartas do deck e removê-las
export function dealTwoCards(deck: Card[]): [Card, Card] {

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
export function dealCommunityCards(deck: Card[], numberOfCards: number): Card[] {
   const communityCards: Card[] = [];

   for (let i = 0; i < numberOfCards; i++) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const [communityCard] = deck.splice(randomIndex, 1);
      communityCards.push(communityCard);
   }
  
   return communityCards;
}