// pages/api/getCallLogs.js
export default async function handler(req, res) {
    try {
      const response = await fetch('https://api.vapi.ai/log?callId=535fd28c-aae1-4965-ac56-51eda81bf582&sortOrder=ASC', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.VAPI_API_KEY}`,
        },
      });
  
      if (!response.ok) {
        console.error('Error fetching data from VAPI:', response.status, response.statusText);
        return res.status(response.status).json({ message: `VAPI Error: ${response.statusText}` });
      }
  
      const data = await response.json();
  
      // Ensure data.results is always an array
      const results = Array.isArray(data.results) ? data.results : [];
  
      return res.status(200).json({ results });
    } catch (error) {
      console.error('Fetch error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  