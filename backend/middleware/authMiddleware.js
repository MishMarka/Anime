const { createClient } = require('@supabase/supabase-js');
const { UnauthorizedError } = require('./errorMiddleware');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Middleware to verify JWT token and add user to request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const verifyToken = async (req, res, next) => {
  try {
    // Get token from authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new UnauthorizedError('No token provided'));
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify the token using Supabase
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error) {
      return next(new UnauthorizedError('Invalid token'));
    }
    
    // Add user data to request object
    req.user = data.user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyToken
};