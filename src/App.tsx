// App.tsx

import { Fragment } from 'react';
import GameBoard from './components/GameBoard';
import GameHeader from './components/GameHeader';
import ResultsScreen from './components/ResultsScreen';
import { useGameContext } from './context/game-context';
import './styles/App.css';
import Loader from './ui/Loader';

function App() {
  const { loading, showResults } = useGameContext();
  return (
    <main className="flex items-center flex-col justify-center">
      {/* TODO: Dynamically displaying the ResultsScreen when the set conditions are met */}
      {showResults && !loading ? (
        <ResultsScreen />
      ) : (
        <Fragment>
          <GameHeader />
          <section
            className={`grid gap-3 items-center justify-center ${
              loading ? 'grid-cols-1' : 'grid-cols-4'
            }`}
          >
            {loading ? <Loader /> : <GameBoard />}
          </section>
        </Fragment>
      )}
    </main>
  );
}

export default App;

// import { Fragment, useEffect, useState } from 'react';
// import GameBoard from './components/GameBoard';
// import ResultsScreen from './components/ResultsScreen';
// import './styles/App.css';
// import { Card } from './types';
// import Button from './ui/Button';
// import Loader from './ui/Loader';

// function App() {
//   const [turns, setTurns] = useState<number>(0);
//   const [bestScore, setBestScore] = useState<number>(() => {
//     // TODO: Get bestScore from localStorage
//     const storedBestScore = localStorage.getItem('bestScore');
//     return storedBestScore ? JSON.parse(storedBestScore) : 0;
//   });

//   const [loading, setLoading] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [cards, setCards] = useState<Card[]>([]);
//   const [cardUrl, setCardUrl] = useState<{ src: Card['src'] }[]>([]);
//   const [selectedCard1, setSelectedCard1] = useState<Card | null>(null);
//   const [selectedCard2, setSelectedCard2] = useState<Card | null>(null);
//   const [disable, setDisable] = useState(false);
//   const [isBestScore, setIsBestScore] = useState(false);

//   // TODO: Fetch images for the game board.
//   useEffect(() => {
//     const fetchImages = async () => {
//       setLoading(true);
//       try {
//         const images = [];
//         for (let i = 0; i < 8; i++) {
//           const response = await fetch(`https://picsum.photos/200?random=${i}`);
//           images.push({ src: response.url });
//         }
//         setCardUrl(images);
//       } catch (error: any) {
//         console.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchImages();
//   }, []);

//   const shuffleCards = () => {
//     const shuffledCards = [...cardUrl, ...cardUrl]
//       .sort(() => Math.random() - 0.5)
//       .map((card) => ({ ...card, id: Math.random(), matched: false }));
//     setCards(shuffledCards);
//     setTurns(0);
//     setSelectedCard1(null);
//     setSelectedCard2(null);
//     setShowResults(false);
//   };

//   useEffect(() => {
//     if (cardUrl.length > 0) {
//       shuffleCards();
//     }
//   }, [cardUrl]);

//   const handleSelectedCard = (card: Card) => {
//     if (!disable) {
//       selectedCard1 ? setSelectedCard2(card) : setSelectedCard1(card);
//     }
//   };

//   // TODO: Logic to handle resetting selected card.
//   const resetSelectedCards = () => {
//     setSelectedCard1(null);
//     setSelectedCard2(null);
//     setDisable(false);
//   };

//   const resetTurn = () => {
//     setTurns((prev) => prev + 1);
//     resetSelectedCards();
//   };
//   // TODO: Comparing selectedCard card one with selectedCard card two.
//   useEffect(() => {
//     if (selectedCard1 && selectedCard2) {
//       setDisable(true);
//       if (selectedCard1.src === selectedCard2.src) {
//         setCards((prev) =>
//           prev.map((card) =>
//             card.src === selectedCard1.src ? { ...card, matched: true } : card
//           )
//         );
//         resetTurn();
//       } else {
//         setTimeout(() => {
//           resetTurn();
//         }, 1000);
//       }
//     }
//   }, [selectedCard1, selectedCard2]);

//   // TODO: Function to compare counts with best score
//   const updateBestScore = () => {
//     if (turns > 0 && turns < bestScore) {
//       setIsBestScore(true);
//       setBestScore(turns);
//     } else if (turns >= bestScore) {
//       setIsBestScore(false);
//     }
//   };
//   // TODO: Save bestScore to localStorage when isBestScore changes
//   useEffect(() => {
//     if (isBestScore)
//       localStorage.setItem('bestScore', JSON.stringify(bestScore));
//   }, [isBestScore]);

//   // useEffect(() => {
//   //   localStorage.setItem('bestScore', JSON.stringify(bestScore));
//   // }, [bestScore]);

//   // TODO: Update bestScore if the current turns are a valid score and lower than the existing bestScore
//   useEffect(() => {
//     const allCardsMatched = cards.every((card) => card.matched);
//     if (allCardsMatched) {
//       updateBestScore();
//       setShowResults(true);
//     }
//   }, [cards]);

//   return (
//     <main className="flex items-center flex-col justify-center">
//       {/* TODO: Dynamically displaying the ResultsScreen when the set conditions are met */}
//       {showResults && !loading ? (
//         <ResultsScreen
//           totalClicks={turns}
//           bestScore={bestScore}
//           isBestScore={isBestScore}
//           restartGame={shuffleCards}
//         />
//       ) : (
//         <Fragment>
//           <div className="mb-12 flex flex-col items-center">
//             <h1 className="text-2xl w-max font-bold mb-3 border rounded-md p-4">
//               Memory Matching Game
//             </h1>
//             <p className="text-2xl w-max font-bold rounded-md p-4">
//               No of Turns: {turns}
//             </p>
//             <Button
//               className="bg-[#7d217d] hover:bg-[#7d217d85]"
//               onClick={shuffleCards}
//               disabled={loading}
//             >
//               {loading ? 'Restarting...' : 'Restart Game'}
//             </Button>
//           </div>
//           <section
//             className={`grid gap-3 items-center justify-center ${
//               loading ? 'grid-cols-1' : 'grid-cols-4'
//             }`}
//           >
//             {loading ? (
//               <Loader />
//             ) : (
//               <GameBoard
//                 cards={cards}
//                 handleSelectedCard={handleSelectedCard}
//                 selectedCard1={selectedCard1}
//                 selectedCard2={selectedCard2}
//                 disable={disable}
//               />
//             )}
//           </section>
//         </Fragment>
//       )}
//     </main>
//   );
// }

// export default App;
