const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Create a new page
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createPage = async (req, res) => {
  try {
    const { chart_id, page_number, text_content } = req.body;

    // Validation
    if (!chart_id || !page_number) {
      return res.status(400).json({ error: 'Chart ID and page number are required' });
    }

    // Create new page
    const { data, error } = await supabase
      .from('pages')
      .insert([
        { 
          chart_id, 
          page_number, 
          text_content: text_content || null
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating page:', error);
    return res.status(500).json({ error: 'Failed to create page' });
  }
};

/**
 * Get all pages
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllPages = async (req, res) => {
  try {
    // Optional query parameters
    const { chart_id } = req.query;
    
    let query = supabase.from('pages').select('*');
    
    // Add filter if chart_id is provided
    if (chart_id) {
      query = query.eq('chart_id', chart_id);
    }
    
    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching pages:', error);
    return res.status(500).json({ error: 'Failed to fetch pages' });
  }
};

/**
 * Get page by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPageById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Page not found' });
      }
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching page:', error);
    return res.status(500).json({ error: 'Failed to fetch page' });
  }
};

/**
 * Update page by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const { page_number, text_content } = req.body;

    // Update page and return the updated record
    const { data, error } = await supabase
      .from('pages')
      .update({ 
        page_number, 
        text_content
      })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Page not found' });
    }

    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating page:', error);
    return res.status(500).json({ error: 'Failed to update page' });
  }
};

/**
 * Delete page by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deletePage = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete page
    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting page:', error);
    return res.status(500).json({ error: 'Failed to delete page' });
  }
};

module.exports = {
  createPage,
  getAllPages,
  getPageById,
  updatePage,
  deletePage
};