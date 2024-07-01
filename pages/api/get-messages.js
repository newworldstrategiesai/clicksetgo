// pages/api/get-messages.js
import twilio from 'twilio';

export default async function handler(req, res) {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  try {
    const messages = await client.messages.list({ limit: 100 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages from Twilio:', error);
    res.status(500).json({ error: 'Failed to fetch messages from Twilio' });
  }
}
