// type Card = {
//   id: number;
//   src: string;
//   matched: boolean;
// };
// type CardList = {
//   cards: Card[];
// };
// export type { Card, CardList };
// src/types.ts
export interface CardType {
  id: number;
  src: string;
  isFlipped: boolean;
  isMatched: boolean;
}
