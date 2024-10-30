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
      {/* Display ResultsScreen based on game conditions */}
      {showResults && !loading ? (
        <ResultsScreen />
      ) : (
        <Fragment>
          <GameHeader />
          <section>{loading ? <Loader /> : <GameBoard />}</section>
        </Fragment>
      )}
    </main>
  );
}

export default App;
