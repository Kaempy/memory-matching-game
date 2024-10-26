// Card.tsx
import { memo } from 'react';
import cardBack from '../assets/card-back.png';
import '../styles/Card.css';
import { Card as CardType } from '../types';

type Props = {
  data: CardType;
  handleSelectedCard: (card: CardType) => void;
  flipped: boolean;
  disable: boolean;
};

const Card = ({
  data: { id, src, matched },
  handleSelectedCard,
  flipped,
  disable,
}: Props) => {
  const handleClick = () => {
    if (!disable && !flipped) {
      handleSelectedCard({ id, src, matched });
    }
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <div className={`card ${flipped ? 'flipped' : ''}`}>
        <div className="front">
          <img
            src={src}
            alt={`card front ${id}`}
            className="rounded-md w-full object-contain"
          />
        </div>
        <div className="back">
          <img
            src={cardBack}
            alt="card back"
            className="rounded-md w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

// TODO: Memoize the card component with a HOC memo allowing the component to only re-render if it's props change.
export default memo(Card);
