import axios from 'axios';

export default async function handler(req, res) {
  const { phoneNumber } = req.query;

  try {
    const response = await axios.get(`https://api.vapi.ai/sms?phoneNumber=${phoneNumber}`, {
      headers: {
        Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('VAPI Response:', response.data); // Log the response data for debugging

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching SMS logs:', error);
    res.status(500).json({ error: 'Failed to fetch SMS logs from VAPI' });
  }
}
