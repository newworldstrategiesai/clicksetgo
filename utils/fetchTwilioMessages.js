// utils/fetchTwilioMessages.js
import axios from 'axios';

const fetchTwilioMessages = async () => {
  const response = await axios.get('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json', {
    auth: {
      username: process.env.TWILIO_ACCOUNT_SID,
      password: process.env.TWILIO_AUTH_TOKEN,
    },
  });

  return response.data.messages;
};

export default fetchTwilioMessages;
