const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticateToken = require('../utils/authMiddleware');

router.post('/', authenticateToken, taskController.createTask);
router.get('/:id', authenticateToken, taskController.getTask);

// Add routes for update and delete

module.exports = router;
