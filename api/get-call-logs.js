import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('call_logs')
      .select('*')
      .order('startedAt', { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching call logs:', error);
    res.status(500).json({ error: 'Failed to fetch call logs from Supabase' });
  }
}
