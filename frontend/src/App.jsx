import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChartList from './components/ChartList';
import PageList from './components/PageList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>MishMarka Manga Generator</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ChartList />} />
            <Route path="/pages/:chartId" element={<PageList />} />
          </Routes>
        </main>
        <footer>
          <p>MishMarka - AI Manga Generator</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
