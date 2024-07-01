// pages/api/pollCallLogs.js
import fetchVAPICallLogs from '../../utils/fetchVAPICallLogs';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  try {
    const callLogs = await fetchVAPICallLogs();
    const { data, error } = await supabase.from('call_logs').upsert(callLogs, { onConflict: ['id'] });

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error fetching and storing VAPI call logs:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
