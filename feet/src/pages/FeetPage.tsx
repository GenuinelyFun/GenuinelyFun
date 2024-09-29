import { ChangeEvent, DragEventHandler, useState } from 'react';
import './FeetPage.css';
import { Root } from '../interfaces/jsonDataInterface';

const FeetPage = (): JSX.Element => {
  const [json, setJson] = useState<Root>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUploadedFile = (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file, 'UTF-8');
    fileReader.onload = (e) => {
      if (e.target?.result) {
        setJson(JSON.parse(e.target.result.toString()));
        setLoading(false);
      } else {
        setError(true);
      }
    };
  };
  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setError(false);
    setLoading(true);
    handleUploadedFile(event.dataTransfer.files[0]);
  };

  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    if (event.target.files?.[0]) {
      handleUploadedFile(event.target.files[0]);
    } else {
      setError(true);
    }
  };

  return (
    <div className="upload-window">
      {json ? (
        <div className="drag-drop-container">Success</div>
      ) : (
        <>
          <div
            className="drag-drop-container"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
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
          {error && (
            <p className="upload-error">
              Something went wrong, please try again later.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default FeetPage;
