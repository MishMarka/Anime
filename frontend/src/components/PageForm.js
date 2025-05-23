import React, { useState } from 'react';
import './PageForm.css';

const PageForm = () => {
  const [pageData, setPageData] = useState({
    text: '',
    language: 'english',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPageData({
      ...pageData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPageData({
        ...pageData,
        image: e.target.files[0]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic will be implemented later
    console.log('Form submitted:', pageData);
  };

  return (
    <div className="page-form-container">
      <h2>Create New Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Page Text</label>
          <textarea
            id="text"
            name="text"
            value={pageData.text}
            onChange={handleChange}
            rows="6"
            placeholder="Enter the text for this page"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            value={pageData.language}
            onChange={handleChange}
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="japanese">Japanese</option>
            <option value="chinese">Chinese</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <button type="submit" className="submit-button">Create Page</button>
      </form>
    </div>
  );
};

export default PageForm;