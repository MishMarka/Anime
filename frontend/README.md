# MishMarka Frontend

This is the frontend application for MishMarka, an AI-powered manga generation platform.

## Features

- View list of manga charts
- View pages within each chart
- Navigate between charts and pages

## Tech Stack

- React
- React Router
- Vite (Build tool)

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm (v7 or newer)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/MishMarka/Anime.git
   cd Anime/frontend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally

## Project Structure

- `src/App.jsx` - Main application component with navigation setup
- `src/components/ChartList.jsx` - Component for displaying the list of manga charts
- `src/components/PageList.jsx` - Component for displaying the list of pages within a chart

## Future Enhancements

- API integration with the backend
- User authentication
- AI image generation integration
- Multilingual support
