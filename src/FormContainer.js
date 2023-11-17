import React, { useState, useEffect } from 'react';
import './styles.css';

const FormContainer = ({ documentData, onUpdateResultData }) => {
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (documentData) {
      const initialFormData = {};
      documentData.steps.forEach(step => {
        step.fields.forEach(field => {
          initialFormData[field.input_name] = field.value || '';
        });
      });
      setFormData(initialFormData);
    }
  }, [documentData]);

  const handleInputChange = (e, inputName) => {
    setFormData({ ...formData, [inputName]: e.target.value });
  };

  const handleFileChange = (e, inputName) => {
    setFileData({ ...fileData, [inputName]: e.target.files[0] });
  };

  const handleGenerateClick = async () => {
    setIsProcessing(true);
    const apiEndpoint = 'https://old.verif.tools/api/integration/generate/';
    const data = new FormData();

    if (documentData?.slug) {
      data.append('generator', documentData.slug);
    } else {
      alert('The document slug is missing.');
      setIsProcessing(false);
      return;
    }

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    for (const key in fileData) {
      data.append(key, fileData[key]);
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': 'Basic ' + btoa('badboujiestore@gmail.com:badboujiestore@gmail.com')
        }
      });

      if (response.ok) {
        const result = await response.json();
        onUpdateResultData(result.image_url);
      } else {
        const errorText = await response.text();
        alert(`Error processing image: ${errorText}`);
      }
    } catch (error) {
      alert(`Network or other error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="form-container">
      {documentData && (
        <>
          <h2>{documentData.name}</h2>
          {documentData.steps.map(step => (
            <div key={step.id}>
              <h3>{step.name}</h3>
              {step.fields.map(field =>
                field.type === 'file' ? (
                  <div key={field.id} className="field-wrapper">
                    <label>{field.input_label}</label>
                    <input 
                      type="file" 
                      onChange={(e) => handleFileChange(e, field.input_name)}
                    />
                  </div>
                ) : (
                  <div key={field.id} className="field-wrapper">
                    <label>{field.input_label}</label>
                    <input 
                      type={field.type} 
                      value={formData[field.input_name] || ''} 
                      onChange={(e) => handleInputChange(e, field.input_name)}
                      placeholder={field.input_placeholder}
                    />
                  </div>
                )
              )}
            </div>
          ))}
          <button onClick={handleGenerateClick} disabled={isProcessing}>
            Generate
          </button>
          {isProcessing && <p>Please wait...</p>}
        </>
      )}
    </div>
  );
};

export default FormContainer;
