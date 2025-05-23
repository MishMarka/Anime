# MishMarka Backend

This directory contains the backend code for the MishMarka AI Manga Generator.

## Database Schema

The database schema is defined in SQL migration files:

- `001_users.sql`: User account information
- `002_charts.sql`: Manga charts/chapters
- `003_pages.sql`: Manga pages within charts
- `004_panels.sql`: Panels within pages

## API Routes

### Charts API

The charts API provides endpoints for managing manga charts/chapters:

- `GET /charts`: Get all charts for the authenticated user
- `POST /charts`: Create a new chart
- `GET /charts/:id`: Get a specific chart by ID
- `PUT /charts/:id`: Update a specific chart
- `DELETE /charts/:id`: Delete a specific chart

### Pages API

The pages API provides endpoints for managing pages within charts:

- `GET /charts/:chartId/pages`: Get all pages for a specific chart
- `POST /charts/:chartId/pages`: Create a new page within a chart
- `GET /charts/:chartId/pages/:id`: Get a specific page by ID
- `PUT /charts/:chartId/pages/:id`: Update a specific page
- `DELETE /charts/:chartId/pages/:id`: Delete a specific page