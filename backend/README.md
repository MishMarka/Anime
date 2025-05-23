# MishMarka Backend

This directory contains the backend components for the MishMarka AI Manga Generator application.

## Directory Structure

- SQL migration files for Supabase database setup
- API endpoints for authentication and other functions
- Utility functions and helpers

## Database Schema

The database schema includes the following tables:
- Users (`001_users.sql`)
- Charts (`002_charts.sql`)
- Pages (`003_pages.sql`)
- Panels (`004_panels.sql`)

## API Endpoints

### Authentication

The authentication API provides the following endpoints:

- `POST /auth/signup` - Register a new user
  - Request body: `{ username, email, password }`
  - Response: User information and authentication token

- `POST /auth/signin` - Authenticate an existing user
  - Request body: `{ email, password }`
  - Response: User information and authentication token

## Getting Started

To set up the backend:

1. Configure your Supabase instance
2. Run the SQL migration files in numerical order
3. Set up environment variables for authentication and API access
4. Deploy or run the API server locally