// pages/api/fetch-initial-data.js
import { supabase } from '../../utils/supabaseClient';
import axios from 'axios';

// Fetch SMS messages from Twilio
const fetchTwilioMessages = async () => {
  const response = await axios.get('https://api.twilio.com/2010-04-01/Accounts/YourAccountSID/Messages.json', {
    auth: {
      username: 'YourAccountSID',
      password: 'YourAuthToken'
    }
  });
  return response.data.messages;
};

// Fetch call logs from VAPI
const fetchVAPICallLogs = async () => {
  const response = await axios.get('https://api.vapi.ai/call', {
    headers: {
      Authorization: `Bearer ${process.env.VAPI_API_KEY}`
    }
  });
  return response.data;
};

// Store messages in Supabase
const storeMessagesInSupabase = async (messages) => {
  const { data, error } = await supabase
    .from('messages')
    .upsert(messages);
  if (error) console.error('Error storing messages:', error);
};

// Store call logs in Supabase
const storeCallLogsInSupabase = async (callLogs) => {
  const { data, error } = await supabase
    .from('call_logs')
    .upsert(callLogs);
  if (error) console.error('Error storing call logs:', error);
};

export default async function handler(req, res) {
  try {
    const messages = await fetchTwilioMessages();
    await storeMessagesInSupabase(messages);

    const callLogs = await fetchVAPICallLogs();
    await storeCallLogsInSupabase(callLogs);

    res.status(200).json({ message: 'Initial data fetched and stored successfully.' });
  } catch (error) {
    console.error('Error fetching initial data:', error);
    res.status(500).json({ error: 'Failed to fetch initial data' });
  }
}
