const express = require('express');
const router = express.Router();
const farmerQuestionController = require('../controllers/farmerQuestionController');
const { verifyToken } = require('../middleware/authMiddleware');
// faremer queastion answer
router.put('/:id/answer', verifyToken, farmerQuestionController.answerQuestion);

// Farmer sends question
router.post('/', verifyToken, farmerQuestionController.sendQuestion);

// Extension & Admin view questions
router.get('/', verifyToken, farmerQuestionController.getQuestions);

module.exports = router;