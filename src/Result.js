import React from 'react';
import './styles.css';

const Result = ({ resultData, previewImageUrl }) => {
  const isImageUrl = resultData && (resultData.startsWith("http://") || resultData.startsWith("https://"));
  
  const imageUrl = isImageUrl ? resultData : previewImageUrl;

  return (
    <div className="column" id="result">
      <h2>Result</h2>
      {imageUrl ? (
        <img src={imageUrl} alt="Document Preview" />
      ) : (
        <p>No result to display</p>
      )}
    </div>
  );
};

export default Result;
