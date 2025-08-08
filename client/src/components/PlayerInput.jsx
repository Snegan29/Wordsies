import React, { useState, useEffect } from 'react';
import '../styles/animations.css';

const PlayerInput = ({ targetLength, onSubmit, disabled, timeLeft, setTimeLeft }) => {
    const [word, setWord] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (disabled) return;
        
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [disabled, setTimeLeft]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!word.trim()) return;
        
        const result = await onSubmit('player', word);
        setMessage(result.message);
        setWord('');
    };

    return (
        <div className={`player-input ${disabled ? 'disabled' : ''}`}>
            <h3>Your Turn</h3>
            <div className="timer">Time left: {timeLeft}s</div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder={`${targetLength}-letter word`}
                    disabled={disabled}
                    autoFocus
                />
                <button type="submit" disabled={disabled}>Submit</button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default PlayerInput;