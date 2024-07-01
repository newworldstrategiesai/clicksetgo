// utils/fetchVAPICallLogs.js
import axios from 'axios';

const fetchVAPICallLogs = async () => {
  const response = await axios.get('https://api.vapi.ai/call', {
    headers: {
      Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export default fetchVAPICallLogs;
