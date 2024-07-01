// pages/sms-text-conversations.js
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { format, parseISO, isValid } from 'date-fns';
import { supabase } from '../utils/supabaseClient';

const SmsTextConversations = () => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newThreadMessage, setNewThreadMessage] = useState('');
  const [activeMessage, setActiveMessage] = useState('');
  const [contactInfo, setContactInfo] = useState({ firstName: '', lastName: '' });

  useEffect(() => {
    const fetchMessages = async () => {
      const { data: messages, error } = await supabase.from('messages').select('*');

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        const threadsMap = messages.reduce((acc, message) => {
          const phoneNumber = message.from === process.env.TWILIO_PHONE_NUMBER ? message.to : message.from;
          if (!acc[phoneNumber]) {
            acc[phoneNumber] = { contact: phoneNumber, messages: [] };
          }
          acc[phoneNumber].messages.push(message);
          return acc;
        }, {});
        const threadsArray = Object.values(threadsMap);
        setThreads(threadsArray);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSelectThread = (thread) => {
    setSelectedThread(thread);
    setActiveMessage(''); // Clear the active message input when selecting a new thread
  };

  const handleNewPhoneNumberChange = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const handleNewThreadMessageChange = (e) => {
    setNewThreadMessage(e.target.value);
  };

  const handleActiveMessageChange = (e) => {
    setActiveMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (selectedThread && activeMessage) {
      const updatedMessages = [...selectedThread.messages, { body: activeMessage, from: process.env.TWILIO_PHONE_NUMBER, date_sent: new Date().toISOString() }];
      updatedMessages.sort((a, b) => new Date(a.date_sent) - new Date(b.date_sent));
      const updatedThread = { ...selectedThread, messages: updatedMessages };
      setThreads(threads.map((thread) => (thread.contact === selectedThread.contact ? updatedThread : thread)));
      await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: selectedThread.contact, body: activeMessage }),
      });
      setActiveMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <div className="flex h-screen">
        <aside className="w-1/4 p-4 bg-gray-800 text-white">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Start a New Conversation</h2>
            <div className="flex mb-2">
              <input
                type="text"
                className="flex-grow p-2 border mr-2 text-black"
                placeholder="Enter phone number"
                value={newPhoneNumber}
                onChange={handleNewPhoneNumberChange}
              />
              <button className="p-2 bg-blue-500 text-white" onClick={handleStartNewThread}>
                Start
              </button>
            </div>
            <div>
              <input
                type="text"
                className="w-full p-2 border text-black"
                placeholder="Type your message"
                value={newThreadMessage}
                onChange={handleNewThreadMessageChange}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
          <h2 className="text-lg font-semibold mb-4">Threads</h2>
          <ul className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 20rem)' }}>
            {threads.map((thread) => (
              <li
                key={thread.contact}
                className={`p-2 cursor-pointer ${selectedThread?.contact === thread.contact ? 'bg-gray-700' : ''}`}
                onClick={() => handleSelectThread(thread)}
              >
                {thread.contact}
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 p-4 flex flex-col">
          <div className="flex-1 flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Conversation</h2>
            {selectedThread ? (
              <div className="flex flex-1">
                <div className="flex-1 border p-4 overflow-y-auto bg-gray-100 text-black" style={{ maxHeight: 'calc(100vh - 10rem)' }}>
                  {selectedThread.messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                      <span className="text-gray-500 mr-2">{isValid(parseISO(msg.date_sent)) ? format(parseISO(msg.date_sent), 'PPpp') : 'Invalid date'}</span>
                      <strong>
                        {msg.from === process.env.TWILIO_PHONE_NUMBER ? 'Me' : msg.from}:
                      </strong>
                      <span>{msg.body}</span>
                    </div>
                  ))}
                </div>
                <div className="w-1/4 p-4 border-l bg-gray-200">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">Contact Information</h2>
                  <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="w-full p-2 border text-black"
                      value={contactInfo.firstName}
                      onChange={handleContactInfoChange}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="w-full p-2 border text-black"
                      value={contactInfo.lastName}
                      onChange={handleContactInfoChange}
                      placeholder="Last Name"
                    />
                  </div>
                  <button className="p-2 bg-blue-500 text-white" onClick={handleSaveContact}>
                    Save Contact
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-black">Select a thread to view the conversation</div>
              )}
            </div>
            {selectedThread && (
              <div className="flex mt-4">
                <input
                  type="text"
                  className="flex-grow p-2 border mr-2 text-black"
                  placeholder="Type a message"
                  value={activeMessage}
                  onChange={handleActiveMessageChange}
                  onKeyPress={handleKeyPress}
                />
                <button className="p-2 bg-blue-500 text-white" onClick={handleSendMessage}>
                  Send
                </button>
              </div>
            )}
          </main>
        </div>
      </Layout>
    );
  };

  export default SmsTextConversations;
