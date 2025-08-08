import React, { useState, useEffect } from 'react';
import { startGame, submitWord } from '../gameService';
import TargetDisplay from './TargetDisplay';
import PlayerInput from './PlayerInput';
import ScoreBoard from './ScoreBoard';
import ComputerDisplay from './ComputerDisplay';
import '../styles/GameBoard.css';

const GameBoard = () => {
    const [targetLength, setTargetLength] = useState(0);
    const [scores, setScores] = useState({ player: 0, computer: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [roundComplete, setRoundComplete] = useState(false);
    const [computerWord, setComputerWord] = useState('');
    const [playerWord, setPlayerWord] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = async () => {
        const { targetLength, scores, computerWord } = await startGame();
        setTargetLength(targetLength);
        setScores(scores);
        setComputerWord(computerWord);
        setGameOver(false);
        setRoundComplete(false);
        setTimeLeft(60);
        setPlayerWord('');
    };

    const handleWordSubmit = async (playerId, word) => {
        const result = await submitWord(playerId, word);
        
        setPlayerWord(result.playerWord);
        setComputerWord(result.computerWord);
        setScores(result.scores);
        setRoundComplete(true);
        setTimeLeft(result.timeLeft);
        
        if (result.gameOver) {
            setGameOver(true);
        }
        
        return result;
    };

    const handleRestart = () => {
        initializeGame();
    };

    return (
        <div className="game-board">
            <h1>Word Length Challenge</h1>
            <h2>Player vs Computer</h2>
            
            <ScoreBoard scores={scores} />
            
            <TargetDisplay 
                targetLength={targetLength} 
                roundComplete={roundComplete} 
            />
            
            <div className="game-area">
                <PlayerInput
                    targetLength={targetLength}
                    onSubmit={handleWordSubmit}
                    disabled={gameOver || roundComplete}
                    timeLeft={timeLeft}
                    setTimeLeft={setTimeLeft}
                />
                
                <ComputerDisplay 
                    computerWord={computerWord} 
                    revealed={roundComplete || gameOver}
                />
            </div>
            
            {roundComplete && !gameOver && (
                <button 
                    className="next-round-button"
                    onClick={initializeGame}
                >
                    Next Round
                </button>
            )}
            
            {gameOver && (
                <button className="restart-button" onClick={handleRestart}>
                    Play Again
                </button>
            )}
        </div>
    );
};

export default GameBoard;