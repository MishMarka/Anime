# MishMarka Backend

This directory contains the backend components for the MishMarka AI Manga Generator application.

## Overview

The backend uses [Supabase](https://supabase.com/) as its primary backend service, providing:
- PostgreSQL database for data storage
- Authentication services
- Storage for assets
- Serverless functions

## Database Schema

The database schema consists of four main tables:
- `users` - User account information
- `charts` - Manga projects/chapters
- `pages` - Individual manga pages within charts
- `panels` - Image panels within pages

SQL migration files for these tables are included in this directory.

## Local Development Setup

### Environment Variables

For local development, the application connects to the **remote Supabase cloud database**. You don't need to run a local database instance.

1. Create a `.env` file in the project root by copying from the example:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your Supabase credentials and AI service secrets:
   ```
   SUPABASE_URL=https://your-project-url.supabase.co
   SUPABASE_KEY=your-supabase-anon-key
   HUGGING_FACE_API_KEY=your-huggingface-api-key
   ```

3. These environment variables will be automatically picked up by the application when running locally.

### Important Notes

- **No local database required**: The application uses the remote Supabase cloud instance for development, so you don't need to set up a local database.
- **Authentication**: Your Supabase project already provides authentication mechanisms.
- **Data persistence**: All data will be stored in your remote Supabase project.

## Deployment

### Netlify Deployment

When deploying to Netlify:

1. Netlify will automatically provision and connect the necessary environment variables for Supabase in production.
2. Set up the environment variables in the Netlify dashboard or through the `netlify.toml` file.
3. Ensure your production Supabase instance has the correct database schema applied.

## Advanced Setup (Optional)

If you prefer to work with a local Supabase instance for development:

1. Install the [Supabase CLI](https://supabase.com/docs/guides/cli)
2. Initialize a local Supabase project:
   ```bash
   supabase init
   ```
3. Start the local Supabase services:
   ```bash
   supabase start
   ```
4. Update your `.env` file to point to the local instance:
   ```
   SUPABASE_URL=http://localhost:54321
   SUPABASE_KEY=your-local-anon-key
   ```

Note that this advanced setup is optional and not required for regular development work.

## Contributing

When contributing to the backend:

1. Ensure any database schema changes are added as new SQL migration files
2. Document any environment variable changes in the `.env.example` file
3. Test your changes against the remote Supabase instance before submitting a PR