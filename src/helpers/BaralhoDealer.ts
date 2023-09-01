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
 
   // Usamos Object.values para obter todas as chaves do enum Suit
   const suits = Object.values(Suit);
   const ranks = Object.values(Rank);
 
   for (const suit of suits) {
     for (const rank of ranks) {
       deck.push({ suit, rank });
     }
   }
 
   return deck;
 }
 
 const fullDeck = createDeck();
 console.log(fullDeck);

// Função para distribuir aleatoriamente duas cartas do deck e removê-las// Função para distribuir aleatoriamente duas cartas do deck e removê-las
export function dealTwoCards(deck: Card[]): [Card, Card] | null {
   if (deck.length < 2) {
     // Certifique-se de que haja pelo menos duas cartas no deck
     return null;
   }
 
   const firstIndex = Math.floor(Math.random() * deck.length);
   let secondIndex = Math.floor(Math.random() * deck.length);
 
   // Garanta que o segundo índice seja diferente do primeiro
   while (secondIndex === firstIndex) {
     secondIndex = Math.floor(Math.random() * deck.length);
   }
 
   // Extraia as duas cartas do deck
   const [card1] = deck.splice(firstIndex, 1);
   const [card2] = deck.splice(secondIndex < firstIndex ? secondIndex : secondIndex - 1, 1);
 
   return [card1, card2];
 }
 
 // Exemplo de uso
 const dealtCards = dealTwoCards(fullDeck);
 
 if (dealtCards !== null) {
   const [cardA, cardB] = dealtCards;
   console.log("Carta A:", cardA);
   console.log("Carta B:", cardB);
   console.log("Deck restante:", fullDeck);
 } else {
   console.log("Não há cartas suficientes para distribuir duas cartas.");
 }
 