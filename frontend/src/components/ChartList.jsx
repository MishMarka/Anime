import { useState } from 'react';
import { Link } from 'react-router-dom';

const ChartList = () => {
  // This is a placeholder for the charts data
  // In a real implementation, this would come from an API
  const [charts, setCharts] = useState([
    { id: 1, title: 'My First Manga', createdAt: '2023-10-01' },
    { id: 2, title: 'Adventure Story', createdAt: '2023-10-15' },
    { id: 3, title: 'Space Explorer', createdAt: '2023-11-05' },
  ]);

  return (
    <div className="chart-list">
      <h2>My Manga Charts</h2>
      <ul>
        {charts.map((chart) => (
          <li key={chart.id}>
            <Link to={`/pages/${chart.id}`}>
              <h3>{chart.title}</h3>
              <p>Created: {chart.createdAt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChartList;