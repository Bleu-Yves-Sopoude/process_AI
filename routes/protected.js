const express = require('express');
const { authenticateJWT, authorizeRole } = require('../middleware/authMiddleware'); // Fixed path typo
const router = express.Router();

// Route for admin
router.get('/admin', authenticateJWT, authorizeRole('admin'), (req, res) => {
    res.json({ message: "Welcome, Admin" });
});

// Route for user
router.get('/user', authenticateJWT, (req, res) => {
    res.json({ message: "Welcome, User" });
});

module.exports = router;
