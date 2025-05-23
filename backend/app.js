const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

// Load environment variables
dotenv.config();

// Import route files
const userRoutes = require('./routes/userRoutes');
const chartRoutes = require('./routes/chartRoutes');
const pageRoutes = require('./routes/pageRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();

// Configure middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Check if the API is up and running
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is functioning properly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: API is up and running
 */

// Set up Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Anime Charting API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true
  }
}));

// Register routes with prefixes
app.use('/api/users', userRoutes);
app.use('/api/charts', chartRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/auth', authRoutes);

// Basic route for API health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is up and running' });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Set port and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api/docs`);
});

module.exports = app;