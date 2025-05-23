const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const { verifyToken } = require('../middleware/authMiddleware');

/**
 * @route   POST /api/pages
 * @desc    Create a new page
 * @access  Private (requires authentication)
 */
router.post('/', verifyToken, pageController.createPage);

/**
 * @route   GET /api/pages/chart/:chart_id
 * @desc    Get all pages for a chart
 * @access  Private (requires authentication)
 */
router.get('/chart/:chart_id', verifyToken, pageController.getPagesByChartId);

/**
 * @route   GET /api/pages/:id
 * @desc    Get page by ID
 * @access  Private (requires authentication)
 */
router.get('/:id', verifyToken, pageController.getPageById);

/**
 * @route   PUT /api/pages/:id
 * @desc    Update page by ID
 * @access  Private (requires authentication)
 */
router.put('/:id', verifyToken, pageController.updatePage);

/**
 * @route   DELETE /api/pages/:id
 * @desc    Delete page by ID
 * @access  Private (requires authentication)
 */
router.delete('/:id', verifyToken, pageController.deletePage);

module.exports = router;