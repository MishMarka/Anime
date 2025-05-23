# MishMarka Backend

This directory contains the backend code for the MishMarka anime/manga application.

## Database

The SQL migration files define the database schema:
- `001_users.sql`: User accounts table
- `002_charts.sql`: Manga charts table
- `003_pages.sql`: Chart pages table
- `004_panels.sql`: Page panels table

## Models

The `models` directory contains JavaScript class definitions for the main entities:
- `User.js`: User account model with id, email, and password
- `Chart.js`: Manga chart model with id, title, summary, and language
- `Page.js`: Chart page model with id, chartId, text, language, and imageUrl

These are currently placeholder models with no database integration.