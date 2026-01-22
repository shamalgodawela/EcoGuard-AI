// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser, logoutUser } = require('../Controllers/CoralAuthController');
const authenticateToken = require('../Middleware/authMiddleware');


router.post('/register', registerUser);
router.post('/login', loginUser);


router.get('/profile', authenticateToken, getCurrentUser);
router.post('/logout', authenticateToken, logoutUser);

module.exports = router;
