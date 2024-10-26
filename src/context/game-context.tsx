// src/context/GameContext.tsx
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Card } from '../types';

type GameContextType = {
  turns: number;
  bestScore: number;
  loading: boolean;
  showResults: boolean;
  cards: Card[];
  selectedCard1: Card | null;
  selectedCard2: Card | null;
  disable: boolean;
  isBestScore: boolean;
  handleSelectedCard: (card: Card) => void;
  // restartGame: () => void;
  shuffleCards: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [turns, setTurns] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(() => {
    // TODO: Get bestScore from localStorage
    const storedBestScore = localStorage.getItem('bestScore');
    return storedBestScore ? JSON.parse(storedBestScore) : 0;
  });

  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [cardUrl, setCardUrl] = useState<{ src: Card['src'] }[]>([]);
  const [selectedCard1, setSelectedCard1] = useState<Card | null>(null);
  const [selectedCard2, setSelectedCard2] = useState<Card | null>(null);
  const [disable, setDisable] = useState(false);
  const [isBestScore, setIsBestScore] = useState(false);

  // TODO: Fetch images for the game board.
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const images = [];
        for (let i = 0; i < 8; i++) {
          const response = await fetch(`https://picsum.photos/200?random=${i}`);
          images.push({ src: response.url });
        }
        setCardUrl(images);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const shuffleCards = () => {
    const shuffledCards = [...cardUrl, ...cardUrl]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }));
    setCards(shuffledCards);
    setTurns(0);
    setSelectedCard1(null);
    setSelectedCard2(null);
    setShowResults(false);
  };

  useEffect(() => {
    if (cardUrl.length > 0) {
      shuffleCards();
    }
  }, [cardUrl]);

  const handleSelectedCard = (card: Card) => {
    if (!disable) {
      selectedCard1 ? setSelectedCard2(card) : setSelectedCard1(card);
    }
  };

  // TODO: Logic to handle resetting selected card.
  const resetSelectedCards = () => {
    setSelectedCard1(null);
    setSelectedCard2(null);
    setDisable(false);
  };

  const resetTurn = () => {
    setTurns((prev) => prev + 1);
    resetSelectedCards();
  };
  // TODO: Comparing selectedCard card one with selectedCard card two.
  useEffect(() => {
    if (selectedCard1 && selectedCard2) {
      setDisable(true);
      if (selectedCard1.src === selectedCard2.src) {
        setCards((prev) =>
          prev.map((card) =>
            card.src === selectedCard1.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [selectedCard1, selectedCard2]);

  // TODO: Function to compare counts with best score
  const updateBestScore = () => {
    if (turns > 0 && turns < bestScore) {
      setIsBestScore(true);
      setBestScore(turns);
    } else if (turns >= bestScore) {
      setIsBestScore(false);
    }
  };
  // TODO: Save bestScore to localStorage when isBestScore changes
  useEffect(() => {
    if (isBestScore)
      localStorage.setItem('bestScore', JSON.stringify(bestScore));
  }, [isBestScore]);

  // useEffect(() => {
  //   localStorage.setItem('bestScore', JSON.stringify(bestScore));
  // }, [bestScore]);

  // TODO: Update bestScore if the current turns are a valid score and lower than the existing bestScore
  useEffect(() => {
    const allCardsMatched = cards.every((card) => card.matched);
    if (allCardsMatched) {
      updateBestScore();
      setShowResults(true);
    }
  }, [cards]);

  return (
    <GameContext.Provider
      value={{
        turns,
        bestScore,
        isBestScore,
        loading,
        showResults,
        cards,
        selectedCard1,
        selectedCard2,
        disable,
        handleSelectedCard,
        shuffleCards,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
