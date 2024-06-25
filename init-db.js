const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./contacts.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY, number TEXT UNIQUE, first_name TEXT, last_name TEXT, email TEXT, address TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, contact_id INTEGER, message TEXT, from_admin INTEGER, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(contact_id) REFERENCES contacts(id))");
});

db.close();
