import React from 'react';

const ScoreBoard = ({ scores }) => {
    return (
        <div className="score-board">
            <h2>Scores</h2>
            <ul>
                {Object.entries(scores).map(([player, score]) => (
                    <li key={player}>
                        <span className="player-name">{player}</span>
                        <span className="player-score">{score}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ScoreBoard;