import React from 'react';
import '../styles/animations.css';

const TargetDisplay = ({ targetLength, roundComplete }) => {
    return (
        <div className={`target-display ${roundComplete ? 'pulse' : ''}`}>
            <h2>Word Length:</h2>
            <div className="target-number">{targetLength}</div>
        </div>
    );
};

export default TargetDisplay;