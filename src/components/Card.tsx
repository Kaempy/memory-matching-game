// src/components/Card.tsx
import React, { memo } from 'react';
import cardfront from '../assets/card-back.png';
import '../styles/Card.css';
import { CardType } from '../types';
interface CardProps {
  card: CardType;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <div
      className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <img className="card-front" alt="card back" src={cardfront} />
        <img className="card-back" alt={`${card.id}`} src={card.src} />
      </div>
    </div>
  );
};

// TODO: Memoize the card component with a HOC memo allowing the component to only re-render if it's props change.
export default memo(Card);
