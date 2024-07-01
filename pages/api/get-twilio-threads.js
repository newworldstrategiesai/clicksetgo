import axios from 'axios';

export default async function handler(req, res) {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    const messages = await client.messages.list({ limit: 100 });

    const threadsMap = messages.reduce((acc, message) => {
      const phoneNumber = message.from === process.env.TWILIO_PHONE_NUMBER ? message.to : message.from;
      if (!acc[phoneNumber]) {
        acc[phoneNumber] = { contact: phoneNumber, messages: [] };
      }
      acc[phoneNumber].messages.push(message);
      return acc;
    }, {});
    
    const threadsArray = Object.values(threadsMap);

    res.status(200).json(threadsArray);
  } catch (error) {
    console.error('Error fetching messages from Twilio:', error);
    res.status(500).json({ error: 'Failed to fetch messages from Twilio' });
  }
}
