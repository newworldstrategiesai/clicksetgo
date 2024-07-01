import { sendMessage } from '../../lib/twilio';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { to, body } = req.body;
    await sendMessage(to, body);
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
