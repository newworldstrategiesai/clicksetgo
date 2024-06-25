const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Initialize SQLite database
let db = new sqlite3.Database(path.join(__dirname, 'contacts.db'), (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// API routes
app.get('/api/conversations', (req, res) => {
  db.all(`SELECT * FROM contacts`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.get('/api/conversation/:number', (req, res) => {
  const { number } = req.params;
  db.get(`SELECT * FROM contacts WHERE number = ?`, [number], (err, contact) => {
    if (err) {
      throw err;
    }
    db.all(`SELECT * FROM messages WHERE contact_id = ?`, [contact.id], (err, messages) => {
      if (err) {
        throw err;
      }
      res.json({ contact, messages });
    });
  });
});

app.post('/api/send', (req, res) => {
  const { number, text, fromAdmin } = req.body;
  db.get(`SELECT * FROM contacts WHERE number = ?`, [number], (err, contact) => {
    if (err) {
      throw err;
    }
    const contactId = contact ? contact.id : null;
    if (!contactId) {
      db.run(`INSERT INTO contacts (number) VALUES (?)`, [number], function (err) {
        if (err) {
          throw err;
        }
        db.run(`INSERT INTO messages (contact_id, text, from_admin) VALUES (?, ?, ?)`,
          [this.lastID, text, fromAdmin ? 1 : 0],
          function (err) {
            if (err) {
              throw err;
            }
            io.emit('newMessage', { number, text, fromAdmin });
            res.json({ id: this.lastID, text });
          });
      });
    } else {
      db.run(`INSERT INTO messages (contact_id, text, from_admin) VALUES (?, ?, ?)`,
        [contactId, text, fromAdmin ? 1 : 0],
        function (err) {
          if (err) {
            throw err;
          }
          io.emit('newMessage', { number, text, fromAdmin });
          res.json({ id: this.lastID, text });
        });
    }
  });
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
