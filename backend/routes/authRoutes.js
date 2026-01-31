const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ADD THIS LINE RIGHT HERE — this is the fix
router.use(express.json());

// Your routes
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;