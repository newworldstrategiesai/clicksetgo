const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let messages = []; // Store messages in memory for now

app.post('/twilio-webhook', (req, res) => {
  const message = req.body;
  messages.push(message);
  io.emit('newMessage', message);
  res.status(200).end();
});

app.get('/messages', (req, res) => {
  res.json(messages);
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
