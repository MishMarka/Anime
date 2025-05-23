# Contributing to MishMarka: AI Manga Generator

Thank you for your interest in contributing to MishMarka! This document provides guidelines for contributing to the project.

## Development Workflow

### Prerequisites

- Node.js (v14 or higher)
- Git
- A Supabase account (for backend development)
- A Netlify account (for deployment)

### Setting Up the Development Environment

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/Anime.git`
3. Install dependencies:
   ```
   cd Anime
   cd backend && npm install
   cd ../frontend && npm install
   ```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

- All pull requests and pushes run linting and tests automatically
- Merges to `main` trigger automatic deployment to Netlify

## Pull Request Process

1. Create a new branch for your feature or bugfix: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Run tests and linting: `npm test` and `npm run lint` in both backend and frontend directories
4. Commit your changes with a descriptive commit message
5. Push your branch to GitHub: `git push origin feature/your-feature-name`
6. Open a pull request against the `main` branch

## Code Style

- We use ESLint for JavaScript/TypeScript code
- Follow existing code patterns and organization
- Write clear comments and documentation

Thank you for contributing!