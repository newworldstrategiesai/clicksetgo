import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { format, parseISO, isValid } from 'date-fns';

// Function to format phone numbers to the Twilio format
const formatPhoneNumber = (phoneNumber) => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+${match[1]}${match[2]}${match[3]}${match[4]}`;
  }
  return phoneNumber; // Return original if formatting fails
};

const formatDate = (dateString) => {
  if (!dateString) return 'Invalid date';
  const date = parseISO(dateString);
  return isValid(date) ? format(date, 'PPpp') : 'Invalid date';
};

const ContactDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [contact, setContact] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [callLogs, setCallLogs] = useState([]);

  useEffect(() => {
    if (id) {
      // Fetch contact details
      fetch(`/api/get-contact?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setContact(data);
        })
        .catch((error) => {
          console.error('Error fetching contact details:', error);
        });

      // Fetch past conversations
      fetch(`/api/get-conversations?phoneNumber=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setConversations(data);
        })
        .catch((error) => {
          console.error('Error fetching conversations:', error);
        });

      // Fetch call logs
      fetch(`/api/get-call-logs?number=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setCallLogs(data);
        })
        .catch((error) => {
          console.error('Error fetching call logs:', error);
        });
    }
  }, [id]);

  if (!contact) {
    return (
      <Layout>
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4 text-black">Loading...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4">
        <div className="mb-4 bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold text-white">Contact Information</h2>
          <p className="text-white"><strong>First Name:</strong> {contact.firstName}</p>
          <p className="text-white"><strong>Last Name:</strong> {contact.lastName}</p>
          <p className="text-white"><strong>Phone Number:</strong> {formatPhoneNumber(contact.phoneNumber)}</p>
          {/* Add more fields as necessary */}
        </div>
        <h2 className="text-xl font-semibold mb-4 text-white">Past Conversations</h2>
        <div className="bg-white border border-gray-200 p-4">
          {conversations.length > 0 ? (
            conversations.map((msg, index) => (
              <div key={index} className="mb-2 text-black">
                <span className="text-gray-500 mr-2">{new Date(msg.dateSent).toLocaleString()}</span>
                <strong>{msg.from === process.env.TWILIO_PHONE_NUMBER ? 'Me' : msg.from}:</strong> {msg.body}
              </div>
            ))
          ) : (
            <p className="text-black">No past conversations available.</p>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4 text-white">Call Logs</h2>
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
              {callLogs.length > 0 ? (
                callLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.customer?.number || 'Unknown'}</td>
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

export default ContactDetails;
