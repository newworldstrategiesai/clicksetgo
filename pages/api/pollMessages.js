// pages/api/pollMessages.js
import fetchTwilioMessages from '../../utils/fetchTwilioMessages';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  try {
    const messages = await fetchTwilioMessages();
    const { data, error } = await supabase.from('messages').upsert(messages, { onConflict: ['sid'] });

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error fetching and storing Twilio messages:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
