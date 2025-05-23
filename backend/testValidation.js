const express = require('express');
const { body, validationResult } = require('express-validator');
const { errorHandler, handleValidationErrors } = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json());

// Add validation middleware
app.post('/test', [
  body('email').isEmail().withMessage('Must provide a valid email'),
  body('name').notEmpty().withMessage('Name is required')
], (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.validationErrors = errors.array();
    return next();
  }
  
  // If validation passes
  res.status(200).json({
    status: 'success',
    message: 'Validation passed',
    data: req.body
  });
});

// Add validation error handling middleware
app.use(handleValidationErrors);

// Add 404 handler for invalid routes
app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Add global error handler
app.use(errorHandler);

// Start server
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log('Test the validation with:');
  console.log('curl -X POST http://localhost:3002/test -H "Content-Type: application/json" -d \'{"email": "invalid", "name": ""}\'');
  console.log('Expected output: Validation error with email and name validation errors');
  console.log('\nOr with valid data:');
  console.log('curl -X POST http://localhost:3002/test -H "Content-Type: application/json" -d \'{"email": "test@example.com", "name": "Test User"}\'');
  console.log('Expected output: Success message with the submitted data');
});