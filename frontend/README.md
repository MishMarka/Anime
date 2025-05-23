# MishMarka Frontend

React-based frontend for MishMarka, an AI-powered manga generator.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

## Components

### Authentication

- **SignUp.js**: Component with a form for new user registration (email, password)
- **SignIn.js**: Component with a form for user authentication (email, password)

### Navigation

The App component includes navigation links for:
- Home
- Sign Up
- Sign In

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── SignIn.js
│   │   └── SignUp.js
│   ├── App.js
│   └── index.js
└── package.json
```

## Future Development

Authentication components currently include basic forms without API integration or validation. These will be connected to the backend services in future updates.