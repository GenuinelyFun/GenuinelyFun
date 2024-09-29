import React from 'react';
import './FeetPage.css';

const FeetPage = (): JSX.Element => {
  const handleDragEvent = (
    event: React.DragEvent<HTMLDivElement>,
    action: string,
  ) => {
    event.preventDefault();
    if (action === 'drop') {
      // Handle file drop
    }
  };

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file selection
  };

  return (
    <div className="feetpage">
      <div className="upload-window">
        <div
          className="drag-drop-container"
          onDrop={(e) => handleDragEvent(e, 'drop')}
          onDragOver={(e) => handleDragEvent(e, 'dragover')}
          onDragLeave={(e) => handleDragEvent(e, 'dragleave')}
        >
          <p>You can drag and drop the JSON file to upload</p>
          <p>or</p>
          <input
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            onChange={onFileSelected}
          />
          <button
            className="upload-btn"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            Browse Computer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeetPage;
