const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');

/**
 * @swagger
 * /charts:
 *   post:
 *     summary: Create a new chart
 *     tags: [Charts]
 *     description: Create a new chart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - user_id
 *             properties:
 *               title:
 *                 type: string
 *                 description: Chart title
 *               description:
 *                 type: string
 *                 description: Chart description
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user who owns the chart
 *           example:
 *             title: "My Anime Rankings"
 *             description: "Top anime of all time"
 *             user_id: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       201:
 *         description: Chart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chart'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', chartController.createChart);

/**
 * @swagger
 * /charts:
 *   get:
 *     summary: Get all charts
 *     tags: [Charts]
 *     description: Retrieve a list of all charts, optionally filtered by user_id
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter charts by user ID
 *     responses:
 *       200:
 *         description: List of charts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chart'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', chartController.getAllCharts);

/**
 * @swagger
 * /charts/{id}:
 *   get:
 *     summary: Get a chart by ID
 *     tags: [Charts]
 *     description: Retrieve a specific chart by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Chart ID
 *     responses:
 *       200:
 *         description: Chart found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chart'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', chartController.getChartById);

/**
 * @swagger
 * /charts/{id}:
 *   put:
 *     summary: Update a chart
 *     tags: [Charts]
 *     description: Update a specific chart by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Chart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Chart title
 *               description:
 *                 type: string
 *                 description: Chart description
 *           example:
 *             title: "Updated Anime Rankings"
 *             description: "Updated description"
 *     responses:
 *       200:
 *         description: Chart updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chart'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put('/:id', chartController.updateChart);

/**
 * @swagger
 * /charts/{id}:
 *   delete:
 *     summary: Delete a chart
 *     tags: [Charts]
 *     description: Delete a specific chart by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Chart ID
 *     responses:
 *       200:
 *         description: Chart deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Chart deleted successfully"
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', chartController.deleteChart);

module.exports = router;