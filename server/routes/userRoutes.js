// /backend/routes/userRoutes.js
const express = require('express');
const { registerUser, authUser, getUserProfile } = require('../controllers/userController');

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to authenticate a user and get a token
router.post('/login', authUser);

// Route to get user profile, protected by JWT authentication
router.get('/profile' ,getUserProfile);



module.exports = router;
