// pages/callLog.js
import { useEffect, useState } from 'react';

const CallLog = () => {
  const [callLogs, setCallLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCallLogs = async () => {
      try {
        const res = await fetch('/api/getCallLogs');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Error fetching call logs');
        }

        setCallLogs(Array.isArray(data.results) ? data.results : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCallLogs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Call Logs</h1>
      <ul>
        {callLogs.length > 0 ? (
          callLogs.map((log) => (
            <li key={log.callId}>{log.log}</li>
          ))
        ) : (
          <p>No call logs found</p>
        )}
      </ul>
    </div>
  );
};

export default CallLog;
