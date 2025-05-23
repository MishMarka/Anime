# Backend

This directory contains the backend code for the MishMarka Anime project, including database migrations, API scripts, and utility functions.

## Structure

- `/setup` - Contains initialization code for various services
  - `supabase.js` - Supabase client setup
  - `ai.js` - AI service initialization

- SQL Files - Database migration scripts
  - `001_users.sql` - User-related tables
  - `002_charts.sql` - Manga chapter structures
  - `003_pages.sql` - Manga page configurations
  - `004_panels.sql` - Individual manga panels

## Setup

### Environment Variables

The backend services require several environment variables to be set up correctly. Follow these steps to configure your environment:

1. Copy the `.env.example` file to a new `.env` file in the root directory:
   ```
   cp .env.example .env
   ```

2. Fill in the required environment variables in the `.env` file:
   
   - **Supabase Configuration**:
     - `SUPABASE_URL`: Your Supabase project URL (found in your Supabase dashboard)
     - `SUPABASE_SERVICE_KEY`: Your Supabase service role API key (found in your Supabase dashboard)
   
   - **AI Provider Configuration**:
     - `OPENAI_API_KEY`: Your OpenAI API key (if using OpenAI)
     - Add other AI provider keys as needed (e.g., HUGGINGFACE_API_KEY)

### Database Setup

The SQL files in this directory are used to set up the database schema in Supabase. They should be executed in numerical order to ensure proper table relationships.

#### Database Schema

The database consists of the following main tables:

1. **Users** - Stores user information and authentication details
2. **Charts** - Represents manga chapters/story arcs
3. **Pages** - Individual manga pages within a chapter
4. **Panels** - Individual panels within a page, containing AI-generated images and text

### AI Integration

The project uses various AI models for text generation, image creation, and translation. The `setup/ai.js` file provides placeholders for initializing these services.

To integrate with AI providers:

1. Obtain API keys from your chosen providers (OpenAI, Hugging Face, etc.)
2. Add the API keys to your `.env` file
3. Update the `setup/ai.js` file with the appropriate initialization code

## Development

When developing backend features:

1. Ensure your environment variables are correctly set up
2. Use the Supabase client from `setup/supabase.js` for database operations
3. Use AI services from `setup/ai.js` for text and image generation
4. Follow the existing database schema for new features