import axios from 'axios';
import { supabase } from './supabaseClient';

const fetchVAPICallLogs = async () => {
  const response = await axios.get('https://api.vapi.ai/call', {
    headers: {
      Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const storeCallLogsInSupabase = async (callLogs) => {
  const { data, error } = await supabase.from('call_logs').upsert(callLogs, { onConflict: ['id'] });
  if (error) {
    console.error('Error storing call logs in Supabase:', error);
  }
  return data;
};

const fetchAndStoreCallLogs = async () => {
  try {
    const callLogs = await fetchVAPICallLogs();
    await storeCallLogsInSupabase(callLogs);
  } catch (error) {
    console.error('Error fetching and storing call logs:', error);
  }
};

export default fetchAndStoreCallLogs;
