type Card = {
  id: number;
  src: string;
  matched: boolean;
};
type CardList = {
  cards: Card[];
};
export type { Card, CardList };
