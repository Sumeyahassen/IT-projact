const { FarmerQuestion, User } = require('../models');

// Farmer sends question
exports.sendQuestion = async (req, res) => {
  if (req.user.role !== 'farmer') {
    return res.status(403).json({ message: 'Only farmers can send questions' });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: 'Question is required' });
  }

  try {
    const newQuestion = await FarmerQuestion.create({
      question,
      region: req.user.region,
      asked_by: req.user.id,
    });

    const questionWithFarmer = await FarmerQuestion.findByPk(newQuestion.id, {
      include: [{ model: User, as: 'farmer', attributes: ['full_name', 'phone_number'] }],
    });

    res.status(201).json({
      message: 'Question sent successfully',
      question: questionWithFarmer,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error sending question', error: error.message });
  }
};
exports.answerQuestion = async (req, res) => {
  if (req.user.role !== 'extension') {
    return res.status(403).json({ message: 'Only extension officers can answer questions' });
  }

  const { id } = req.params;
  const { answer } = req.body;

  if (!answer) {
    return res.status(400).json({ message: 'Answer is required' });
  }

  try {
    const question = await FarmerQuestion.findByPk(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await question.update({ answer, answered: true });

    // Optional: Send notification to farmer
    // You can create a notification here

    res.json({ message: 'Question answered successfully', question });
  } catch (error) {
    res.status(500).json({ message: 'Error answering question', error: error.message });
  }
};

// Extension & Admin view all questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await FarmerQuestion.findAll({
      include: [{ model: User, as: 'farmer', attributes: ['full_name', 'phone_number', 'region'] }],
      order: [['createdAt', 'DESC']],
    });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
};