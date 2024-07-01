import axios from 'axios';

export default async function handler(req, res) {
  const { phoneNumber } = req.query;  // Ensure this query parameter is being used correctly
  const url = phoneNumber ? `https://api.vapi.ai/call?phoneNumber=${phoneNumber}` : 'https://api.vapi.ai/call';

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('VAPI Response:', response.data);  // Log the response data for debugging

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching call logs:', error);
    res.status(500).json({ error: 'Failed to fetch call logs from VAPI' });
  }
}
