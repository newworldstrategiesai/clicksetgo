import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { format, parseISO, isValid } from 'date-fns';
import { supabase } from '../utils/supabaseClient';
import fetchAndStoreCallLogs from '../utils/fetchAndStoreCallLogs';

const formatDate = (dateString) => {
  if (!dateString) return 'Invalid date';
  const date = parseISO(dateString);
  return isValid(date) ? format(date, 'PPpp') : 'Invalid date';
};

const CallLogs = () => {
  const [callLogs, setCallLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCallLogs = async () => {
      const { data, error } = await supabase.from('call_logs').select('*');
      if (error) {
        console.error('Error fetching call logs from Supabase:', error);
      } else {
        setCallLogs(data);
      }
    };

    // Fetch call logs initially
    fetchCallLogs();
    fetchAndStoreCallLogs(); // Fetch and store the latest call logs from VAPI

    // Set up interval to fetch call logs periodically
    const intervalId = setInterval(async () => {
      await fetchAndStoreCallLogs();
      fetchCallLogs();
    }, 30000); // Fetch new call logs every 30 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const filteredCallLogs = callLogs.filter((log) =>
    log.customer?.number?.includes(searchQuery) ||
    log.assistant?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.transcript?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4 text-white">Call Logs</h1>
        <input
          type="text"
          className="mb-4 p-2 border text-black"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="bg-white border border-gray-200 p-4 overflow-auto" style={{ maxHeight: 'calc(100vh - 8rem)', maxWidth: 'calc(100vw - 18rem)' }}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Caller</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Started At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ended At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assistant</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCallLogs.length > 0 ? (
                filteredCallLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.customer ? (
                        <a href={`/contacts/${log.customer.number}`} className="text-blue-500">
                          {log.customer.number}
                        </a>
                      ) : (
                        'Unknown'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(log.startedAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(log.endedAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.duration} seconds</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.assistant?.name || 'Unknown'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">No call logs available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CallLogs;
