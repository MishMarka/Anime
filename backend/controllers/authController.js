const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Register a new user with email and password
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Register new user
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Return user data without sensitive information
    return res.status(201).json({
      user: {
        id: data.user.id,
        email: data.user.email,
        created_at: data.user.created_at
      },
      session: data.session
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Failed to register user' });
  }
};

/**
 * Login a user with email and password
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Authenticate user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Return session data
    return res.status(200).json({
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
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ error: 'Failed to log in user' });
  }
};

/**
 * Get current user information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getCurrentUser = async (req, res) => {
  try {
    // User is already attached to the request by the verifyToken middleware
    const { user } = req;

    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Return user data without sensitive information
    return res.status(200).json({
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      email_confirmed_at: user.email_confirmed_at
    });
  } catch (error) {
    console.error('Error getting current user:', error);
    return res.status(500).json({ error: 'Failed to get current user' });
  }
};

module.exports = {
  signUp,
  signIn,
  getCurrentUser
};