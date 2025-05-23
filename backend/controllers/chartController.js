const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Create a new chart
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createChart = async (req, res) => {
  try {
    const { user_id, title, summary, language } = req.body;

    // Validation
    if (!user_id || !title) {
      return res.status(400).json({ error: 'User ID and title are required' });
    }

    // Create new chart
    const { data, error } = await supabase
      .from('charts')
      .insert([
        { 
          user_id, 
          title, 
          summary: summary || null, 
          language: language || 'en' 
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating chart:', error);
    return res.status(500).json({ error: 'Failed to create chart' });
  }
};

/**
 * Get all charts
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllCharts = async (req, res) => {
  try {
    // Optional query parameters
    const { user_id } = req.query;
    
    let query = supabase.from('charts').select('*');
    
    // Add filter if user_id is provided
    if (user_id) {
      query = query.eq('user_id', user_id);
    }
    
    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching charts:', error);
    return res.status(500).json({ error: 'Failed to fetch charts' });
  }
};

/**
 * Get chart by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getChartById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('charts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Chart not found' });
      }
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching chart:', error);
    return res.status(500).json({ error: 'Failed to fetch chart' });
  }
};

/**
 * Update chart by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateChart = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, language } = req.body;

    // Update chart and return the updated record
    const { data, error } = await supabase
      .from('charts')
      .update({ 
        title, 
        summary, 
        language,
        updated_at: new Date()
      })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Chart not found' });
    }

    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating chart:', error);
    return res.status(500).json({ error: 'Failed to update chart' });
  }
};

/**
 * Delete chart by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteChart = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete chart
    const { error } = await supabase
      .from('charts')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting chart:', error);
    return res.status(500).json({ error: 'Failed to delete chart' });
  }
};

module.exports = {
  createChart,
  getAllCharts,
  getChartById,
  updateChart,
  deleteChart
};