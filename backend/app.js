const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import route files
const userRoutes = require('./routes/userRoutes');
const chartRoutes = require('./routes/chartRoutes');
const pageRoutes = require('./routes/pageRoutes');
const authRoutes = require('./routes/authRoutes');

// Import error handling middleware
const { errorHandler, notFoundHandler, handleValidationErrors } = require('./middleware/errorMiddleware');

// Initialize Express app
const app = express();

// Configure middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add validation error handling middleware
app.use(handleValidationErrors);

// Register routes with prefixes
app.use('/api/users', userRoutes);
app.use('/api/charts', chartRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/auth', authRoutes);

// Basic route for API health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is up and running' });
});

// Handle 404 errors - must come after all valid routes
app.use(notFoundHandler);

// Global error handler - must be the last middleware
app.use(errorHandler);

// Set port and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;