export default async function handler(req, res) {
    const { id } = req.query;
  
    if (!id) {
      return res.status(400).json({ error: 'Missing call log ID' });
    }
  
    try {
      const response = await fetch(`https://api.vapi.ai/call/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch call log');
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching call log:', error);
      res.status(500).json({ error: 'Failed to fetch call log' });
    }
  }
  