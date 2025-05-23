/**
 * Validation middleware using express-validator
 */
const { body, param, query, validationResult } = require('express-validator');

// Helper function to process validation results
const validate = (validations) => {
  return async (req, res, next) => {
    // Execute all validations
    await Promise.all(validations.map(validation => validation.run(req)));
    
    // Get validation errors
    const errors = validationResult(req);
    
    // If there are errors, add them to the request object
    if (!errors.isEmpty()) {
      req.validationErrors = errors.array();
      return next();
    }
    
    // No errors, proceed to the next middleware
    next();
  };
};

// User validation rules
const userValidation = {
  createUser: validate([
    body('email')
      .isEmail().withMessage('Must be a valid email')
      .normalizeEmail()
      .notEmpty().withMessage('Email is required'),
    body('username')
      .isString().withMessage('Username must be a string')
      .notEmpty().withMessage('Username is required')
      .trim()
      .isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters'),
    body('avatar_url')
      .optional()
      .isURL().withMessage('Avatar URL must be a valid URL'),
    body('language_preference')
      .optional()
      .isString().withMessage('Language preference must be a string')
      .isIn(['en', 'jp', 'es', 'fr', 'de']).withMessage('Invalid language preference')
  ]),
  
  updateUser: validate([
    param('id')
      .notEmpty().withMessage('User ID is required')
      .isUUID().withMessage('User ID must be a valid UUID'),
    body('username')
      .optional()
      .isString().withMessage('Username must be a string')
      .trim()
      .isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters'),
    body('avatar_url')
      .optional()
      .isURL().withMessage('Avatar URL must be a valid URL'),
    body('language_preference')
      .optional()
      .isString().withMessage('Language preference must be a string')
      .isIn(['en', 'jp', 'es', 'fr', 'de']).withMessage('Invalid language preference')
  ]),
  
  getUserById: validate([
    param('id')
      .notEmpty().withMessage('User ID is required')
      .isUUID().withMessage('User ID must be a valid UUID')
  ]),
  
  deleteUser: validate([
    param('id')
      .notEmpty().withMessage('User ID is required')
      .isUUID().withMessage('User ID must be a valid UUID')
  ])
};

// Authentication validation rules
const authValidation = {
  signUp: validate([
    body('email')
      .isEmail().withMessage('Must be a valid email')
      .normalizeEmail()
      .notEmpty().withMessage('Email is required'),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
      .matches(/\d/).withMessage('Password must contain at least one number')
      .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
  ]),
  
  signIn: validate([
    body('email')
      .isEmail().withMessage('Must be a valid email')
      .normalizeEmail()
      .notEmpty().withMessage('Email is required'),
    body('password')
      .notEmpty().withMessage('Password is required')
  ])
};

// Chart validation rules
const chartValidation = {
  createChart: validate([
    body('title')
      .notEmpty().withMessage('Chart title is required')
      .isString().withMessage('Chart title must be a string')
      .isLength({ min: 3, max: 100 }).withMessage('Chart title must be between 3 and 100 characters'),
    body('description')
      .optional()
      .isString().withMessage('Chart description must be a string'),
    body('user_id')
      .notEmpty().withMessage('User ID is required')
      .isUUID().withMessage('User ID must be a valid UUID')
  ]),
  
  updateChart: validate([
    param('id')
      .notEmpty().withMessage('Chart ID is required')
      .isUUID().withMessage('Chart ID must be a valid UUID'),
    body('title')
      .optional()
      .isString().withMessage('Chart title must be a string')
      .isLength({ min: 3, max: 100 }).withMessage('Chart title must be between 3 and 100 characters'),
    body('description')
      .optional()
      .isString().withMessage('Chart description must be a string')
  ]),
  
  getChartById: validate([
    param('id')
      .notEmpty().withMessage('Chart ID is required')
      .isUUID().withMessage('Chart ID must be a valid UUID')
  ]),
  
  deleteChart: validate([
    param('id')
      .notEmpty().withMessage('Chart ID is required')
      .isUUID().withMessage('Chart ID must be a valid UUID')
  ])
};

// Page validation rules
const pageValidation = {
  createPage: validate([
    body('chart_id')
      .notEmpty().withMessage('Chart ID is required')
      .isUUID().withMessage('Chart ID must be a valid UUID'),
    body('title')
      .notEmpty().withMessage('Page title is required')
      .isString().withMessage('Page title must be a string')
      .isLength({ min: 1, max: 100 }).withMessage('Page title must be between 1 and 100 characters'),
    body('content')
      .optional()
      .isString().withMessage('Page content must be a string'),
    body('order')
      .optional()
      .isInt({ min: 0 }).withMessage('Page order must be a non-negative integer')
  ]),
  
  updatePage: validate([
    param('id')
      .notEmpty().withMessage('Page ID is required')
      .isUUID().withMessage('Page ID must be a valid UUID'),
    body('title')
      .optional()
      .isString().withMessage('Page title must be a string')
      .isLength({ min: 1, max: 100 }).withMessage('Page title must be between 1 and 100 characters'),
    body('content')
      .optional()
      .isString().withMessage('Page content must be a string'),
    body('order')
      .optional()
      .isInt({ min: 0 }).withMessage('Page order must be a non-negative integer')
  ]),
  
  getPageById: validate([
    param('id')
      .notEmpty().withMessage('Page ID is required')
      .isUUID().withMessage('Page ID must be a valid UUID')
  ]),
  
  deletePage: validate([
    param('id')
      .notEmpty().withMessage('Page ID is required')
      .isUUID().withMessage('Page ID must be a valid UUID')
  ])
};

module.exports = {
  userValidation,
  authValidation,
  chartValidation,
  pageValidation,
  handleValidation: validate
};