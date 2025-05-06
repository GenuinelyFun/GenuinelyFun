import { useEffect, useState } from 'react';

const DataChangeDatabase = () => {
  const [connectionInfo, setConnectionInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://genuinelyfun.com/backend/bridge/db_bridge_datachange.php')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        try {
          setConnectionInfo(data);
        } catch (err) {
          throw new Error('Invalid JSON response: ' + err);
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main>
      <h1>Datachange Database Connection</h1>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <pre>{JSON.stringify(connectionInfo, null, 2)}</pre>
      )}
    </main>
  );
};

export default DataChangeDatabase;
