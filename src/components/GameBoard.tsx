// GameBoard.tsx
import { Fragment } from 'react';
import { useGameContext } from '../context/game-context';
import Card from './Card';

const GameBoard = () => {
  const { cards, handleSelectedCard, selectedCard1, selectedCard2, disable } =
    useGameContext();
  return (
    <Fragment>
      {/* TODO: Rendering the cards content in a list to display all the data and adding a key for the unique identifier for each card.*/}
      {cards.map((card) => (
        <Card
          key={card.id}
          data={card}
          handleSelectedCard={handleSelectedCard}
          flipped={
            card === selectedCard1 || card === selectedCard2 || card.matched
          }
          disable={disable}
        />
      ))}
    </Fragment>
  );
};

export default GameBoard;

// import { Fragment } from 'react';
// import { CardList, Card as CardType } from '../types';
// import Card from './Card';

// type Props = {
//   cards: CardList['cards'];
//   handleSelectedCard: (card: CardType) => void;
//   selectedCard1: CardType | null;
//   selectedCard2: CardType | null;
//   disable: boolean;
// };

// const GameBoard = ({
//   cards,
//   handleSelectedCard,
//   selectedCard1,
//   selectedCard2,
//   disable,
// }: Props) => {

//   return (
//     <Fragment>
//       {/* TODO: Rendering the cards content in a list to display all the data and adding a key for the unique identifier for each card.*/}
//       {cards.map((card) => (
//         <Card
//           key={card.id}
//           data={card}
//           handleSelectedCard={handleSelectedCard}
//           flipped={
//             card === selectedCard1 || card === selectedCard2 || card.matched
//           }
//           disable={disable}
//         />
//       ))}
//     </Fragment>
//   );
// };

// export default GameBoard;
