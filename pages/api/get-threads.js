import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';
import { subYears, formatISO } from 'date-fns';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const getMessages = async (dateSentAfter) => {
  let messages = [];
  let pageToken;

  try {
    do {
      const response = await client.messages.list({
        dateSentAfter,
        pageSize: 50,
        pageToken,
      });

      messages = messages.concat(response);
      pageToken = response.nextPageToken;

      console.log(`Fetched ${response.length} messages`);
    } while (pageToken);
  } catch (error) {
    console.error('Error fetching messages:', error);
  }

  return messages;
};

export default async function handler(req, res) {
  try {
    const dateSentAfter = formatISO(subYears(new Date(), 1));
    const messages = await getMessages(dateSentAfter);
    console.log('Total messages fetched:', messages.length);

    const threads = {};

    messages.forEach(message => {
      const phoneNumber = message.from === process.env.TWILIO_PHONE_NUMBER ? message.to : message.from;
      if (!threads[phoneNumber]) {
        threads[phoneNumber] = { contact: phoneNumber, messages: [] };
      }
      threads[phoneNumber].messages.push({
        id: message.sid,
        body: message.body,
        from: message.from,
        to: message.to,
        dateSent: message.dateSent,
      });
    });

    // Sort messages in each thread by dateSent
    Object.keys(threads).forEach(phoneNumber => {
      threads[phoneNumber].messages.sort((a, b) => new Date(a.dateSent) - new Date(b.dateSent));
    });

    console.log('Constructed threads:', Object.keys(threads).length);

    res.status(200).json(threads);
  } catch (error) {
    console.error('Error fetching messages from Twilio:', error.message);
    res.status(500).json({ error: 'Failed to fetch messages from Twilio' });
  }
}
