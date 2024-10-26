// ResultsScreen.tsx
import { useGameContext } from '../context/game-context';
import Button from '../ui/Button';

const ResultsScreen = () => {
  const { turns, bestScore, isBestScore, shuffleCards } = useGameContext();
  return (
    <div className="mb-12 flex flex-col items-center">
      <h1 className="text-2xl w-max font-bold mb-3 border rounded-md p-4">
        {isBestScore ? 'Whoohoo! 🎉 You rock buddy 🚀' : 'Game Over!'}
      </h1>
      <p className="text-lg mb-2">Total Clicks: {turns}</p>
      <p className="text-2xl w-max font-bold rounded-md p-4">
        {isBestScore ? 'New ' : ''}Best Score: {bestScore}
      </p>
      <Button
        className="bg-[#c46dc4] hover:bg-[#c46dc480]"
        onClick={shuffleCards}
      >
        Restart Game
      </Button>
    </div>
  );
};

export default ResultsScreen;

// import Button from '../ui/Button';

// type Props = {
//   totalClicks: number;
//   bestScore: number;
//   isBestScore: boolean;
//   restartGame: () => void;
// };
// const ResultsScreen = ({
//   totalClicks,
//   bestScore,
//   isBestScore,
//   restartGame,
// }: Props) => {
//   return (
//     <div className="mb-12 flex flex-col items-center">
//       <h1 className="text-2xl w-max font-bold mb-3 border rounded-md p-4">
//         {isBestScore ? 'Whoohoo! 🎉 You rock buddy 🚀' : 'Game Over!'}
//       </h1>
//       <p className="text-lg mb-2">Total Clicks: {totalClicks}</p>
//       <p className="text-2xl w-max font-bold rounded-md p-4">
//         {isBestScore ? 'New ' : ''}Best Score: {bestScore}
//       </p>
//       <Button className="bg-sky-800 hover:bg-sky-700" onClick={restartGame}>
//         Restart Game
//       </Button>
//     </div>
//   );
// };

// export default ResultsScreen;
