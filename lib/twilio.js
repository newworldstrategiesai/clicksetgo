const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendMessage = async (to, body) => {
  try {
    await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

export const getMessages = async () => {
  try {
    const messages = await client.messages.list({ limit: 20 });
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};
