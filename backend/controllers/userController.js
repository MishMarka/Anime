const { createClient } = require('@supabase/supabase-js');
const { BadRequestError, NotFoundError } = require('../middleware/errorMiddleware');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Create a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const createUser = async (req, res, next) => {
  try {
    const { email, username, avatar_url, language_preference } = req.body;

    // Create new user
    const { data, error } = await supabase
      .from('users')
      .insert([
        { 
          email, 
          username, 
          avatar_url: avatar_url || null, 
          language_preference: language_preference || 'en' 
        }
      ])
      .select();

    if (error) {
      return next(new BadRequestError(error.message));
    }

    return res.status(201).json({
      status: 'success',
      data: data[0]
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getAllUsers = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      return next(new BadRequestError(error.message));
    }

    return res.status(200).json({
      status: 'success',
      results: data.length,
      data
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return next(new NotFoundError('User not found'));
      }
      return next(new BadRequestError(error.message));
    }

    return res.status(200).json({
      status: 'success',
      data
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, avatar_url, language_preference } = req.body;

    // Update user and return the updated record
    const { data, error } = await supabase
      .from('users')
      .update({ 
        username, 
        avatar_url, 
        language_preference
      })
      .eq('id', id)
      .select();

    if (error) {
      return next(new BadRequestError(error.message));
    }

    if (data.length === 0) {
      return next(new NotFoundError('User not found'));
    }

    return res.status(200).json({
      status: 'success',
      data: data[0]
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete user
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      return next(new BadRequestError(error.message));
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};