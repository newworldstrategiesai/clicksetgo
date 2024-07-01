import React, { useState } from 'react';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';

const UploadContacts = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }
    setLoading(true);
    setMessage('');
    setLog((prevLog) => [...prevLog, 'Uploading file...']);

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload-contacts', true);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        setProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      setLoading(false);
      console.log('Raw response text:', xhr.responseText);  // Log raw response text
      try {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status === 200) {
          setMessage(response.message);
          setLog((prevLog) => [...prevLog, 'File uploaded successfully.']);
        } else {
          setMessage(response.error);
          setLog((prevLog) => [...prevLog, 'Failed to upload file.']);
        }
      } catch (error) {
        console.error('Parsing error:', error.message);
        setMessage('Unexpected response from server.');
        setLog((prevLog) => [...prevLog, 'Unexpected response from server.']);
      }
    };

    xhr.onerror = () => {
      setLoading(false);
      setMessage('Failed to upload file.');
      setLog((prevLog) => [...prevLog, 'Failed to upload file.']);
    };

    xhr.send(formData);
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Upload Contacts</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit" className="p-2 bg-blue-500 text-white">Upload</button>
        </form>
        {loading && <LoadingSpinner />}
        {progress > 0 && (
          <div className="w-full bg-gray-200 rounded-full mt-4">
            <div
              className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${progress}%` }}
            >
              {`${Math.round(progress)}%`}
            </div>
          </div>
        )}
        {message && <p>{message}</p>}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Log</h2>
          <ul className="list-disc pl-5">
            {log.map((logMessage, index) => (
              <li key={index}>{logMessage}</li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default UploadContacts;
