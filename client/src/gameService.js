const API_URL = 'http://localhost:5000/api';

export async function startGame() {
    const response = await fetch(`${API_URL}/start`);
    return await response.json();
}

export async function submitWord(playerId, word) {
    const response = await fetch(`${API_URL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, word })
    });
    return await response.json();
}

export async function getScores() {
    const response = await fetch(`${API_URL}/scores`);
    return await response.json();
}