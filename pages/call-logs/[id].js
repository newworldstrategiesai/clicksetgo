import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { format, parseISO, isValid } from 'date-fns';

const CallLogDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [callLog, setCallLog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/get-call-log?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setCallLog(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching call log:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4 text-white">Loading...</h1>
        </div>
      </Layout>
    );
  }

  if (!callLog) {
    return (
      <Layout>
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4 text-white">Call Log Not Found</h1>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Invalid date';
    const date = parseISO(dateString);
    return isValid(date) ? format(date, 'PPpp') : 'Invalid date';
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4 text-white">Call Log Details</h1>
        <div className="bg-gray-800 p-4 rounded mb-4">
          <h2 className="text-xl font-semibold text-white">Call Information</h2>
          <p className="text-white"><strong>ID:</strong> {callLog.id}</p>
          <p className="text-white"><strong>Type:</strong> {callLog.type}</p>
          <p className="text-white"><strong>Status:</strong> {callLog.status}</p>
          <p className="text-white"><strong>Started At:</strong> {formatDate(callLog.startedAt)}</p>
          <p className="text-white"><strong>Ended At:</strong> {formatDate(callLog.endedAt)}</p>
          <p className="text-white"><strong>Duration:</strong> {callLog.endedAt ? `${Math.round((new Date(callLog.endedAt) - new Date(callLog.startedAt)) / 1000)} seconds` : 'N/A'}</p>
          <p className="text-white"><strong>Caller:</strong> {callLog.customer?.number || 'Unknown'}</p>
          <p className="text-white"><strong>Assistant:</strong> {callLog.assistant?.name || 'Unknown'}</p>
          <p className="text-white"><strong>Transcript:</strong> {callLog.transcript || 'N/A'}</p>
          <p className="text-white"><strong>Recording:</strong> {callLog.recordingUrl ? <a href={callLog.recordingUrl} target="_blank" className="text-blue-500 hover:underline">Listen</a> : 'N/A'}</p>
        </div>
      </div>
    </Layout>
  );
};

export default CallLogDetail;
