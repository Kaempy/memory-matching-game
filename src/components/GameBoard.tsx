// GameBoard.tsx
import { useGameContext } from '../context/game-context';
import Card from './Card';

const GameBoard = () => {
  const { cards, handleCardClick } = useGameContext();
  return (
    <div className="grid gap-3 items-center justify-center grid-cols-4">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
};

export default GameBoard;
