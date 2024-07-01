import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';
import { Configuration, OpenAIApi } from 'openai';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateAIResponse = async (userMessage) => {
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: userMessage,
      max_tokens: 150,
    });
    return completion.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'Sorry, I am unable to respond right now.';
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { Body, From } = req.body;

  setTimeout(async () => {
    const responseMessage = await generateAIResponse(Body);

    try {
      await client.messages.create({
        body: responseMessage,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: From,
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, 10000); // 10 seconds

  res.status(200).send('<Response></Response>');
}
