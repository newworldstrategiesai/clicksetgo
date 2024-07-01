import { twilio } from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  try {
    const messages = await client.messages.list({ limit: 100 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages from Twilio:', error);
    res.status(500).json({ error: 'Failed to fetch messages from Twilio' });
  }
}
