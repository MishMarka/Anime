import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PageForm from './components/PageForm';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>MishMarka: AI Manga Generator</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/create-page">Create Page</Link>
              </li>
            </ul>
          </nav>
        </header>
        
        <main>
          <Routes>
            <Route path="/create-page" element={<PageForm />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Simple Home component
function Home() {
  return (
    <div className="home">
      <h2>Welcome to MishMarka</h2>
      <p>The AI-powered platform for creating original anime-style manga.</p>
      <div className="cta-button">
        <Link to="/create-page">Create New Page</Link>
      </div>
    </div>
  );
}

export default App;
