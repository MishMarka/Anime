const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');
const { verifyToken } = require('../middleware/authMiddleware');

/**
 * @route   POST /api/charts
 * @desc    Create a new chart
 * @access  Private (requires authentication)
 */
router.post('/', verifyToken, chartController.createChart);

/**
 * @route   GET /api/charts
 * @desc    Get all charts (can filter by user_id via query parameter)
 * @access  Private (requires authentication)
 */
router.get('/', verifyToken, chartController.getAllCharts);

/**
 * @route   GET /api/charts/:id
 * @desc    Get chart by ID
 * @access  Private (requires authentication)
 */
router.get('/:id', verifyToken, chartController.getChartById);

/**
 * @route   PUT /api/charts/:id
 * @desc    Update chart by ID
 * @access  Private (requires authentication)
 */
router.put('/:id', verifyToken, chartController.updateChart);

/**
 * @route   DELETE /api/charts/:id
 * @desc    Delete chart by ID
 * @access  Private (requires authentication)
 */
router.delete('/:id', verifyToken, chartController.deleteChart);

module.exports = router;