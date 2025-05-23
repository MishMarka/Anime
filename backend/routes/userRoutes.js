const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Public (authentication will be added later)
 */
router.post('/', userController.createUser);

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Public (authentication will be added later)
 */
router.get('/', userController.getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Public (authentication will be added later)
 */
router.get('/:id', userController.getUserById);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user by ID
 * @access  Public (authentication will be added later)
 */
router.put('/:id', userController.updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user by ID
 * @access  Public (authentication will be added later)
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;