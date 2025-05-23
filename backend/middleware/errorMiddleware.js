/**
 * Custom error classes and middleware for centralized error handling
 */

// Base custom error class that extends the native Error object
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// 400 Bad Request - For validation errors
class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}

// 401 Unauthorized - For authentication errors
class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

// 403 Forbidden - For authorization errors
class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

// 404 Not Found - For resource not found errors
class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

// 409 Conflict - For conflicts with current state
class ConflictError extends AppError {
  constructor(message = 'Conflict with current state') {
    super(message, 409);
  }
}

// Middleware to handle validation errors from express-validator
const handleValidationErrors = (req, res, next) => {
  const { validationErrors } = req;
  if (validationErrors && validationErrors.length > 0) {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'Validation error',
      errors: validationErrors
    });
  }
  next();
};

// Central error handling middleware
const errorHandler = (err, req, res, next) => {
  // Default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errors = err.errors || null;
  
  // Log the error for server-side debugging
  console.error('Error:', {
    statusCode,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    errors
  });
  
  // Send standardized error response
  return res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    errors,
    // Only include stack trace in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

// 404 Not Found middleware for undefined routes
const notFoundHandler = (req, res, next) => {
  const error = new NotFoundError(`Route not found: ${req.originalUrl}`);
  next(error);
};

module.exports = {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  errorHandler,
  handleValidationErrors,
  notFoundHandler
};