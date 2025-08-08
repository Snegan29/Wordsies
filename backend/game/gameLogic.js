const dictionaryService = require('./dictionaryService');
const { getRandomLength } = require('../utils/helpers');

class Game {
    constructor() {
        this.scores = {
            player: 0,
            computer: 0
        };
        this.currentTargetLength = 0;
        this.timeLimit = 60000; // 60 seconds
        this.roundStartTime = null;
        this.computerWord = '';
        this.playerWord = '';
    }

    async startNewRound() {
        this.currentTargetLength = getRandomLength();
        this.roundStartTime = Date.now();
        this.computerWord = await this.generateComputerWord();
        this.playerWord = '';
    }

    async generateComputerWord() {
        // Computer gets a word of the target length
        let attempts = 0;
        let word = '';
        
        while (attempts < 5) {
            word = await dictionaryService.getRandomWord(this.currentTargetLength);
            const isValid = await dictionaryService.validateWord(word);
            if (isValid) return word;
            attempts++;
        }
        
        // Fallback if API fails
        return dictionaryService.generateSimpleWord(this.currentTargetLength);
    }

    async submitWord(playerId, word) {
        if (playerId !== 'player') {
            throw new Error('Only player submissions are allowed');
        }

        const timeUsed = Date.now() - this.roundStartTime;
        const timeLeft = Math.max(0, this.timeLimit - timeUsed);
        
        if (timeLeft <= 0) {
            return this.endRound();
        }

        const isValid = await dictionaryService.validateWord(word);
        const isCorrectLength = word.length === this.currentTargetLength;
        
        if (!isValid || !isCorrectLength) {
            return {
                success: false,
                message: !isValid ? 'Invalid word' : `Word must be ${this.currentTargetLength} letters`,
                scores: this.scores,
                timeLeft: Math.floor(timeLeft / 1000)
            };
        }

        this.playerWord = word;
        return this.endRound();
    }

    endRound() {
        // Calculate scores based on word lengths
        const playerScore = this.playerWord.length;
        const computerScore = this.computerWord.length;
        
        if (playerScore > computerScore) {
            this.scores.player += playerScore;
        } else if (computerScore > playerScore) {
            this.scores.computer += computerScore;
        } else {
            // Tie - split points
            this.scores.player += playerScore / 2;
            this.scores.computer += computerScore / 2;
        }

        const gameOver = this.scores.player >= 50 || this.scores.computer >= 50;
        const winner = gameOver ? 
            (this.scores.player > this.scores.computer ? 'Player' : 'Computer') : null;

        return {
            success: true,
            message: gameOver ? 
                `${winner} wins!` : 
                `Player: ${this.playerWord} (${this.playerWord.length}) vs Computer: ${this.computerWord} (${this.computerWord.length})`,
            scores: this.scores,
            playerWord: this.playerWord,
            computerWord: this.computerWord,
            gameOver,
            timeLeft: 0
        };
    }
}

module.exports = { Game };