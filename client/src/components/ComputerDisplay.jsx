import React from 'react';

const ComputerDisplay = ({ computerWord, revealed }) => {
    return (
        <div className="computer-display">
            <h3>Computer's Word:</h3>
            <div className="computer-word">
                {revealed ? computerWord : '?'.repeat(computerWord?.length || 0)}
            </div>
        </div>
    );
};

export default ComputerDisplay;