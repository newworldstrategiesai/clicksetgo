// pages/api/websocket-server.js
import { Server } from 'socket.io';
import { supabase } from '../../utils/supabaseClient';
import axios from 'axios';

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('New client connected');

      // Listen for new messages from Twilio
      socket.on('newMessage', async (message) => {
        await supabase.from('messages').insert(message);
        socket.broadcast.emit('messageReceived', message);
      });

      // Listen for new call logs from VAPI
      socket.on('newCallLog', async (callLog) => {
        await supabase.from('call_logs').insert(callLog);
        socket.broadcast.emit('callLogReceived', callLog);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
