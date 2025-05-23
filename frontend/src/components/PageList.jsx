import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PageList = () => {
  const { chartId } = useParams();
  // This is a placeholder for the pages data
  // In a real implementation, this would come from an API
  const [pages, setPages] = useState([]);
  const [chartTitle, setChartTitle] = useState('');

  useEffect(() => {
    // Mock data - in a real app, this would be fetched from an API
    setChartTitle(`Chart ${chartId}`);
    
    // Generate 30 pages as mentioned in the project requirements
    const mockPages = Array.from({ length: 30 }, (_, index) => ({
      id: index + 1,
      title: `Page ${index + 1}`,
      thumbnail: 'placeholder-image.jpg'
    }));
    
    setPages(mockPages);
  }, [chartId]);

  return (
    <div className="page-list">
      <h2>Pages for {chartTitle}</h2>
      <Link to="/">Back to Charts</Link>
      <div className="pages-grid">
        {pages.map((page) => (
          <div key={page.id} className="page-item">
            <h3>{page.title}</h3>
            <p>This is a placeholder for page content</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageList;