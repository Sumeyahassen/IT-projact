const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, requireAdmin } = require('../middleware/authMiddleware');

// All routes protected and admin-only
router.get('/', verifyToken, requireAdmin, userController.getAllUsers);
router.post('/', verifyToken, requireAdmin, userController.createUser);
router.put('/:id', verifyToken, requireAdmin, userController.updateUser);
router.delete('/:id', verifyToken, requireAdmin, userController.deleteUser);

module.exports = router;