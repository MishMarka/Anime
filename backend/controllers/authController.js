const { createClient } = require('@supabase/supabase-js');
const { BadRequestError, UnauthorizedError } = require('../middleware/errorMiddleware');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Register a new user with email and password
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Register new user
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return next(new BadRequestError(error.message));
    }

    // Return user data without sensitive information
    return res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          created_at: data.user.created_at
        },
        session: data.session
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login a user with email and password
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Authenticate user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return next(new UnauthorizedError(error.message));
    }

    // Return session data
    return res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          created_at: data.user.created_at
        },
        session: {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getCurrentUser = async (req, res, next) => {
  try {
    // User is already attached to the request by the verifyToken middleware
    const { user } = req;

    if (!user) {
      return next(new UnauthorizedError('User not authenticated'));
    }

    // Return user data without sensitive information
    return res.status(200).json({
      status: 'success',
      data: {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        email_confirmed_at: user.email_confirmed_at
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  signIn,
  getCurrentUser
};