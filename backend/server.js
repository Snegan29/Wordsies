const express = require('express');
const cors = require('cors');
const { Game } = require('./game/gameLogic');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const game = new Game();

// Routes
app.get('/api/start', async (req, res) => {
    try {
        await game.startNewRound();
        res.json({
            targetLength: game.currentTargetLength,
            scores: game.scores,
            computerWord: game.computerWord
        });
    } catch (error) {
        res.status(500).json({ error: 'Error starting new round' });
    }
});

app.post('/api/submit', async (req, res) => {
    const { playerId, word } = req.body;
    
    if (!playerId || !word) {
        return res.status(400).json({ error: 'Player ID and word are required' });
    }

    try {
        const result = await game.submitWord(playerId, word);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error processing word submission' });
    }
});

app.get('/api/scores', (req, res) => {
    res.json({ scores: game.scores });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));