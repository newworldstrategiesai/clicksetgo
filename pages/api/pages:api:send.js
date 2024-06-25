import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function handler(req, res) {
    const db = await open({
        filename: './contacts.db',
        driver: sqlite3.Database
    });

    if (req.method === 'POST') {
        const { to, message } = req.body;

        const contact = await db.get("SELECT id FROM contacts WHERE number = ?", [to]);
        if (contact) {
            await db.run("INSERT INTO messages (contact_id, message, from_admin) VALUES (?, ?, ?)", [contact.id, message, 1]);
            res.status(200).json({ status: 'success' });
        } else {
            res.status(404).json({ status: 'error', message: 'Contact not found' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
