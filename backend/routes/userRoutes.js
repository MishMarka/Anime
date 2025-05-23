const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { userValidation } = require('../middleware/validationMiddleware');
const { handleValidationErrors } = require('../middleware/errorMiddleware');

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Public (authentication will be added later)
 */
router.post('/', 
  userValidation.createUser,
  handleValidationErrors,
  userController.createUser
);

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
router.get('/:id',
  userValidation.getUserById,
  handleValidationErrors,
  userController.getUserById
);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user by ID
 * @access  Public (authentication will be added later)
 */
router.put('/:id',
  userValidation.updateUser,
  handleValidationErrors,
  userController.updateUser
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user by ID
 * @access  Public (authentication will be added later)
 */
router.delete('/:id',
  userValidation.deleteUser,
  handleValidationErrors,
  userController.deleteUser
);

module.exports = router;