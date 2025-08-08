function getRandomLength() {
    // Weighted towards middle lengths (4-7 letters)
    const lengths = [3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8, 8, 9];
    return lengths[Math.floor(Math.random() * lengths.length)];
}

module.exports = {
    getRandomLength
};