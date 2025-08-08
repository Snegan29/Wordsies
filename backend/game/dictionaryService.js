const axios = require('axios');

const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en';

class DictionaryService {
    async validateWord(word) {
        try {
            const response = await axios.get(`${DICTIONARY_API}/${word}`);
            return response.data && response.data.length > 0;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return false; // Word not found
            }
            throw error;
        }
    }

    async getRandomWord(length) {
        try {
            // Note: This API doesn't have a direct random word endpoint
            // So we'll use a workaround with a word list for the demo
            // In production, you'd use a proper random word API
            const response = await axios.get(`https://random-word-api.herokuapp.com/word?length=${length}`);
            return response.data[0];
        } catch (error) {
            console.error('Error getting random word:', error);
            // Fallback to simple word generation
            return this.generateSimpleWord(length);
        }
    }

    generateSimpleWord(length) {
        // Simple fallback for demo purposes
        const vowels = 'aeiou';
        const consonants = 'bcdfghjklmnpqrstvwxyz';
        let word = '';
        
        for (let i = 0; i < length; i++) {
            if (i % 2 === 0) {
                word += consonants.charAt(Math.floor(Math.random() * consonants.length));
            } else {
                word += vowels.charAt(Math.floor(Math.random() * vowels.length));
            }
        }
        
        return word;
    }
}

module.exports = new DictionaryService();