import React, { useState } from 'react';
import generatorInfo from './generatorInfo.json'; // Import the JSON data
import './styles.css';

export default function DocumentList({ onDocumentSelect }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Creating categories based on the generatorInfo data
  const documentCategories = generatorInfo.reduce((acc, doc) => {
    // Assuming each document has a category property
    const category = doc.category || 'Other'; // Use a default category if none is provided
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(doc);
    return acc;
  }, {});

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleDocumentClick = (slug) => {
    onDocumentSelect(slug);
  };

  return (
    <div className="column" id="document-list">
      <h2>List of documents</h2>
      {Object.keys(documentCategories).map(category => (
        <div key={category}>
          <button onClick={() => handleCategoryClick(category)}>{category}</button>
          {selectedCategory === category && (
            <ul>
              {documentCategories[category].map(doc => (
                <li key={doc.slug} onClick={() => handleDocumentClick(doc.slug)} style={{ cursor: 'pointer' }}>
                  {doc.name} ({doc.slug})
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
