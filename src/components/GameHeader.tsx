import { useGameContext } from '../context/game-context';
import Button from '../ui/Button';

const GameHeader = () => {
  const { click, loading, bestScore, shuffleCards } = useGameContext();
  return (
    <div className="mb-12 flex flex-col items-center">
      <h1 className="text-2xl w-max font-bold mb-3 border rounded-md p-4">
        Memory Matching Game
      </h1>
      <p className="text-lg w-max font-normal my-4">
        Current High Score: {bestScore} 🏆
      </p>
      <p className="text-2xl w-max font-bold my-4">No of Turns: {click}</p>
      <Button
        className="bg-[#7d217d] hover:bg-[#7d217d85]"
        onClick={shuffleCards}
        disabled={loading}
      >
        {loading ? 'Restarting...' : 'Restart Game'}
      </Button>
    </div>
  );
};

export default GameHeader;
