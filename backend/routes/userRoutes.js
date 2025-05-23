const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Private (requires authentication)
 */
router.post('/', verifyToken, userController.createUser);

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private (requires authentication)
 */
router.get('/', verifyToken, userController.getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private (requires authentication)
 */
router.get('/:id', verifyToken, userController.getUserById);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user by ID
 * @access  Private (requires authentication)
 */
router.put('/:id', verifyToken, userController.updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user by ID
 * @access  Private (requires authentication)
 */
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;