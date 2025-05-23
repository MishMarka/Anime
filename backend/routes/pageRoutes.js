const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const { pageValidation } = require('../middleware/validationMiddleware');
const { handleValidationErrors } = require('../middleware/errorMiddleware');

/**
 * @route   POST /api/pages
 * @desc    Create a new page
 * @access  Public (authentication will be added later)
 */
router.post('/', 
  pageValidation.createPage,
  handleValidationErrors,
  pageController.createPage
);

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
router.get('/:id', 
  pageValidation.getPageById,
  handleValidationErrors,
  pageController.getPageById
);

/**
 * @route   PUT /api/pages/:id
 * @desc    Update page by ID
 * @access  Public (authentication will be added later)
 */
router.put('/:id', 
  pageValidation.updatePage,
  handleValidationErrors,
  pageController.updatePage
);

/**
 * @route   DELETE /api/pages/:id
 * @desc    Delete page by ID
 * @access  Public (authentication will be added later)
 */
router.delete('/:id', 
  pageValidation.deletePage,
  handleValidationErrors,
  pageController.deletePage
);

module.exports = router;