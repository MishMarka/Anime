const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const { authValidation } = require('../middleware/validationMiddleware');
const { handleValidationErrors } = require('../middleware/errorMiddleware');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user with email and password
 * @access  Public
 */
router.post('/register',
  authValidation.signUp,
  handleValidationErrors,
  authController.signUp
);

/**
 * @route   POST /api/auth/login
 * @desc    Login a user with email and password
 * @access  Public
 */
router.post('/login',
  authValidation.signIn,
  handleValidationErrors,
  authController.signIn
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user information
 * @access  Private (requires authentication)
 */
router.get('/me', verifyToken, authController.getCurrentUser);

module.exports = router;