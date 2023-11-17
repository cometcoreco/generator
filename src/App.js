import React, { useState } from 'react';
import Header from './Header';
import DocumentList from './DocumentList';
import FormContainer from './FormContainer';
import Result from './Result';
import './styles.css';
import generatorInfo from './generatorInfo.json';

function App() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [resultData, setResultData] = useState(null);

  const handleDocumentSelect = (slug) => {
    const selectedDoc = generatorInfo.find(doc => doc.slug === slug);
    setSelectedDocument(slug);
    setDocumentData(selectedDoc);
    setResultData(null); // Clear previous result when a new document is selected
  };

  const updateResultData = (newData) => {
    setResultData(newData);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <DocumentList documents={generatorInfo} onDocumentSelect={handleDocumentSelect} />
        <FormContainer documentData={documentData} onUpdateResultData={updateResultData} />
        <Result resultData={resultData} previewImageUrl={documentData?.preview} />
      </div>
    </div>
  );
}

export default App;
