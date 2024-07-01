import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
    const dateSentAfter = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString();
    const messages = await getMessages(dateSentAfter);

    for (const message of messages) {
      const { sid, body, from, to, dateSent } = message;
      const { data, error } = await supabase
        .from('messages')
        .upsert({ sid, body, from, to, date_sent: dateSent }, { onConflict: 'sid' });

      if (error) {
        console.error('Error inserting message:', error);
      }
    }

    res.status(200).json({ message: 'Messages fetched and stored successfully.' });
  } catch (error) {
    console.error('Error fetching and storing messages:', error.message);
    res.status(500).json({ error: 'Failed to fetch and store messages.' });
  }
}
