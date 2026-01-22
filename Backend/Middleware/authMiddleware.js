// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const { isBlacklisted } = require('../Utils/tokenBlacklist');

const authenticateToken = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Check if token is blacklisted (logout)
        if (isBlacklisted(token)) {
            return res.status(401).json({ message: "Token has been invalidated. Please login again." });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
        
        // Check if user still exists
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "Invalid token. User not found." });
        }

        // Attach user info to request object
        req.user = { userId: decoded.userId };
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token." });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired." });
        }
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = authenticateToken;

