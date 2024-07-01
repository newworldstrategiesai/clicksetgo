import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  const { phoneNumber } = req.query;

  try {
    const incomingMessages = await client.messages.list({
      to: process.env.TWILIO_PHONE_NUMBER,
      from: phoneNumber,
      limit: 50
    });

    const outgoingMessages = await client.messages.list({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
      limit: 50
    });

    const allMessages = [...incomingMessages, ...outgoingMessages].sort((a, b) => new Date(a.dateSent) - new Date(b.dateSent));

    const conversations = allMessages.map(message => ({
      body: message.body,
      from: message.from,
      to: message.to,
      dateSent: message.dateSent
    }));

    res.status(200).json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
}
