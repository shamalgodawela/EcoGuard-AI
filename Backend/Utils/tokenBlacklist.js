// utils/tokenBlacklist.js
// In-memory token blacklist (for production, consider using Redis or database)
const blacklistedTokens = new Set();

const addToBlacklist = (token) => {
    blacklistedTokens.add(token);
};

const isBlacklisted = (token) => {
    return blacklistedTokens.has(token);
};

// Optional: Clean up expired tokens periodically (basic implementation)
// In production, you'd want to decode token and check expiration before cleanup
const cleanup = () => {
    // This is a simple implementation
    // In production, you might want to track token expiration times
    // and remove them from the blacklist when they expire
};

module.exports = {
    addToBlacklist,
    isBlacklisted,
    cleanup
};


