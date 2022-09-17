import { useEffect, useState } from 'react';
import Square from './components/Square';

type Scores = {
  [key: string]: number;
};

const INITIAL_GAME_STATE = ['', '', '', '', '', '', '', '', ''];
const INITIAL_SCORES: Scores = { X: 0, Y: 0 };

function App() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState('O');
  const [scores, setScores] = useState(INITIAL_SCORES);

  useEffect(() => {
    const storedScores = localStorage.getItem('scores');
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  // Winning possibilities
  const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const resetBoard = () => {
    setGameState(INITIAL_GAME_STATE);
  };

  const handleWin = () => {
    window.alert(`Congrats Player ${currentPlayer} You are the winner!`);
    const newPlayerScore = scores[currentPlayer] + 1;
    const newScores = { ...scores };
    newScores[currentPlayer] = newPlayerScore;
    setScores(newScores);
    localStorage.setItem('scores', JSON.stringify(newScores));
    resetBoard();
  };

  const handleDraw = () => {
    window.alert('The game ends with draw');
    resetBoard();
  };

  const handleCellClick = (event: any) => {
    const cellIndex = Number(event.target.getAttribute('data-cell-index'));
    const currentValue = gameState[cellIndex];

    if (!currentValue) {
      // take copy from original game state
      const newValues = [...gameState];
      // assign value of the cell to currentPlayer value
      newValues[cellIndex] = currentPlayer;
      // set newValues to original gameState
      setGameState(newValues);
    }
  };

  const checkForWinner = () => {
    let roundWon = false;
    changePlayer();

    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const winCombo = WINNING_COMBOS[i];

      let a = gameState[winCombo[0]];
      let b = gameState[winCombo[1]];
      let c = gameState[winCombo[2]];

      if ([a, b, c].includes('')) {
        continue;
      }

      if (a == b && b == c) {
        roundWon = true;
        break;
      }
    }

    // Winning possibility
    if (roundWon) {
      setTimeout(() => handleWin(), 300);
      return;
    }

    // Draw possibility
    if (!gameState?.includes('')) {
      setTimeout(() => handleDraw(), 300);
      return;
    }
  };

  useEffect(() => {
    if (gameState === INITIAL_GAME_STATE) {
      return;
    }
    checkForWinner();
  }, [gameState]);

  return (
    <div className='h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500'>
      <h1 className='text-center text-5xl mb-6 font-display text-white'>
        Tic Tac Toe
      </h1>

      <div>
        <div className='grid grid-cols-3 gap-3 mx-auto w-96'>
          {gameState?.map((player, index) => (
            <Square
              key={index}
              onClick={handleCellClick}
              {...{ index, player }}
            />
          ))}
        </div>

        <div className='mx-auto w-96 text-2xl text-serif'>
          <p className='text-white mt-5'>
            Next Player : <span>{currentPlayer}</span>
          </p>
          <p className='text-white mt-5'>
            Player X Wins : <span>{scores['X']}</span>
          </p>
          <p className='text-white mt-5'>
            Player O Wins : <span>{scores['Y']}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
