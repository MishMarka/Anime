# Anime Backend API

This is the backend API for the Anime charting application.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your Supabase credentials

3. Start the server:
   ```
   npm start
   ```
   
   For development with auto-reload:
   ```
   npm run dev
   ```

## API Documentation

The API is documented using OpenAPI (Swagger) specification. When the server is running, you can access the interactive API documentation at:

```
http://localhost:3000/api/docs
```

The documentation includes:
- All available endpoints and operations
- Request parameters and body schemas
- Response formats and examples
- Authentication requirements

The documentation is automatically updated when the API changes, as it's generated from JSDoc annotations in the code.

## API Routes

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user information (requires authentication)

### Users
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user by ID
- `DELETE /api/users/:id` - Delete user by ID

### Charts
- `POST /api/charts` - Create a new chart
- `GET /api/charts` - Get all charts
- `GET /api/charts/:id` - Get chart by ID
- `PUT /api/charts/:id` - Update chart by ID
- `DELETE /api/charts/:id` - Delete chart by ID

### Pages
- `POST /api/pages` - Create a new page
- `GET /api/pages/chart/:chart_id` - Get all pages for a chart
- `GET /api/pages/:id` - Get page by ID
- `PUT /api/pages/:id` - Update page by ID
- `DELETE /api/pages/:id` - Delete page by ID

## Health Check
- `GET /api/health` - Check if the API is running