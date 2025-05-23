const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

/**
 * @swagger
 * /pages:
 *   post:
 *     summary: Create a new page
 *     tags: [Pages]
 *     description: Create a new page for a chart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - chart_id
 *               - order
 *             properties:
 *               title:
 *                 type: string
 *                 description: Page title
 *               chart_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the chart this page belongs to
 *               layout:
 *                 type: object
 *                 description: Page layout configuration
 *               order:
 *                 type: integer
 *                 description: Order of the page within the chart
 *           example:
 *             title: "Season Rankings"
 *             chart_id: "550e8400-e29b-41d4-a716-446655440000"
 *             layout: { "layout_type": "grid", "columns": 3 }
 *             order: 1
 *     responses:
 *       201:
 *         description: Page created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Page'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', pageController.createPage);

/**
 * @swagger
 * /pages/chart/{chart_id}:
 *   get:
 *     summary: Get all pages for a chart
 *     tags: [Pages]
 *     description: Retrieve a list of all pages for a specific chart
 *     parameters:
 *       - in: path
 *         name: chart_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Chart ID
 *     responses:
 *       200:
 *         description: List of pages for the chart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Page'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/chart/:chart_id', pageController.getPagesByChartId);

/**
 * @swagger
 * /pages/{id}:
 *   get:
 *     summary: Get a page by ID
 *     tags: [Pages]
 *     description: Retrieve a specific page by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Page ID
 *     responses:
 *       200:
 *         description: Page found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Page'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', pageController.getPageById);

/**
 * @swagger
 * /pages/{id}:
 *   put:
 *     summary: Update a page
 *     tags: [Pages]
 *     description: Update a specific page by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Page ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Page title
 *               layout:
 *                 type: object
 *                 description: Page layout configuration
 *               order:
 *                 type: integer
 *                 description: Order of the page within the chart
 *           example:
 *             title: "Updated Page Title"
 *             layout: { "layout_type": "list" }
 *             order: 2
 *     responses:
 *       200:
 *         description: Page updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Page'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put('/:id', pageController.updatePage);

/**
 * @swagger
 * /pages/{id}:
 *   delete:
 *     summary: Delete a page
 *     tags: [Pages]
 *     description: Delete a specific page by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Page ID
 *     responses:
 *       200:
 *         description: Page deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Page deleted successfully"
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', pageController.deletePage);

module.exports = router;