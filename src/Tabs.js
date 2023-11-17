import React, { useEffect, useState } from 'react';
import './styles.css';

export default function Tabs({ selectedDocument }) {
  const [documentForm, setDocumentForm] = useState(null);

  useEffect(() => {
    if (selectedDocument) {
      // Fetch the form details for the selected document
      // Example: fetch(`https://old.verif.tools/api/integration/generator-full-information/${selectedDocument}`)
      // Then set the form data in state
    }
  }, [selectedDocument]);

  return (
    <div className="column" id="tabs">
      {/* Render the form based on documentForm data */}
    </div>
  );
}
