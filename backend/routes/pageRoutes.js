const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

/**
 * @route   POST /api/pages
 * @desc    Create a new page
 * @access  Public (authentication will be added later)
 */
router.post('/', pageController.createPage);

/**
 * @route   GET /api/pages/chart/:chart_id
 * @desc    Get all pages for a chart
 * @access  Public (authentication will be added later)
 */
router.get('/chart/:chart_id', pageController.getPagesByChartId);

/**
 * @route   GET /api/pages/:id
 * @desc    Get page by ID
 * @access  Public (authentication will be added later)
 */
router.get('/:id', pageController.getPageById);

/**
 * @route   PUT /api/pages/:id
 * @desc    Update page by ID
 * @access  Public (authentication will be added later)
 */
router.put('/:id', pageController.updatePage);

/**
 * @route   DELETE /api/pages/:id
 * @desc    Delete page by ID
 * @access  Public (authentication will be added later)
 */
router.delete('/:id', pageController.deletePage);

module.exports = router;