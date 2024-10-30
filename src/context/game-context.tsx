import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CardType } from '../types';

type GameContextType = {
  click: number;
  bestScore: number;
  isBestScore: boolean;
  loading: boolean;
  showResults: boolean;
  cards: CardType[];
  handleCardClick: (index: number) => void;
  shuffleCards: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [click, setClick] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isBestScore, setIsBestScore] = useState<boolean>(false);
  const [bestScore, setBestScore] = useState<number>(() => {
    const storedBestScore = localStorage.getItem('bestScore');
    return storedBestScore ? JSON.parse(storedBestScore) : 0;
  });
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  // Function to generate card pairs with images
  const fetchImageUrls = async (count: number): Promise<string[]> => {
    const fetchPromises = Array.from({ length: count }, (_, i) =>
      fetch(`https://picsum.photos/200?random=${i}`).then(
        (response) => response.url
      )
    );
    return Promise.all(fetchPromises);
  };

  const generateCards = async (): Promise<CardType[]> => {
    const imageUrls = await fetchImageUrls(8);
    const cards: CardType[] = [];

    imageUrls.forEach((url, i) => {
      const card1: CardType = {
        id: i * 2,
        src: url,
        isFlipped: false,
        isMatched: false,
      };
      const card2: CardType = {
        id: i * 2 + 1,
        src: url,
        isFlipped: false,
        isMatched: false,
      };
      cards.push(card1, card2);
    });

    return cards.sort(() => Math.random() - 0.5);
  };

  const shuffleCards = async () => {
    setLoading(true);
    const generatedCards = await generateCards();
    setCards(generatedCards);
    setClick(0);
    setShowResults(false);
    setIsBestScore(false);
    setFlippedCards([]);
    setLoading(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    )
      return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedCards((prev) => [...prev, index]);
    setClick((prev) => prev + 1);

    if (flippedCards.length === 1) {
      const firstCard = cards[flippedCards[0]];
      const secondCard = newCards[index];

      if (firstCard.src === secondCard.src) {
        newCards[flippedCards[0]].isMatched = true;
        newCards[index].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          newCards[flippedCards[0]].isFlipped = false;
          newCards[index].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 800);
      }
    }
  };

  // TODO: Function to compare counts with best score
  const updateBestScore = () => {
    if (click > 0 && click < bestScore) {
      setIsBestScore(true);
      setBestScore(click);
    } else if (click >= bestScore) {
      setIsBestScore(false);
    }
  };
  // TODO: Save bestScore to localStorage when isBestScore changes
  useEffect(() => {
    if (isBestScore)
      localStorage.setItem('bestScore', JSON.stringify(bestScore));
  }, [isBestScore]);

  // TODO: Update bestScore if the current turns are a valid score and lower than the existing bestScore
  useEffect(() => {
    const allCardsMatched = cards.every((card) => card.isMatched);
    if (allCardsMatched) {
      updateBestScore();
      setShowResults(true);
    }
  }, [cards]);

  return (
    <GameContext.Provider
      value={{
        cards,
        click,
        bestScore,
        showResults,
        isBestScore,
        loading,
        shuffleCards,
        handleCardClick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context)
    throw new Error('useGameContext must be used within a GameProvider');
  return context;
};
