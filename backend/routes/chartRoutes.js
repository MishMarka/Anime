const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');
const { chartValidation } = require('../middleware/validationMiddleware');
const { handleValidationErrors } = require('../middleware/errorMiddleware');

/**
 * @route   POST /api/charts
 * @desc    Create a new chart
 * @access  Public (authentication will be added later)
 */
router.post('/', 
  chartValidation.createChart,
  handleValidationErrors,
  chartController.createChart
);

/**
 * @route   GET /api/charts
 * @desc    Get all charts (can filter by user_id via query parameter)
 * @access  Public (authentication will be added later)
 */
router.get('/', chartController.getAllCharts);

/**
 * @route   GET /api/charts/:id
 * @desc    Get chart by ID
 * @access  Public (authentication will be added later)
 */
router.get('/:id', 
  chartValidation.getChartById,
  handleValidationErrors,
  chartController.getChartById
);

/**
 * @route   PUT /api/charts/:id
 * @desc    Update chart by ID
 * @access  Public (authentication will be added later)
 */
router.put('/:id', 
  chartValidation.updateChart,
  handleValidationErrors,
  chartController.updateChart
);

/**
 * @route   DELETE /api/charts/:id
 * @desc    Delete chart by ID
 * @access  Public (authentication will be added later)
 */
router.delete('/:id', 
  chartValidation.deleteChart,
  handleValidationErrors,
  chartController.deleteChart
);

module.exports = router;